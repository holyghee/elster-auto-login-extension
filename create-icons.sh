#!/bin/bash

# Script zum Erstellen der Icon-Dateien aus dem neuen Logo
echo "🎨 Erstelle Icons aus elster-auto-login-extention-logo.png..."

# Prüfe ob das Logo existiert
if [ ! -f "elster-auto-login-extention-logo.png" ]; then
    echo "❌ Fehler: elster-auto-login-extention-logo.png nicht gefunden!"
    echo "Bitte stellen Sie sicher, dass die Datei im aktuellen Verzeichnis liegt."
    exit 1
fi

# Prüfe ob ImageMagick installiert ist
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick ist nicht installiert."
    echo "Auf macOS installieren mit: brew install imagemagick"
    echo "Auf Linux: sudo apt-get install imagemagick"
    exit 1
fi

# Erstelle Icons in verschiedenen Größen
echo "📐 Erstelle icon16.png (16x16)..."
convert elster-auto-login-extention-logo.png -resize 16x16 icon16.png

echo "📐 Erstelle icon48.png (48x48)..."
convert elster-auto-login-extention-logo.png -resize 48x48 icon48.png

echo "📐 Erstelle icon128.png (128x128)..."
convert elster-auto-login-extention-logo.png -resize 128x128 icon128.png

# Optional: Erstelle zusätzliche Größen für Chrome Web Store
if [ "$1" == "--store" ]; then
    echo "🏪 Erstelle zusätzliche Icons für Chrome Web Store..."
    
    echo "📐 Erstelle store-icon-440x280.png..."
    convert elster-auto-login-extention-logo.png -resize 440x280 -gravity center -extent 440x280 -background white store-icon-440x280.png
    
    echo "📐 Erstelle store-icon-920x680.png..."
    convert elster-auto-login-extention-logo.png -resize 920x680 -gravity center -extent 920x680 -background white store-icon-920x680.png
fi

echo "✅ Icons erfolgreich erstellt!"
echo ""
echo "Erstellte Dateien:"
ls -la icon*.png
if [ "$1" == "--store" ]; then
    ls -la store-icon*.png
fi