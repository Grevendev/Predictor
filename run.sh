#!/usr/bin/env bash

case "$1" in
  dev)
    docker compose up --build
    ;;
  dev-backend)
    cd backend && PYTHONPATH=. uv run uvicorn app.api.v1.api:app --reload --port 8000
    ;;
  dev-frontend)
    cd frontend && npm run dev
    ;;
  prod-up)
    docker compose -f compose.prod.yaml up --build -d
    ;;
  prod-down)
    docker compose -f compose.prod.yaml down
    ;;
  prod-logs)
    docker compose -f compose.prod.yaml logs -f
    ;;
  down)
    docker compose down
    ;;
  *)
    echo "Användning: ./run.sh {dev|dev-backend|dev-frontend|prod-up|prod-down|prod-logs|down}"
    exit 1
    ;;
esac