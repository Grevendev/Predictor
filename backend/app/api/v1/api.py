from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import energy_areas, main_endpoint, predictions

app = FastAPI(
    title="Energy Predictor API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    main_endpoint.router,
    prefix="/api/v1",
    tags=["Zone"],
)

app.include_router(
    energy_areas.router,
    prefix="/api/v1",
    tags=["Energy Areas"],
)

app.include_router(
    predictions.router,
    prefix="/api/v1",
    tags=["Prediction"],
)

@app.get("/health")
def prediction_health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"status": "ok"}