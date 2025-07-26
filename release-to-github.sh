#!/bin/bash

# GitHub Release Script für Elster Auto-Login Extension
# Verwendung: ./release-to-github.sh

echo "🚀 Elster Auto-Login Extension - GitHub Release Script"
echo "======================================================"

# Farben für bessere Lesbarkeit
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Basis-Verzeichnis
BASE_DIR="/Users/holgerbrandt/dev/claude-code/projects/elster-auto-login-extension"

# Prüfe ob wir im richtigen Verzeichnis sind
if [ ! -f "manifest.json" ]; then
    echo -e "${RED}❌ Fehler: manifest.json nicht gefunden!${NC}"
    echo "Bitte führen Sie dieses Script im Extension-Verzeichnis aus:"
    echo "cd $BASE_DIR"
    exit 1
fi

# Git Status prüfen
echo -e "\n${YELLOW}📋 Aktueller Git Status:${NC}"
git status --short

# Frage nach Bestätigung
echo -e "\n${YELLOW}Möchten Sie fortfahren? (j/n)${NC}"
read -r response
if [[ ! "$response" =~ ^[jJ]$ ]]; then
    echo "Abgebrochen."
    exit 0
fi

# Erstelle Icons aus dem Logo falls noch nicht vorhanden
if [ ! -f "icon128.png" ] || [ "$1" == "--refresh-icons" ]; then
    echo -e "\n${YELLOW}🎨 Erstelle Icons aus Ihrem Logo...${NC}"
    if [ -f "create-icons.sh" ]; then
        ./create-icons.sh
    else
        echo -e "${RED}❌ create-icons.sh nicht gefunden!${NC}"
    fi
fi

# Git initialisieren falls noch nicht geschehen
if [ ! -d ".git" ]; then
    echo -e "\n${YELLOW}🔧 Initialisiere Git Repository...${NC}"
    git init
    git branch -M main
fi

# Erstelle .gitignore falls nicht vorhanden
if [ ! -f ".gitignore" ]; then
    echo -e "\n${YELLOW}📝 Erstelle .gitignore...${NC}"
    cat > .gitignore << 'EOL'
node_modules/
.DS_Store
*.log
*.tmp
.env
package-lock.json
test-*.js
debug-*.js
*.tar.gz
*.zip
*.crx
.vscode/
.idea/
Thumbs.db
elster.png
elster-login-page.png
elster-auto-login-extention-logo.png
prepare-extension.sh
create-icons.sh
EOL
fi

# Alle Dateien hinzufügen
echo -e "\n${YELLOW}📦 Füge Dateien zu Git hinzu...${NC}"
git add .
git add -A

# Commit erstellen
echo -e "\n${YELLOW}💾 Erstelle Commit...${NC}"
echo "Geben Sie eine Commit-Nachricht ein (oder Enter für Standard):"
read -r commit_message
if [ -z "$commit_message" ]; then
    commit_message="Release v1.0.0: Erste Veröffentlichung der Elster Auto-Login Extension"
fi
git commit -m "$commit_message"

# GitHub Remote Setup
echo -e "\n${YELLOW}🌐 GitHub Repository Setup${NC}"
echo "Haben Sie bereits ein GitHub Repository erstellt? (j/n)"
read -r has_repo

if [[ "$has_repo" =~ ^[nN]$ ]]; then
    echo -e "\n${RED}Bitte erstellen Sie zuerst ein Repository auf GitHub:${NC}"
    echo "1. Gehen Sie zu: https://github.com/new"
    echo "2. Name: elster-auto-login-extension"
    echo "3. Beschreibung: Chrome Extension für automatischen Elster Login mit Zertifikat"
    echo "4. Public auswählen (für Open Source)"
    echo "5. KEIN README, .gitignore oder License hinzufügen"
    echo -e "\n${YELLOW}Drücken Sie Enter wenn das Repository erstellt wurde...${NC}"
    read -r
fi

# GitHub Username abfragen
echo -e "\n${YELLOW}Geben Sie Ihren GitHub Benutzernamen ein:${NC}"
read -r github_username

# Remote hinzufügen
echo -e "\n${YELLOW}🔗 Verbinde mit GitHub...${NC}"
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${github_username}/elster-auto-login-extension.git"

# Push zum Repository
echo -e "\n${YELLOW}📤 Push zum GitHub Repository...${NC}"
echo "Sie werden nach Ihren GitHub Credentials gefragt."
git push -u origin main

# Release vorbereiten
echo -e "\n${GREEN}✅ Repository erfolgreich gepusht!${NC}"
echo -e "\n${YELLOW}📦 Erstelle Release ZIP...${NC}"

# Temporäres Verzeichnis für Release
RELEASE_DIR="release-temp"
rm -rf $RELEASE_DIR
mkdir -p $RELEASE_DIR

# Kopiere nur die notwendigen Dateien
cp manifest.json $RELEASE_DIR/
cp background.js $RELEASE_DIR/
cp content.js $RELEASE_DIR/
cp popup.js $RELEASE_DIR/
cp popup.html $RELEASE_DIR/
cp popup.css $RELEASE_DIR/
cp crypto-utils.js $RELEASE_DIR/
cp icon*.png $RELEASE_DIR/
cp README.md $RELEASE_DIR/
cp DATENSCHUTZ.md $RELEASE_DIR/

# ZIP erstellen
cd $RELEASE_DIR
zip -r ../elster-auto-login-extension-v1.0.0.zip *
cd ..
rm -rf $RELEASE_DIR

echo -e "${GREEN}✅ Release ZIP erstellt: elster-auto-login-extension-v1.0.0.zip${NC}"

# Tag erstellen und pushen
echo -e "\n${YELLOW}🏷️  Erstelle Version Tag...${NC}"
git tag -a v1.0.0 -m "Version 1.0.0: Erste Veröffentlichung"
git push origin v1.0.0

echo -e "\n${GREEN}🎉 Fertig! Nächste Schritte:${NC}"
echo "1. Gehen Sie zu: https://github.com/${github_username}/elster-auto-login-extension/releases"
echo "2. Klicken Sie auf 'Draft a new release'"
echo "3. Wählen Sie den Tag 'v1.0.0'"
echo "4. Titel: 'Elster Auto-Login Extension v1.0.0'"
echo "5. Fügen Sie die Release Notes aus RELEASE_NOTES.md ein"
echo "6. Laden Sie die ZIP-Datei hoch: elster-auto-login-extension-v1.0.0.zip"
echo "7. Klicken Sie auf 'Publish release'"

echo -e "\n${YELLOW}Optional: GitHub Pages für Dokumentation aktivieren:${NC}"
echo "- Settings → Pages → Source: Deploy from a branch"
echo "- Branch: main → / (root) → Save"

echo -e "\n${GREEN}Viel Erfolg mit Ihrer Extension! 🚀${NC}"