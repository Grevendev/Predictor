import json
import logging
import sys
import time
import uuid
from datetime import datetime, timezone

from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


def setup_logging(log_level: str = "INFO") -> None:
    # Tystar Uvicorns inbyggda access-logg så att vi inte får dubbla rader.
    # Sätt nivån på Uvicorns interna access-logger till WARNING
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)


class StructuredLoggingMiddleware(BaseHTTPMiddleware):
    # Mäter anrop, genererar Request-ID och skriver ren JSON till stdout.

    async def dispatch(self, request: Request, call_next) -> Response:

        # Exkludera /metrics från vanliga access-loggarna för att undvika skräpdata
        if request.url.path == "/metrics":
            return await call_next(request)

        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        start_time = time.perf_counter()

        # Extrahera IP säkert (bakom reverse proxy eller direkt)
        client_ip = (
            request.headers.get("CF-Connecting-IP")
            or request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
            or (request.client.host if request.client else "unknown")
        )

        try:
            response = await call_next(request)
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
            status_code = response.status_code

            # Bestäm loggnivå
            if status_code >= 500:
                level = "ERROR"
                msg = "Internal Server Error"
            elif status_code == 429:
                level = "WARNING"
                msg = "Rate limit hit"
            elif status_code >= 400:
                level = "WARNING"
                msg = "Client error"
            else:
                level = "INFO"
                msg = "Request OK"

            log_entry = {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "level": level,
                "logger": "app.access",
                "message": msg,
                "request_id": request_id,
                "client_ip": client_ip,
                "method": request.method,
                "path": request.url.path,
                "status_code": status_code,
                "duration_ms": duration_ms,
            }

            if status_code == 429:
                log_entry["security_event"] = "rate_limit_exceeded"

            # Skriv direkt till stdout och flusha bufferten omedelbart
            print(json.dumps(log_entry, ensure_ascii=False), file=sys.stderr, flush=True)

            response.headers["X-Request-ID"] = request_id
            return response

        except Exception as exc:
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
            log_entry = {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "level": "ERROR",
                "logger": "app.access",
                "message": "Unhandled Exception",
                "request_id": request_id,
                "client_ip": client_ip,
                "method": request.method,
                "path": request.url.path,
                "status_code": 500,
                "duration_ms": duration_ms,
                "exception": str(exc),
            }
            print(json.dumps(log_entry, ensure_ascii=False), file=sys.stderr, flush=True)
            raise exc


def setup_monitoring(app: FastAPI) -> None:
    # Instrumenterar FastAPI med Prometheus-metrik och exponerar /metrics.
    Instrumentator(
        should_group_status_codes=False,
        should_ignore_untemplated=True,
        excluded_handlers=["/metrics"],
    ).instrument(app).expose(app, endpoint="/metrics", include_in_schema=False)
