from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings


def get_real_client_ip(request: Request) -> str:
    """
    Hämtar klientens verkliga IP även bakom omvänd proxy (Traefik, Caddy, Nginx).
    """
    # 1. Cloudflare header
    cf_ip = request.headers.get("CF-Connecting-IP")
    if cf_ip:
        return cf_ip.strip()

    # 2. X-Forwarded-For header (första IP är originalklienten)
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()

    # 3. Fallback direkt socket-IP
    return get_remote_address(request)


limiter = Limiter(
    key_func=get_real_client_ip,
    default_limits=[settings.RATE_LIMIT_DEFAULT],
    headers_enabled=True,  # Skickar X-RateLimit-* headers
)
