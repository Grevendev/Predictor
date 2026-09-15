FROM ghcr.io/astral-sh/uv:latest AS uv_bin
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

COPY --from=uv_bin /uv /bin/

# Kopiera requirements
COPY requirements.txt ./

# Skapa virtuell miljö och installera paketen med uv
RUN uv venv /app/.venv && \
    uv pip install --no-cache -r requirements.txt

ENV PATH="/app/.venv/bin:$PATH"

# Kopiera backend-koden
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.api.v1.api:app", "--host", "0.0.0.0", "--port", "8000"]    