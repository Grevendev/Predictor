#!/usr/bin/env bash

case "$1" in
  dev-local)
    trap 'kill 0' SIGINT SIGTERM EXIT
    (cd backend && PYTHONPATH=. uv run uvicorn app.api.v1.api:app --reload --port 8000) &
    (cd frontend && npm run dev) &
    wait
    ;;
  dev-backend)
    cd backend && PYTHONPATH=. uv run uvicorn app.api.v1.api:app --reload --port 8000
    ;;
  dev-frontend)
    cd frontend && npm run dev
    ;;
  # Docker commands:
  dev-up)
    docker compose up --build
    ;;
  dev-down)
    docker compose down
    ;;
  dev-logs)
    docker compose logs -f
    ;;
  clean)
    docker compose down -v --remove-orphans
    docker compose -f compose.prod.yaml down -v --remove-orphans
    find . -type d -name "__pycache__" -exec rm -r {} +
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
  
  *)
    echo "Användning: ./run.sh {dev|dev-backend|dev-frontend|prod-up|prod-down|prod-logs|down}"
    exit 1
    ;;
esac