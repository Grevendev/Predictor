# Teknisk rapport

### Bakgrund

Elpriser varierar både över tid och mellan Sveriges olika elområden, vilket kan göra det svårt för användare att planera sin elkonsumtion. Projektets mål har därför varit att utveckla en webbapplikation som gör informationen mer lättillgänglig och samtidigt använder maskininlärning för att ge stöd vid planering av framtida elanvändning.

I webbapplikationen kan användaren ange en stad och få information kopplad till det aktuella elområdet. Applikationen presenterar elpriser och väderdata samt använder projektets maskininlärningsmodeller för att göra prisprognoser, identifiera olika pristillstånd och ge rekommendationer kring flexibel elanvändning. På så sätt får användaren en bättre överblick över när det kan vara fördelaktigt att förlägga sin elkonsumtion.

### Projektflöde och systemöversikt

Projektet följer ett sammanhängande flöde från datainsamling till presentation i användargränssnittet. Historiska elpris- och väderdata samlas in och bearbetas till ett gemensamt timbaserat dataset som ligger till grund för projektets tre maskininlärningsdelar: regression, klustring och klassificering.

De tränade modellerna sparas och integreras därefter i en backend utvecklad med FastAPI, som ansvarar för modellinläsning, inference och API-endpoints. Frontend är utvecklad med React och Vite och kommunicerar med backend för att presentera modellernas resultat och annan relevant information för användaren.

På så sätt omfattar projektet hela kedjan från insamling och bearbetning av data till modellträning, backend, API och ett färdigt användargränssnitt.

### Datainsamling och modellutveckling

Projektets dataset har skapats från grunden i stället för att utgå från ett färdigt dataset från exempelvis Kaggle. Historiska spotpriser för Sveriges fyra elområden (SE1–SE4) har hämtats via API och kombinerats med väderdata för motsvarande områden och tidsperioder. Informationen har därefter bearbetats och sammanfogats till ett gemensamt dataset med timbaserade observationer.

En gemensam explorativ dataanalys (EDA) genomfördes som grund för arbetet med regression, klustring och klassificering. Där undersöktes bland annat prisvariationer, vädervariabler, tidsmönster och skillnader mellan elområden.

#### Regression – Random Forest

För regressionsdelen transformerades datasetet till ett format där samtliga fyra elområden kan användas av en gemensam modell. Feature engineering genomfördes med tidsvariabler, elområde samt historiska priser i form av lag features på 24, 48 och 168 timmar.

Flera regressionsmetoder jämfördes mot en naiv 24-timmars baseline. Linear Regression, Random Forest och en hyperparameteroptimerad Random Forest utvärderades på en separat framtida testperiod. Den optimerade Random Forest-modellen presterade bäst av de testade regressionsmodellerna med lägst MAE och RMSE samt högst R². Modellen optimerades med RandomizedSearchCV och tidsserieanpassad cross-validation för att undvika att framtida observationer används vid träning.

#### Klustring – K-Means

K-Means-modellen tränas och körs i vår ML-pipeline. Det som skiljer den från de andra modellerna är att den inte förutsäger ett specifikt värde, utan grupperar marknadens olika tillstånd och prisnivåer.

För träningen användes spotpris, vindhastighet och temperatur, och datan skalades med StandardScaler. För att förstå datan och hitta rätt antal kluster användes tröghet (inertia) och armbågsmetoden (Elbow Method) för k = 1 till 8, vilket tydligt visade att k = 3 var det mest lämpliga valet.

För att få en konsekvent tolkning sorterades klustren efter medelpris och mappades till **Low Price**, **Medium Price** och **High Price**. På så sätt blev det tydligt hur faktorer som vind och temperatur påverkar priset.

När analysen var klar sparades modellen med `joblib`. Modellfilen hanteras med Git LFS i Git och GitHub för att stora binärfiler inte ska behöva lagras direkt i det vanliga Git-repositoryt.

#### Klassificering – SVM

SVM-modellen tränas och körs i vår ML-pipeline. Det som skiljer den från de andra modellerna är att den används för att identifiera den optimala timmen.

GridSearchCV användes för att söka efter hyperparametrarna `gamma` och `C`, och StandardScaler användes för skalning av datan. Genom denna metod genomfördes totalt 18 fittings.

För att förstå modellen bättre och bedöma om den var lämplig användes flera utvärderingsmått: `Accuracy`, `Precision`, `Recall`, `F1-score` och `ROC-AUC`. Utifrån dessa mått skapades en klassifikationsrapport och en `confusion matrix` användes för att ytterligare tydliggöra hur modellen presterade.

När modellen var färdig sparades den med hjälp av `joblib`. För att kunna hantera modellfilen i Git och GitHub används `Git LFS`, eftersom modellfilerna är stora och därför inte lämpar sig för att hanteras som vanliga filer i Git.

### Teknisk specifikation

#### Backend

