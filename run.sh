#!/usr/bin/env bash

set -e

show_help() {
  echo "Tillgängliga kommandon för ./run.sh:"
  echo "  ./run.sh help          - Visa denna hjälptext"
  echo "  ./run.sh get-data      - Hämtar senaste datum och synkar data"
  echo "  ./run.sh dev-local     - Starta backend och frontend lokalt (parallellt utan Docker)"
  echo "  ./run.sh dev-backend   - Starta enbart backend lokalt utan Docker (Uvicorn)"
  echo "  ./run.sh dev-frontend  - Starta enbart frontend lokalt utan Docker (Vite)"
  echo "  ./run.sh dev-up        - Bygg och starta hela utvecklingsstacken i Docker"
  echo "  ./run.sh dev-down      - Stoppa utvecklingsstacken"
  echo "  ./run.sh dev-logs      - Följ live-loggar från utvecklingscontainrarna"
  echo "  ./run.sh prod-up       - Bygg och starta produktionsstacken i bakgrunden"
  echo "  ./run.sh prod-down     - Stoppa produktionsstacken"
  echo "  ./run.sh prod-logs     - Följ live-loggar från produktionsstacken"
  echo "  ./run.sh clean         - Rensa containrar, volymer och __pycache__"
}

case "$1" in
  help|--help|-h|"")
    show_help
    ;;
  get-data)
    echo "==> Hämtar senaste datum och synkar data..."
    python backend/scripts/get_last_date.py
    ;;
  init)
    cd frontend && npm i && npm run dev
    ;;
  dev-local)
    echo "==> Startar backend och frontend lokalt parallellt..."
    trap 'kill 0' SIGINT SIGTERM EXIT
    (cd backend && uv run uvicorn app.main:app --reload --port 8000) &
    (cd frontend && npm run dev) &
    wait
    ;;
  dev-backend)
    echo "==> Startar enbart backend lokalt (Uvicorn)..."
    cd backend && uv run uvicorn app.main:app --reload --port 8000
    ;;
  dev-frontend)
    echo "==> Startar enbart frontend lokalt (Vite)..."
    cd frontend && npm run dev
    ;;
  dev-up)
    echo "==> Bygger och startar dev-containrar..."
    docker compose up --build
    ;;
  dev-down)
    echo "==> Stoppar dev-containrar..."
    docker compose down
    ;;
  dev-logs)
    echo "==> Visar loggar från dev-containrar..."
    docker compose logs -f
    ;;
  prod-up)
    echo "==> Bygger och startar produktionscontainrar i bakgrunden..."
    docker compose -f compose.prod.yaml up --build -d
    ;;
  prod-down)
    echo "==> Stoppar produktionscontainrar..."
    docker compose -f compose.prod.yaml down
    ;;
  prod-logs)
    echo "==> Visar loggar från produktionscontainrar..."
    docker compose -f compose.prod.yaml logs -f
    ;;
  clean)
    echo "==> Rensar containrar, volymer och __pycache__..."
    docker compose down -v --remove-orphans
    docker compose -f compose.prod.yaml down -v --remove-orphans
    find . -type d -name "__pycache__" -exec rm -rf {} +
    ;;
  *)
    echo "Felaktigt kommando: '$1'"
    echo ""
    show_help
    exit 1
    ;;
esac