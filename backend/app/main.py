from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import predictions, energy_areas, main_endpoint, weather

from app.core.logging import(
    setup_logging,
    setup_monitoring,
    StructuredLoggingMiddleware
)


# Initiera JSON-loggning
setup_logging()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# Koppla på middleware för Request ID och loggning
app.add_middleware(StructuredLoggingMiddleware)

# Aktivera Prometheus /metrics endpoint
setup_monitoring(app)

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
@app.get("/")
@app.get("/api")
def read_root():
    return {"message": "Välkommen till FastAPI-backenden för din ML-applikation!"}


@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
