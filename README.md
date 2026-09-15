# Weather corelation with spot_price on the Swedish market

This application is under progress...

Star ⭐ it and find out our way to fully function application

## Snabbstart & CLI-kommandon

Projektet kan köras antingen direkt på värdmaskinen (snabbast vid aktiv kodning) eller containeriserat via Docker. 

Kommando-strukturen är identisk oavsett om du använder GNU Make (`make <kommando>`) eller det medföljande bash-skriptet (`./run.sh <kommando>`).

> **Tips:** Om du använder bash-skriptet första gången, se till att det är körbart: `chmod +x run.sh`.

---

### 1. Lokal utveckling (Native / Utan Docker)

Körs direkt i din lokala terminalmiljö för snabbast möjliga reload och debugging.

| Åtgärd | Via Make | Via Bash-skript |
|---|---|---|
| **Starta Båda samtidigt** (Uvicorn + Vite) | `make dev-local` | `./run.sh dev-local` |
| **Starta enbart Backend** (FastAPI / Uvicorn) | `make dev-backend` | `./run.sh dev-backend` |
| **Starta enbart Frontend** (React / Vite) | `make dev-frontend` | `./run.sh dev-frontend` |

---

### 2. Utvecklingsmiljö (Docker Compose Dev)

Kör hela stacken isolerat i containrar med hot-reload och volymmappning.

| Åtgärd | Via Make | Via Bash-skript |
|---|---|---|
| **Starta och bygg om** | `make dev` | `./run.sh dev-up` |
| **Stoppa containrar** | `make down` | `./run.sh dev-down` |
| **Följ live-loggar** | `docker compose logs -f` | `./run.sh dev-logs` |

---

### 3. Produktionsmiljö (Docker Compose Prod)

Bygger optimerade multi-stage bundles, servar via Nginx och kopplar på Traefik-regler under subpathen `/predictor/`.

| Åtgärd | Via Make | Via Bash-skript |
|---|---|---|
| **Bygg & starta i bakgrunden** | `make prod-up` | `./run.sh prod-up` |
| **Stoppa produktionsstacken** | `make prod-down` | `./run.sh prod-down` |
| **Följ live-loggar** | `make prod-logs` | `./run.sh prod-logs` |

---

### 4. Underhåll & Rensa cache

Stoppar aktiva containrar, tar bort anonyma volymer och rensar Python `__pycache__`.

| Åtgärd | Via Make | Via Bash-skript |
|---|---|---|
| **Rensa miljö och cache** | `make clean` | `./run.sh clean` |

## Om man vill köra Git LFS för att hantera modell-filerna.

1. Installera Git LFS på din dator (om du inte redan har gjort det) genom att köra följande i terminalen: 
````
git lfs install
````
2. Skapa en `.gitattributes`-fil i roten av ditt projekt genom att tala om vilka filtyper som ska hanteras av LFS:
````
git lfs track "models_bin/*.pkl"
git lfs track "models_bin/*.onnx"
git lfs track "models_bin/*.pt"
git lfs track "models_bin/*.h5"
git lfs track "models_bin/*.bin"

````
3. Lägg till och spåra `.gitattributes`-filen samt din befintliga modellfil:
````
git add .gitattributes
git add models_bin/din_nuvarande_modell.pkl
````
4. Gör en commit och pusha som vanligt:
````
git commit -m "feat: configure git lfs and add initial model binary"
git push origin react_settings

````
När du sedan tar fram dina nästa två modeller är det bara att spara dem i `models_bin/`- mappen. Eftersom Git LFS redan är konfigurerat via `gitattributes` behöver du bara göra vanliga `git add`, `git commit`och `git push`för de nya modellerna också. 
---