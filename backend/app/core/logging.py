import json
import logging
import sys
import time
import uuid
from typing import Optional

from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class JSONFormater(logging.Formatter):
    # Formaterar alla loggposter till ren JSON för enkel aggregering och analys

    def format(self, record: logging.LogRecord)-> str:
        log_data = {
            "timestamp": self.formatTime(record, self.datefmt),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage()
        }

        # Lägg till strukturerad metadata om det skickas med
        if hasattr(record, "request_meta"):
            log_data.update(record.request_meta)

        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)

        return json.dump(log_data, ensure_ascii=False)

    def setup_logging(log_level: str = "INFO") -> None:
        # Konfigruerar standardloggen to stdout.

        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(JSONFormater(datefmt="%Y-%m-%dT%H:%M:%S%z"))

        root_logger = logging.getLogger()
        root_logger.handlers.clear()
        root_logger.addHandler(handler)
        root_logger.setLevel(log_level.upper())

        # Dämpa uvcorns inbyggda access-log så vi slipper dubbel logning
        logging.getLogger("uvicorn.access").handlers.clear()
        logging.getLogger("uvicorn.access").propagate = False


        