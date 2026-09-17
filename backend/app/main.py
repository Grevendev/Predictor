from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import predictions
from app.api.v1.endpoints import energy_areas
from app.api.v1.endpoints import main_endpoint

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Konfigurera CORS för frontend
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    predictions.router,
    prefix="/api/v1/predictions",
    tags=["predictions"],
)

app.include_router(
    energy_areas.router,
    prefix="/api/v1",
)

# Registrera zonuppslagets router så att /spot-check blir åtkomlig.
app.include_router(
    main_endpoint.router,
    prefix="/api/v1",
)


# Registrera zonuppslagets router så att /spot-check blir åtkomlig.
app.include_router(
    main_endpoint.router,
    prefix="/api/v1",
)


@app.get("/")
def read_root():
    return {"message": "Välkommen till FastAPI-backenden för din ML-applikation!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
