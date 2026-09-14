from fastapi import FastAPI
from app.api.v1.endpoints import main_endpoint, predictions

# Variabeln MÅSTE heta exakt 'app' om du kör :app
app = FastAPI(
    title="Energy Predictor API",
    version="1.0.0",
)

# 1. Registrera routern för ort och zon
app.include_router(main_endpoint.router, prefix="/api/v1", tags=["Zone"])

# 2. Registrera routern för prediktioner (/predict, /healthffff)
app.include_router(predictions.router, prefix="/api/v1", tags=["Prediction"])

@app.get("/health")
def prediction_health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"status": "ok"}