Backend är utvecklad med FastAPI och ansvarar för att ladda de tränade modellerna, genomföra inference och exponera projektets funktionalitet genom API-endpoints.

Backenden är byggd med fokus på modularitet, driftsäkerhet och prestanda genom en struktur med modulära sub-routers under `/api/v1`. Vid uppstart laddas de serialiserade modellerna från `models_bin/`. Vid inkommande anrop förbehandlas parametrarna i en gemensam modul (`prepare_data`) och skickas därefter vidare till rätt modellpipeline för beräkning.

För kartvyn exponeras geospatiala GeoJSON-polygoner över Sveriges elområden via `/api/v1/energy-areas`, parallellt med väder- och spotprisdata.

För att applikationen ska fungera i produktion bakom en omvänd proxy, exempelvis Traefik eller Nginx, används en dynamisk `root_path`. Detta gör att interaktiv API-dokumentation genom OpenAPI och Swagger UI kan renderas korrekt även när applikationen körs under en subpath, exempelvis `/predictor/api/docs`.

För att hålla tidsserier och lag features på 24, 48 och 168 timmar uppdaterade utan att blockera API-trådarna används en separat bakgrundstjänst, `data-scheduler`. Den kör periodiskt skriptet `get_last_date.py` för att hämta nya spotpriser via ENTSO-E och matcha dessa med väderobservationer. Ny data skrivs till den delade volymen `dataset/` och blir därmed tillgänglig för modellerna.

Backenden testas med pytest och FastAPIs TestClient. Testerna omfattar bland annat endpoints, modellinläsning, inference, validering och felhantering för att minska risken för oväntade fel och bidra till en robust tjänst.

#### Frontend

Frontend är utvecklad med React och Vite och kommunicerar med backend genom API-anrop. Arbetet med frontend har haft fokus på användarupplevelse och tillgänglighet genom enkel navigering, responsiv design och tydlig visualisering av resultaten.

Användaren kan ta del av modellernas resultat tillsammans med väderdata och spartips som kan hjälpa till att optimera elanvändningen. Det finns även möjlighet att läsa mer om projektets tekniska delar och hur flödet mellan data, modeller och applikation fungerar.

Applikationen innehåller en interaktiv karta baserad på data från Svenska kraftnät. Där kan användaren klicka på olika delar av kartan och få mer information om respektive elområde i Sverige.

Frontenden testas med E2E-tester utvecklade med Playwright. Testerna används både för att kontrollera applikationens funktionalitet och för att säkerställa att centrala användarflöden fungerar som förväntat.

#### Veckoprognos och samspel mellan modellerna

Det aktuella flödet presenterar en veckoprognos med sju datapunkter: idag och sex kommande dagar. Den första dagen visas som **Idag/Today** i användargränssnittet, medan den underliggande modellen använder de verkliga datapunkterna från den laddade zonens dataset.

Backend räknar ut ett dagligt pris med den tränade Random Forest-modellen. K-Means används därefter för att klassificera prisnivån och SVM används för att avgöra om perioden rekommenderas för flexibel elanvändning. K-Means-modellens kluster-ID:n mappas efter modellens ordning, där lägst medelpris motsvarar låg prisnivå, följt av medel och hög.

SE1–SE4 hanteras genom att rätt pris- och väderkolumner väljs för det aktuella elområdet innan modellerna körs. Frontend presenterar därefter låg, medel eller hög prisnivå tillsammans med rekommendationen från SVM-modellen. Rekommendationen kommer därmed från modellens output och inte från hårdkodade tröskelvärden i klienten.

I nuläget behöver det lokala datasetet uppdateras genom skriptet `get_last_date.py`. Tanken för en liveversion är att denna process ska automatiseras så att aktuell data kontinuerligt kan göras tillgänglig för modellerna.

### Huvudresultat

Projektet har resulterat i en fungerande webbapplikation där databehandling och tre olika maskininlärningsmetoder kopplas samman med ett backend-API och ett användargränssnitt.

#### Regression

För regressionsdelen gav den optimerade Random Forest-modellen bäst resultat av de utvärderade modellerna. Modellen uppnådde ett MAE på **20,99 EUR/MWh**, jämfört med **26,41 EUR/MWh** för den naiva 24-timmars baselinen.

#### SVM

För SVM-delen fick vi resultat som motsvarade det vi önskade av modellen. När modellen utvärderades mot testdatan fick vi följande resultat:

```text
--- Evaluation on Testset ---

Accuracy:  0.7853
Precision: 0.5511
Recall:    0.7968
F1-score:  0.6516
ROC-AUC:   0.8630
```

Resultaten låg mycket nära de resultat som tidigare erhållits på valideringsdatan:

```text
--- Evaluation on Validation ---

Accuracy:  0.7825
Precision: 0.5470
Recall:    0.7928
F1-score:  0.6474
ROC-AUC:   0.8626
```

Resultaten för test- och valideringsdata ligger nära varandra för samtliga redovisade mått. Testresultaten är dessutom något högre än valideringsresultaten.

