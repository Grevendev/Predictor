So far:

### Datainsamling och modellutveckling

Projektets dataset har skapats från grunden istället för att använda ett färdigt dataset från exempelvis Kaggle. Historiska spotpriser för Sveriges fyra elområden (SE1–SE4) har hämtats via API och kombinerats med väderdata för motsvarande områden och tidsperiod. Därefter har informationen bearbetats och sammanfogats till ett gemensamt dataset med timbaserade observationer. Detta har gett gruppen praktisk erfarenhet av hela dataflödet, från datainsamling och integration till preprocessing och modellering.

För regressionsdelen genomfördes först explorativ dataanalys (EDA) för att undersöka bland annat prisvariationer, vädervariabler, tidsmönster och skillnader mellan elområden. Datasetet transformerades därefter till ett format där samtliga fyra elområden kan användas av en gemensam modell. Feature engineering genomfördes med tidsvariabler, elområde samt historiska priser (lag features på 24, 48 och 168 timmar).

Flera regressionsmetoder jämfördes mot en naiv 24-timmars baseline. Linear Regression, Random Forest och en hyperparameteroptimerad Random Forest utvärderades på en separat framtida testperiod. Den optimerade Random Forest-modellen presterade bäst med MAE 20,99 EUR/MWh jämfört med baselinens 26,41 EUR/MWh, samt lägst RMSE och högst R² av de testade regressionsmodellerna. Modellen optimerades med RandomizedSearchCV och tidsserieanpassad cross-validation för att undvika att framtida observationer används vid träning.

Parallellt har gruppen arbetat med klustring för att identifiera återkommande mönster i data samt SVM för ytterligare analys och prediktion. De färdigtränade modellerna sparas som modellfiler och integreras i backend genom ett gemensamt loader- och inferenceflöde. Modellfilerna hanteras med Git LFS för att undvika att stora binära filer lagras direkt i det vanliga Git-repositoryt.
