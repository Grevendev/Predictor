from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.limiter import limiter
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from app.api.v1.endpoints import predictions, energy_areas, main_endpoint, weather

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# Registrera limiter i app-state
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    response = JSONResponse(
        status_code=429,
        content={
            "error": "Too Many Requests",
            "message": "Du har gjort för många anrop på kort tid. Försök igen om en stund. / You have made to many request on short time",
            "detail": str(exc.detail),
        },
    )
    if hasattr(exc, "retry_after") and exc.retry_after:
        response.headers["Retry-After"] = str(exc.retry_after)
    return response


# Konfigurera CORS för frontend
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrera API v1 routes (dessa låg redan under /api/v1)
app.include_router(
    predictions.router,
    prefix="/api/v1/predictions",
    tags=["predictions"],
)

app.include_router(
    energy_areas.router,
    prefix="/api/v1",
)

# Registrera zonuppslagets router så att /spot-check blir åtkomlig
app.include_router(
    main_endpoint.router,
    prefix="/api/v1",
)

# Registrera väderroutern
app.include_router(
    weather.router,
    prefix="/api/v1",
)


# Flytta grundläggande endpoints under /api
@app.get("/api")
def read_root():
    return {"message": "Välkommen till FastAPI-backenden för din ML-applikation!"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
