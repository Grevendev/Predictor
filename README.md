# Weather corelation with spot_price on the Swedish market

This application is under progress...

Star ⭐ it and find out our way to fully function application



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