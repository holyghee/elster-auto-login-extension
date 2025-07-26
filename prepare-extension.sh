#!/bin/bash

# Erstelle Icons in verschiedenen Größen aus elster.png
echo "Erstelle Icon-Dateien..."

# Installiere ImageMagick falls nicht vorhanden
if ! command -v convert &> /dev/null; then
    echo "Installiere ImageMagick..."
    apt-get update && apt-get install -y imagemagick
fi

# Erstelle Icons in verschiedenen Größen
convert elster.png -resize 16x16 icon16.png
convert elster.png -resize 48x48 icon48.png
convert elster.png -resize 128x128 icon128.png

echo "Icons erstellt!"

# Erstelle Verzeichnis für die verpackte Extension
mkdir -p ../elster-extension-release

# Kopiere nur die notwendigen Dateien (ohne node_modules, Tests, etc.)
echo "Kopiere Extension-Dateien..."
cp manifest.json ../elster-extension-release/
cp background.js ../elster-extension-release/
cp content.js ../elster-extension-release/
cp popup.html ../elster-extension-release/
cp popup.css ../elster-extension-release/
cp popup.js ../elster-extension-release/
cp icon16.png ../elster-extension-release/
cp icon48.png ../elster-extension-release/
cp icon128.png ../elster-extension-release/

# Erstelle ZIP-Datei für Chrome Web Store
cd ../elster-extension-release
zip -r elster-auto-login-extension.zip *

echo "Extension verpackt!"
echo "Die verpackte Extension befindet sich in: ../elster-extension-release/elster-auto-login-extension.zip"
echo ""
echo "Nächste Schritte:"
echo "1. Für private Nutzung: Chrome → Erweiterungen → Entwicklermodus → 'Entpackte Erweiterung laden' → Ordner 'elster-extension-release' auswählen"
echo "2. Für Chrome Web Store: Die ZIP-Datei bei https://chrome.google.com/webstore/devconsole hochladen"