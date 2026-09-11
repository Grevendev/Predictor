from fastapi import FastAPI
from endpoints import zone

# Variabeln MÅSTE heta exakt 'app' om du kör :app
app = FastAPI(
    title="Energy Predictor API",
    version="1.0.0",
)

app.include_router(zone.router, prefix="/api/v1", tags=["Zone"])


@app.get("/health")
def prediction_health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"status": "ok"}
