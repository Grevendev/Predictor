.PHONY: help dev dev-backend dev-frontend prod-up prod-down prod-logs down clean

help:
	@echo "Tillgängliga kommandon:"
	@echo "  make dev           - Starta hela stacken lokalt med Docker Compose"
	@echo "  make dev-backend   - Starta enbart backend lokalt utan Docker (uvicorn)"
	@echo "  make dev-frontend  - Starta enbart frontend lokalt utan Docker (vite)"
	@echo "  make prod-up       - Bygg och starta produktionsstacken i bakgrunden"
	@echo "  make prod-down     - Stoppa produktionsstacken"
	@echo "  make prod-logs     - Visa live-loggar från produktionsstacken"
	@echo "  make down          - Stoppa utvecklingsstacken"
	@echo "  make clean         - Rensa gamla containrar, volymer och pycache"

# --- Lokal Utveckling (utanför Docker för snabbaste reload) ---
dev-backend:
	cd backend && PYTHONPATH=. uv run uvicorn app.api.v1.api:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev

# --- Utveckling via Docker Compose ---
dev:
	docker compose up --build

down:
	docker compose down

# --- Produktion via compose.prod.yaml ---
prod-up:
	docker compose -f compose.prod.yaml up --build -d

prod-down:
	docker compose -f compose.prod.yaml down

prod-logs:
	docker compose -f compose.prod.yaml logs -f

# --- Städning ---
clean:
	docker compose down -v --remove-orphans
	docker compose -f compose.prod.yaml down -v --remove-orphans
	find . -type d -name "__pycache__" -exec rm -r {} +