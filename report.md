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

SVM - modellen tränas och kör vår ML-pipeline, det som skiljer sig från de andra modellerna är att den letar efter den optimala timmen. Genom att använda GridSearchCV för att leta efter hyperparamterar `gamma` och `C`, den använder sig av StandardScaler för skalning av datan. Genom denna metod får vi ut total fitting på 18. Men för att förstå datan mer och om modellen var lämplig så användes olika måttenheter, såsom `Accuarcy`, `Precision`, `Recall`, `F1-score` och `ROC-AUC`. Med dessa måttenheterna så fick vi fram en klassifikations rapport som blev tyldig. Vi använde en `confusion matrix`för att få det ännu tydligare hur modellen presterade. När allt detta var gjort så sparades modellen med hjälp av `joblib`. För att kunna hantera modellen i git och GitHub användes `Git LFS`. Då modeller blir stora och det finns risk att de blir manipulerade om man försöker "ladda" upp de som om de vore en vanlig fil. 

### Teknisk specifikation

Backend är utvecklad med FastAPI och ansvarar för att ladda de tränade modellerna, genomföra inference och exponera projektets funktionalitet genom API-endpoints. Backend testas med pytest och FastAPIs TestClient, med tester för bland annat endpoints, modellinläsning, inference, validering och felhantering.

Frontend är utvecklad med React och Vite och kommunicerar med backend genom API-anrop. Frontenden är byggd med fokus på användare upplevelsen och användare tillgängliget. Genom enkel navigering i menyer och med en responsiv design. Tydlighet i vad användare får ut för resultat genom visualiering av både modellens resultat på sökningen och genom väderdata. Spartips som kan vara värdefulla för användaren är med för att hjälpa användaren optimera sin elanvänding. Där finns ytterligare djupdykning användren kan läsa. Genom en intraktiv data som är byggd med *Svenska Kraftnäts-data* där användaren kan klicka på kartan och få ut mer information om ett visst elområde i Sverige. Vidare kan användaren läsa hur flödet fungerar och mer tekniks information för den intresserade läsaren. Hela frontenden testas med E2E tester som är gjorda med PlayWright. Detta för att både skydda tjänsten men även för att öka användare-upplevelsen.  
### Huvudresultat

Projektet har resulterat i en webbapplikation där projektets databehandling och maskininlärningsmodeller kopplas samman med ett backend-API och ett användargränssnitt.

För regressionsdelen gav den optimerade Random Forest-modellen bäst resultat av de utvärderade modellerna, med ett MAE på 20,99 EUR/MWh jämfört med 26,41 EUR/MWh för den naiva 24-timmars baselinen.

För SVM-delen gav den resultat som motsvarade vad som önskades av modellen. När de olika måttenheterna kördes mot test-datan fick vi ut dessa resultaten. 
````
--- Evaluation on Testset ---
Accuracy:  0.7853
Precision: 0.5511
Recall:    0.7968
F1-score:  0.6516
ROC-AUC:   0.8630
````
Jämfört mot resultaten från vår valideringsdata så var det resulatet bra. 
````
--- Evaluation on Validation ---
Accuracy:  0.7825
Precision: 0.5470
Recall:    0.7928
F1-score:  0.6474
ROC-AUC:   0.8626
````

### Utvärdering av gruppens arbete
Kompletteras gemensamt av gruppen - tisdag förslagsvis


**Kommentarer till gruppen inför färdig rapport:** Komplettera modellavsnittet och huvudresultatet med klustring och klassificering så att alla tre ML-delar finns representerade. Utvärderingen behöver fyllas på med vad som fungerat bra, vad vi har lärt oss, hur samarbetet och arbetet med Git/GitHub har fungerat samt vad vi hade gjort annorlunda. Vi kan även överväga att lägga till Docker, pipelines och scripts under den tekniska specifikationen, samt något mer om Playwright/frontend om det finns utrymme. Kontrollera slutligen att beskrivningen av webbappens funktionalitet motsvarar exakt det som finns implementerat i slutversionen.

### Weekly forecast update
Det aktuella flödet visar en veckoprognos med exakt sju datapunkter: idag + sex kommande dagar i UI:t. Första dagen visas alltid som "Idag"/"Today" i användargränssnittet, medan den underliggande modellen fortfarande använder verkliga datapunkter från den laddade zonens dataset. Backendet räknar ut ett dagligt pris med den tränade Random Forest-modellen, klassificerar dagens prisnivå med KMeans-klustring och använder SVM för att avgöra om dagen rekommenderas för flexibel elanvändning. Klustringens raw-ID:n mappas enligt modellens ordning (lägst pris = låg, mellanliggande = medel, högst pris = hög) för att undvika felaktig tolkning av klusternummer.

SE1–SE4 hanteras genom att välja rätt pris- och väderkolumner för aktuell zon innan modellen körs. Frontend visar staplar i rätt färg för låg/medel/hög nivå, samt en rekommendation som kommer från SVM-output, inte från klientlogik eller hårdkodade trösklar. I nuläget måste det lokaladatasetet uppdateras manuellt via scriptet get_last_date.py tanken är att scriptet ska köra sig själv i en live version.


Retro: Vad har gått bra, vad hade vi kunnat göra bättre och vad har vi lärt oss och hur hade vi kunnat vidareutveckla projektet?

Jag tycker att under väldigt kort tid har vi fått väldigt mycket gjort, mitt mål var att alla skulle sitta med ml och förstå. Vi limiterads en del av bortfall men skötte god kommunikation sinsemellan även om vi inte arbeta samma tider. Jag har lärt mig att läsa andras modeller och få större insikt i modellering. Jag hade uppskattat mindre nice to haves och robustare grund.

Edvin tycker att det är bra att vi har en fullfärdad produkt som går att använda av alla, mindre bra är arbetsbelastningen i gruppen, ojämn i förhållande till vad produkten är nu. Jag har lärt mig att det kan va komplicerat att förstå vad andras tankar är med deras specifika modellträning. Vidareutveckling samarbetsförmågor, arbetsbelastnings utjämning och det hade kunnat utvecklats i app att det blir en tydlighet i vad användaren får. 

Mer spridning över arbeter

Jarl: jag tycker att vi har en tajt grupp, vi har haft lite problem med att vi har inte arbetat med samma modell. Strukturen såg ut på ett vis från början men vi kanske skulle haft samma bild av hur den skulle se ut. De förkom flera filer som gjorde samma arbete. Hur tänker vi hantera filerna på samma sätt. Absolut har jag lärt mig titta mer på alla modeller. Halvt helvete med alla jävla paths. Vill försöka få det så produktionslikt som möjligt. vidareutveckla bättre struktur inklusive deployment delen.

Visualiseringen om vad det är vi bygger och vart/ hur vi ska använda de olika modellerna. Jag tror absolut att appen hade kunnat vidareutvecklas till en fullskalig app.

Bättre kommunikation om vilka krav vi har, förväntningar, den mentala bilden. Vi har insett att vi inte haft någon tydlig kravspec från början kanske från vårat eget håll men även utbildningens om vad vi ska ha från början. Det har också känts som att projektet förändrats, bortfall av db och tillkomst av nya metoder 4 dagar innan projektslut. Spretigt

Summa summarum, vi är väldigt nöjda över vårat slutresultat och vad vi har kunnat visa upp. Vi är nöjda med vår kunskapsdelning sinsemellan och trots stort arbete är vi nöjda.Det vi har skapat är bra utifrån de tre krav som presenterades känner vi att vi har gjort ett bra arbete. Luddig krav spec
