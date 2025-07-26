# 🔐 Elster Auto-Login Chrome Extension

Eine Chrome-Erweiterung, die die Anmeldung bei Elster.de mit Zertifikatsdatei automatisiert.

## ✨ Funktionen

### Automatische Anmeldung
- **Zertifikat-Upload**: Lädt automatisch Ihre gespeicherte .pfx/.p12 Zertifikatsdatei hoch
- **Passwort-Eingabe**: Füllt das Passwortfeld automatisch aus
- **Login-Button**: Klickt automatisch auf den "Bestätigen"-Button
- **Sofort einsatzbereit**: Funktioniert beim Aufrufen von elster.de ohne weitere Interaktion

### Sicherheit & Datenschutz
- **Lokale Speicherung**: Alle Daten werden nur lokal auf Ihrem Computer gespeichert
- **Starke Verschlüsselung**: Passwörter werden mit AES-256-GCM verschlüsselt (Web Crypto API)
- **Keine Cloud**: Keine Daten werden an externe Server gesendet
- **Open Source**: Der komplette Quellcode ist einsehbar
- **Datenschutz**: Siehe detaillierte [Datenschutzerklärung](DATENSCHUTZ.md)

### Fehlerbehandlung
- **Zertifikatsprüfung**: Erkennt automatisch ungültige oder abgelaufene Zertifikate
- **Benutzerhinweise**: Zeigt deutliche Warnmeldungen bei Problemen
- **Anleitung zur Fehlerbehebung**: Schritt-für-Schritt Anleitungen direkt in der Warnung
- **Browser-Benachrichtigungen**: Informiert über wichtige Ereignisse

## 📋 Voraussetzungen

- Google Chrome Browser
- Gültige Elster-Zertifikatsdatei (.pfx oder .p12)
- Passwort für die Zertifikatsdatei

## 🚀 Installation

### Option 1: Entwicklermodus (Empfohlen für Privatnutzer)
1. Chrome öffnen und `chrome://extensions/` aufrufen
2. "Entwicklermodus" oben rechts aktivieren
3. "Entpackte Erweiterung laden" klicken
4. Den Ordner `elster-extension-release` auswählen

### Option 2: Chrome Web Store (Für öffentliche Verteilung)
- Die Extension kann im Chrome Web Store veröffentlicht werden
- Siehe `CHROME_STORE_ANLEITUNG.md` für Details

## 🎯 Verwendung

1. **Einrichtung** (einmalig):
   - Klicken Sie auf das Elster-Icon in der Chrome-Toolbar
   - Wählen Sie Ihre .pfx Zertifikatsdatei aus
   - Geben Sie Ihr Passwort ein
   - Aktivieren Sie "Auto-Login aktivieren"
   - Klicken Sie auf "Speichern"

2. **Automatische Anmeldung**:
   - Besuchen Sie elster.de
   - Die Extension erkennt die Login-Seite automatisch
   - Zertifikat und Passwort werden automatisch eingefügt
   - Der Login erfolgt automatisch

3. **Bei Problemen**:
   - Die Extension zeigt eine rote Warnung bei Zertifikatsfehlern
   - Folgen Sie den Anweisungen in der Warnung
   - Laden Sie ggf. ein neues Zertifikat von Elster herunter

## 🔧 Technische Details

### Dateien
- `manifest.json` - Extension-Konfiguration
- `background.js` - Hintergrund-Service für Tab-Überwachung
- `content.js` - Interaktion mit der Elster-Webseite
- `popup.html/js/css` - Benutzeroberfläche der Extension
- `icon*.png` - Extension-Icons in verschiedenen Größen

### Berechtigungen
- `storage` - Zum Speichern der Zugangsdaten
- `activeTab` - Zum Interagieren mit der aktuellen Seite
- `scripting` - Zum Ausführen von Skripten auf elster.de
- `notifications` - Für Fehlerbenachrichtigungen

### Sicherheitsmerkmale
- Funktioniert nur auf `*.elster.de` Domains
- Keine externen Abhängigkeiten
- Minimale Berechtigungen
- Transparenter Quellcode

## ⚠️ Wichtige Hinweise

- **Sicherheit**: Bewahren Sie Ihre Zertifikatsdatei sicher auf
- **Updates**: Bei Zertifikatserneuerung müssen Sie die neue Datei in der Extension hinterlegen
- **Browser-Wechsel**: Die Zugangsdaten müssen bei einem Browser-Wechsel neu eingegeben werden
- **Entwicklermodus**: Muss aktiviert bleiben, damit die Extension funktioniert

## 🆘 Fehlerbehebung

**Extension funktioniert nicht?**
- Prüfen Sie, ob der Entwicklermodus aktiviert ist
- Laden Sie die Extension neu (Reload-Button)
- Löschen Sie den Browser-Cache

**Login schlägt fehl?**
- Überprüfen Sie, ob Ihr Zertifikat noch gültig ist
- Kontrollieren Sie Ihr Passwort
- Laden Sie ggf. ein neues Zertifikat von Elster herunter

**Zertifikat wird nicht erkannt?**
- Stellen Sie sicher, dass es eine .pfx oder .p12 Datei ist
- Die Datei darf nicht beschädigt sein
- Versuchen Sie, die Datei manuell bei Elster hochzuladen

## 📄 Lizenz

Diese Extension ist für den privaten Gebrauch bestimmt. Bei Weitergabe oder Veröffentlichung beachten Sie die geltenden Bestimmungen.

---

Bei Fragen oder Problemen erstellen Sie gerne ein Issue oder kontaktieren Sie den Entwickler.