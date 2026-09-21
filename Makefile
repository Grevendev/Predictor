SHELL := bash.exe
.PHONY: help dev-local dev-backend dev-frontend dev-up dev-down dev-logs prod-up prod-down prod-logs clean

help:
	@echo "Tillgängliga kommandon:"
	@echo "  make dev-local       - Starta backend och frontend lokalt utan Docker"
	@echo "  make dev-backend     - Starta enbart backend lokalt (uvicorn)"
	@echo "  make dev-frontend    - Starta enbart frontend lokalt (vite)"
	@echo "  make dev-up          - Starta och bygg containrar med Docker Compose"
	@echo "  make dev-down        - Stoppa utvecklingscontainrarna"
	@echo "  make dev-logs        - Visa live-loggar från containrarna"
	@echo "  make prod-up         - Bygg och starta produktionsstacken"
	@echo "  make prod-down       - Stoppa produktionsstacken"
	@echo "  make prod-logs       - Visa live-loggar från prod"
	@echo "  make clean           - Rensa gamla containrar, volymer och pycache"

# --- Lokal Utveckling ---
dev-backend:
	cd backend && uv run uvicorn app.main:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev

dev-local:
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
	(cd backend && uv run uvicorn app.main:app --reload --port 8000) & \
	(cd frontend && npm run dev) & \
	wait

# --- Docker Compose Dev ---
dev-up:
	docker compose up --build

dev-down:
	docker compose down

dev-logs:
	docker compose logs -f

# --- Docker Compose Prod ---
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
	find . -type d -name "__pycache__" -exec rm -rf {} +