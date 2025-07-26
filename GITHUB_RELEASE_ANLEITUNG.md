# GitHub Release Anleitung

## Automatisches Release mit GitHub Actions (Empfohlen)

### 1. Repository erstellen
```bash
# In Ihrem Terminal im Projektordner
git init
git add .
git commit -m "Initial commit: Elster Auto-Login Extension v1.0.0"
```

### 2. Auf GitHub pushen
1. Erstellen Sie ein neues Repository auf GitHub: https://github.com/new
   - Name: `elster-auto-login-extension`
   - Beschreibung: "Chrome Extension für automatischen Elster Login mit Zertifikat"
   - Public (für Open Source)

2. Verbinden und pushen:
```bash
git remote add origin https://github.com/IhrUsername/elster-auto-login-extension.git
git branch -M main
git push -u origin main
```

### 3. Release erstellen mit Tag
```bash
# Version taggen
git tag -a v1.0.0 -m "Erste Veröffentlichung"
git push origin v1.0.0
```

Der GitHub Actions Workflow wird automatisch:
- Eine ZIP-Datei erstellen
- Ein Release mit der ZIP als Download erstellen
- Die Release Notes hinzufügen

## Manuelles Release (Alternative)

### 1. ZIP erstellen
```bash
# Lokale ZIP erstellen
mkdir release-temp
cp manifest.json *.js *.html *.css *.png *.md release-temp/
cd release-temp
zip -r ../elster-auto-login-extension-v1.0.0.zip *
cd ..
rm -rf release-temp
```

### 2. Release auf GitHub erstellen
1. Gehen Sie zu: https://github.com/IhrUsername/elster-auto-login-extension/releases
2. Klicken Sie auf "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `Elster Auto-Login Extension v1.0.0`
5. Fügen Sie den Inhalt von `RELEASE_NOTES.md` ein
6. Laden Sie die ZIP-Datei hoch
7. Klicken Sie auf "Publish release"

## Chrome Web Store Vorbereitung

### Zusätzliche Assets erstellen
1. **Screenshots** (1280x800 oder 640x400):
   - Hauptansicht der Extension
   - Login-Button Demonstration
   - Einstellungen

2. **Promotional Images**:
   - Small tile: 440x280
   - Large tile: 920x680

3. **Store Listing**:
```
Titel: Elster Auto-Login - Zertifikat Login Automatisierung

Kurzbeschreibung (132 Zeichen):
Automatisiert den Login bei Elster mit Ihrer Zertifikatsdatei. Sicher, schnell und einfach.

Detaillierte Beschreibung:
Die Elster Auto-Login Extension automatisiert den Anmeldeprozess bei Elster mit Ihrer Zertifikatsdatei (.pfx/.p12).

FEATURES:
✅ Automatisches Ausfüllen der Login-Felder
✅ Sichere AES-256 Verschlüsselung für Passwörter
✅ Ein-Klick-Zugang zu Elster
✅ Erkennung ungültiger Zertifikate
✅ 100% lokale Datenspeicherung
✅ Open Source

SICHERHEIT:
- Militärgrade Verschlüsselung (AES-256-GCM)
- Keine Cloud-Verbindung
- Alle Daten bleiben auf Ihrem Computer
- Vollständig transparent (Open Source)

VERWENDUNG:
1. Extension installieren
2. Zertifikatsdatei auswählen
3. Passwort eingeben
4. Auto-Login aktivieren
5. Fertig!

SUPPORT:
GitHub: https://github.com/IhrUsername/elster-auto-login-extension
```

### Kategorien für Chrome Web Store:
- Hauptkategorie: Produktivität
- Sprache: Deutsch

## Veröffentlichungs-Checkliste

- [ ] Code auf Sicherheitslücken geprüft
- [ ] Alle Test-Dateien entfernt
- [ ] README.md aktuell
- [ ] DATENSCHUTZ.md vollständig
- [ ] Version in manifest.json korrekt
- [ ] .gitignore erstellt
- [ ] GitHub Actions Workflow vorhanden
- [ ] Release Notes geschrieben
- [ ] Screenshots erstellt
- [ ] Extension lokal getestet

## Wartung

### Version Updates
1. Version in `manifest.json` erhöhen
2. `RELEASE_NOTES.md` aktualisieren
3. Commit und neuen Tag erstellen:
```bash
git add .
git commit -m "Version 1.0.1: Bugfixes"
git tag -a v1.0.1 -m "Bugfix Release"
git push origin main
git push origin v1.0.1
```

Der GitHub Actions Workflow erstellt automatisch ein neues Release!