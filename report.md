# Teknisk rapport

### Bakgrund

Bakgrunden till projektet är att elpriser varierar både över tid och mellan Sveriges olika elområden, vilket kan göra det svårt för en användare att planera sin elkonsumtion. Projektets mål har därför varit att utveckla en webbapplikation som gör informationen mer lättillgänglig och samtidigt använder maskininlärning för att ge stöd i planeringen av framtida elanvändning.

I webbapplikationen kan användaren ange en stad och få information kopplad till det aktuella elområdet. Applikationen är tänkt att visa aktuella elpriser, identifiera lämpliga tidpunkter för exempelvis laddning av en elbil och presentera prediktioner för kommande perioder. På så sätt kan användaren få en bättre överblick över när det kan vara fördelaktigt att förlägga sin elkonsumtion.

### Projektflöde och systemöversikt

Projektet följer ett sammanhängande flöde från data till användargränssnitt: historiska elpris- och väderdata samlas in, kombineras och förbehandlas för att skapa ett gemensamt timbaserat dataset. Därefter görs feature engineering och modellträning för regression, klustring och klassificering, varefter de färdiga modellerna sparas. Backend byggs med FastAPI och ansvarar för att ladda modellerna, exekvera inference och exponera API-endpoints för prediktioner. Frontend i React/Vite hämtar sedan data från backend och presenterar resultatet för användaren i en webbapplikation.

### Datainsamling och modellutveckling

Projektets dataset har skapats från grunden istället för att använda ett färdigt dataset från exempelvis Kaggle. Historiska spotpriser för Sveriges fyra elområden (SE1–SE4) har hämtats via API och kombinerats med väderdata för motsvarande områden och tidsperiod. Därefter har informationen bearbetats och sammanfogats till ett gemensamt dataset med timbaserade observationer. Detta har gett gruppen praktisk erfarenhet av hela dataflödet, från datainsamling och integration till preprocessing och modellering.

En gemensam explorativ dataanalys (EDA) genomfördes för datasetet som grund för arbetet med regression, klustring och klassificering. Där undersöktes bland annat prisvariationer, vädervariabler, tidsmönster och skillnader mellan elområden.

För regressionsdelen transformerades datasetet därefter till ett format där samtliga fyra elområden kan användas av en gemensam modell. Feature engineering genomfördes med tidsvariabler, elområde samt historiska priser (lag features på 24, 48 och 168 timmar).

Flera regressionsmetoder jämfördes mot en naiv 24-timmars baseline. Linear Regression, Random Forest och en hyperparameteroptimerad Random Forest utvärderades på en separat framtida testperiod. Den optimerade Random Forest-modellen presterade bäst med MAE 20,99 EUR/MWh jämfört med baselinens 26,41 EUR/MWh, samt lägst RMSE och högst R² av de testade regressionsmodellerna. Modellen optimerades med RandomizedSearchCV och tidsserieanpassad cross-validation för att undvika att framtida observationer används vid träning.

Parallellt har gruppen arbetat med klustring för att identifiera återkommande mönster i data samt klassificering med SVM. De färdigtränade modellerna sparas som modellfiler och integreras i backend genom ett gemensamt loader- och inferenceflöde. Modellfilerna hanteras med Git LFS för att undvika att stora binära filer lagras direkt i det vanliga Git-repositoryt.

### Teknisk specifikation

Backend är utvecklad med FastAPI och ansvarar för att ladda de tränade modellerna, genomföra inference och exponera projektets funktionalitet genom API-endpoints. Backend testas med pytest och FastAPIs TestClient, med tester för bland annat endpoints, modellinläsning, inference, validering och felhantering.

Frontend är utvecklad med React och Vite och kommunicerar med backend genom API-anrop. Frontend testas med Playwright för att testa webbapplikationen och dess användarflöden.

### Huvudresultat

Projektet har resulterat i en webbapplikation där projektets databehandling och maskininlärningsmodeller kopplas samman med ett backend-API och ett användargränssnitt.

För regressionsdelen gav den optimerade Random Forest-modellen bäst resultat av de utvärderade modellerna, med ett MAE på 20,99 EUR/MWh jämfört med 26,41 EUR/MWh för den naiva 24-timmars baselinen.

### Utvärdering av gruppens arbete
Kompletteras gemensamt av gruppen - tisdag förslagsvis


**Kommentarer till gruppen inför färdig rapport:** Komplettera modellavsnittet och huvudresultatet med klustring och klassificering så att alla tre ML-delar finns representerade. Utvärderingen behöver fyllas på med vad som fungerat bra, vad vi har lärt oss, hur samarbetet och arbetet med Git/GitHub har fungerat samt vad vi hade gjort annorlunda. Vi kan även överväga att lägga till Docker, pipelines och scripts under den tekniska specifikationen, samt något mer om Playwright/frontend om det finns utrymme. Kontrollera slutligen att beskrivningen av webbappens funktionalitet motsvarar exakt det som finns implementerat i slutversionen.

### Weekly forecast update
Det aktuella flödet visar en veckoprognos med exakt sju datapunkter: idag + sex kommande dagar i UI:t. Första dagen visas alltid som "Idag"/"Today" i användargränssnittet, medan den underliggande modellen fortfarande använder verkliga datapunkter från den laddade zonens dataset. Backendet räknar ut ett dagligt pris med den tränade Random Forest-modellen, klassificerar dagens prisnivå med KMeans-klustring och använder SVM för att avgöra om dagen rekommenderas för flexibel elanvändning. Klustringens raw-ID:n mappas enligt modellens ordning (lägst pris = låg, mellanliggande = medel, högst pris = hög) för att undvika felaktig tolkning av klusternummer.

SE1–SE4 hanteras genom att välja rätt pris- och väderkolumner för aktuell zon innan modellen körs. Frontend visar staplar i rätt färg för låg/medel/hög nivå, samt en rekommendation som kommer från SVM-output, inte från klientlogik eller hårdkodade trösklar. I nuläget måste det lokaladatasetet uppdateras manuellt via scriptet get_last_date.py tanken är att scriptet ska köra sig själv i en live version.