#### Klustring

Klustringen av 59 232 observationer gav en tydlig uppdelning av marknadens olika tillstånd och deras koppling till underliggande väderfaktorer:

| Priskluster  | Antal observationer | Medelpris (EUR/MWh) | Min pris | Max pris | Medelvind (km/h) | Medeltemp (°C) |
| ------------ | ------------------: | ------------------: | -------: | -------: | ---------------: | -------------: |
| Low Price    |              18 919 |               21,94 |   -92,88 |   162,70 |            21,14 |           7,13 |
| Medium Price |              26 280 |               29,58 |   -23,68 |   147,04 |             9,61 |          11,03 |
| High Price   |              14 033 |              109,25 |     2,47 |   486,31 |            10,37 |          -0,38 |

**Lågprisklustret:** Typiska förutsättningar för låga elpriser, med ett genomsnitt på 21,94 EUR/MWh, var hög vindhastighet på i genomsnitt 21,14 km/h kombinerat med mildare temperaturer på 7,13 °C. Den högre vindhastigheten indikerar samtidigt förutsättningar för högre vindkraftsproduktion.

**Högprisklustret:** Höga elpriser, med ett genomsnitt på 109,25 EUR/MWh, sammanföll med minusgrader på i genomsnitt -0,38 °C och en måttligare vindhastighet på 10,37 km/h.

### Utvärdering och reflektion över gruppens arbete

Trots den korta projekttiden har gruppen lyckats utveckla en fungerande helhetsprodukt där datainsamling, tre maskininlärningsmetoder, backend och frontend kopplas samman. En gemensam ambition har varit att alla i gruppen skulle arbeta med maskininlärning och få en förståelse för mer än sin egen modell.

En viktig lärdom har därför varit att läsa och förstå varandras modeller och kod. Eftersom vi arbetade med olika maskininlärningsmetoder har det ibland varit svårt att direkt förstå tanken bakom en annan gruppmedlems modellträning. Samtidigt har detta gett oss en bredare förståelse för modellering och för hur olika typer av modeller kan användas tillsammans i samma applikation.

Kommunikationen inom gruppen har överlag fungerat bra, även när vi inte har arbetat under samma tider. Gruppen har upplevts som tajt och kunskapsdelningen mellan medlemmarna har varit en styrka. Samtidigt har arbetsbelastningen periodvis varit ojämnt fördelad. I ett framtida projekt hade vi därför velat skapa en tydligare arbetsfördelning och större spridning av arbetsuppgifterna.

En annan utmaning har varit den gemensamma tekniska strukturen. Vi hade inte från början exakt samma bild av hur modellerna, filerna och applikationen skulle struktureras. Det ledde bland annat till att flera filer periodvis gjorde liknande saker och att sökvägar mellan olika delar av projektet skapade problem. Med en tydligare gemensam struktur för modeller, pipelines, scripts och filer från projektets början hade en del av detta arbete kunnat undvikas.

Vi har också identifierat att en tydligare kravspecifikation och gemensam målbild hade varit värdefull. Projektets förutsättningar förändrades under arbetets gång, där vissa delar försvann och nya metoder och krav tillkom relativt sent. Det gjorde det svårare att från början skapa en gemensam mental bild av slutprodukten och exakt hur de olika modellerna skulle användas.

En tydligare visualisering av vad vi skulle bygga, hur de olika modellerna skulle samverka och hur deras resultat skulle användas i applikationen hade därför varit en fördel. Vi hade även kunnat vara tydligare inom gruppen kring förväntningar och tekniska krav innan implementationen påbörjades.

En annan lärdom från projektet är värdet av en tydlig teknisk struktur när flera delar utvecklas parallellt. Gruppen har haft ambitionen att göra lösningen så produktionslik som möjligt, vilket har lett till arbete med bland annat modellhantering, Git LFS, tester, backendstruktur och deploymentrelaterade frågor. Detta har gett oss erfarenhet av hur en maskininlärningslösning kan utvecklas från enskilda modeller till en mer komplett applikation. Med mer tid hade vi velat bygga vidare på detta arbete genom att ytterligare förbättra projektstrukturen och utveckla deploymentprocessen.

Även användarupplevelsen hade kunnat vidareutvecklas. Framför allt hade det gått att göra ännu tydligare för användaren vad modellernas resultat innebär och hur de kan användas för att planera elanvändningen. Med fortsatt utveckling ser vi potential att bygga vidare på projektet mot en mer fullskalig applikation.

Sammantaget är vi mycket nöjda med slutresultatet och med vad vi har lyckats åstadkomma under den tillgängliga tiden. Trots förändrade förutsättningar, tekniska utmaningar och en periodvis ojämn arbetsbelastning har vi fått fram en fungerande produkt som knyter samman våra tre maskininlärningsdelar. Vi är även nöjda med den kunskapsdelning som skett inom gruppen och den ökade förståelse vi fått för både våra egna och varandras delar av projektet.
