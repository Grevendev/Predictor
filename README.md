# Elpris- och Väderprediktor (Svenska Marknaden)

En fullstack ML-plattform som analyserar korrelationen mellan väderdata och spotpriser på den svenska elmarknaden (SE1–SE4) samt förutspår framtida elpriser, optimala förbrukningstimmar och klustrar konsumtionsmönster.

---

## 🏗️ Arkitektur

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS (paketerad via multi-stage Nginx).
* **Backend:** FastAPI, Pydantic Settings, Uvicorn.
* **Maskininlärning:** Scikit-learn modeller (`models_bin/`) för prisregression, optimal timme och KMeans-klustring.
* **Infrastruktur & Drift:** Docker Compose med stöd för Traefik, Caddy, Nginx och Standalone.
* **Säkerhet:** OWASP API4 Resource Limits (SlowAPI) och anpassad IP-detektering bakom reverse proxy.

---

## 🚀 Snabbstart & CLI-kommandon

Projektet kan köras direkt på värdmaskinen eller containeriserat via Docker.  
Kommando-strukturen stöds både via GNU Make (`make <kommando>`) och det medföljande skriptet (`./run.sh <kommando>`).

> **Tips:** Om du använder bash-skriptet första gången: `chmod +x run.sh`.

### 1. Lokal utveckling (Native / Utan Docker)

Körs i din lokala miljö för snabbast möjliga reload och debugging.

| Åtgärd | Via Make | Via Bash-skript |
|---|---|---|
| **Starta båda samtidigt** (Uvicorn + Vite) | `make dev-local` | `./run.sh dev-local` |
| **Starta enbart Backend** (FastAPI) | `make dev-backend` | `./run.sh dev-backend` |
| **Starta enbart Frontend** (Vite) | `make dev-frontend` | `./run.sh dev-frontend` |

### 2. Utvecklingsmiljö (Docker Compose Dev)

Kör hela stacken isolerat i containrar med hot-reload och volymmappning.

| Åtgärd | Via Make | Via Bash-skript |
|---|---|---|
| **Starta och bygg om** | `make dev` | `./run.sh dev-up` |
| **Stoppa containrar** | `make down` | `./run.sh dev-down` |
| **Följ live-loggar** | `docker compose logs -f` | `./run.sh dev-logs` |

---

## 🌐 Produktionsdrift & Reverse Proxy (Modulär arkitektur)

Produktionsdriften är uppdelad i en basfil (`docker-compose.prod.yml`) och proxy-specifika overlays under `reverse-proxy/`.

### Miljövariabler (`.env`)
Skapa en `.env`-fil i projektroten utifrån `.env.example`:
```env
DOMAIN=domännamn
PROXY_NETWORK=traefik-net
CERT_RESOLVER=myresolver
DOCKER_USERNAME=dittkonto
```

### Starta med önskad Ingress / Reverse Proxy:

#### Traefik (Standard):

```bash
docker compose -f docker-compose.prod.yml -f reverse-proxy/docker-compose.traefik.yml up -d
```


#### Nginx:

```bash
docker compose -f docker-compose.prod.yml -f reverse-proxy/docker-compose.nginx.yml up -d
```

#### Caddy:

```bash
docker compose -f docker-compose.prod.yml -f reverse-proxy/docker-compose.caddy.yml up -d
```

## 🛡️ Säkerhet & Rate Limiting (OWASP API4)

För att motverka resursöverbelastning (*Unrestricted Resource Consumption*) har API:et ett inbyggt skydd via **SlowAPI**. Begränsningen är baserad på klientens IP-adress (extraherad via `CF-Connecting-IP` och `X-Forwarded-For`) för att fungera korrekt bakom reverse proxies.

| Endpoint | Gräns (Default) | Typ / Motivering |
| :--- | :--- | :--- |
| `POST /api/v1/predict` | `20/minute` | CPU-intensiv ML-inferens |
| `GET /api/v1/spot-check` | `20/minute` | Skyddar externt geokodnings-API |
| `GET /api/v1/weather` | `30/minute` | Minnes-/I/O-krävande DataFrame-analys |
| `GET /api/v1/energy-areas` | `60/minute` | I/O-filhämtning av GeoJSON |

Vid överskriden kvot returnerar API:et **HTTP 429 Too Many Requests** tillsammans med `Retry-After`-header och ett strukturerat JSON-fel.

Standardgränserna definieras i `app/core/config.py`, men samtliga värden kan när som helst skrivas över och justeras via miljövariabler i `.env` (t.ex. `RATE_LIMIT_PREDICT=50/minute`) utan att koden eller Docker-bilden behöver byggas om.


## 🧹 Underhåll & Cache-rensning

Stoppar aktiva containrar, tar bort anonyma volymer och rensar Python `__pycache__`.

| Åtgärd | Via Make | Via Bash-skript |
| :--- | :--- | :--- |
| **Rensa miljö och cache** | `make clean` | `./run.sh clean` |



#### Tester & Kodkvalitet
* **Backend-tester:** `pytest backend/tests`
* **Frontend lint & typkoll:** `cd frontend && npm run lint && npm run build`

## 📖 API-dokumentation

När backend-applikationen körs finns automatiskt genererad, interaktiv dokumentation tillgänglig:

* **Swagger UI:** `http://localhost:8000/docs` (Interaktivt gränssnitt för att testa endpoints)
* **ReDoc:** `http://localhost:8000/redoc` (Ren och strukturerad specifikationsöversikt)

---

## ⏱️ Data Scheduler (Automatisk datasynkronisering)

I produktions- och driftmiljö körs bakgrundstjänsten `data-scheduler` (`scripts/get_last_date.py`). 

* **Syfte:** Hämtar de senaste elspotpriserna mot externa energimarknads-API:er och håller det lokala datasetet (`dataset/all_zones_complete.csv`) kontinuerligt uppdaterat för alla fyra svenska elområden (SE1–SE4).
* **Krav:** För att schemaläggaren ska kunna ansluta och hämta data krävs en giltig `ENTSOE_API_KEY` definierad i miljövariablerna.

## 📊 Övervakning & Observability

Applikationen är förberedd för driftövervakning och telemetri via Prometheus och Grafana:

* **Prometheus Metrics (`/metrics`):** Exponerar prestandametrik såsom svarstider för inferens (`/predict`), antal inkommande anrop per zon samt frekvens av HTTP 429 (Rate Limit hits).
* **Grafana Dashboards:** Visualiserar systemhälsa, minnesanvändning under modellkörningar och anropsfrekvens