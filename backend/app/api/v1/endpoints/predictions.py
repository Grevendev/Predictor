from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def prediction_health():
    return {"status": "ok"}