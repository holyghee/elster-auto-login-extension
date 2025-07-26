# 🎨 Logo Setup für Elster Auto-Login Extension

## Icons erstellen

Ich habe zwei Scripts für Sie vorbereitet:

### 1. **create-icons.sh** - Erstellt die Icon-Dateien
```bash
# Normale Icons erstellen
./create-icons.sh

# Mit Store-Icons für Chrome Web Store
./create-icons.sh --store
```

Dieses Script erstellt aus `elster-auto-login-extention-logo.png`:
- `icon16.png` (16x16) - Für Browser-Toolbar
- `icon48.png` (48x48) - Für Extensions-Seite
- `icon128.png` (128x128) - Für Installation/Store

### 2. **release-to-github.sh** - Automatisches Release
Das Release-Script erstellt jetzt automatisch die Icons aus Ihrem Logo, bevor es das Repository hochlädt.

## Verwendung

1. Legen Sie Ihr Logo als `elster-auto-login-extention-logo.png` im Projektordner ab
2. Führen Sie das Release-Script aus:
   ```bash
   ./release-to-github.sh
   ```
3. Das Script erstellt automatisch alle benötigten Icon-Größen

## Datenschutz

Mit Ihrem eigenen Logo vermeiden Sie:
- ✅ Urheberrechtsprobleme
- ✅ Markenrechtskonflikte  
- ✅ Lizenzprobleme

## Tipp

Falls Sie die Icons aktualisieren möchten:
```bash
# Icons neu erstellen
./create-icons.sh

# Release mit neuen Icons
./release-to-github.sh --refresh-icons
```