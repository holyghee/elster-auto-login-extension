# Datenschutzerklärung - Elster Auto-Login Extension

## Zusammenfassung
Die Elster Auto-Login Extension speichert Ihre Zugangsdaten **ausschließlich lokal** auf Ihrem Computer. Es werden **keine Daten** an externe Server übertragen oder mit Dritten geteilt.

## Welche Daten werden gespeichert?

### Lokal gespeicherte Daten:
- **Zertifikatsdatei**: Ihre .pfx/.p12 Datei wird lokal im Browser-Speicher abgelegt
- **Passwort**: Wird mit AES-256-GCM verschlüsselt und lokal gespeichert
- **Dateiname**: Der Name Ihrer Zertifikatsdatei
- **Einstellungen**: Ob Auto-Login aktiviert ist

### Verschlüsselung:
- Passwörter werden mit der **Web Crypto API** und **AES-256-GCM** verschlüsselt
- Der Verschlüsselungsschlüssel wird automatisch generiert und sicher lokal gespeichert
- Die Verschlüsselung entspricht aktuellen Sicherheitsstandards

## Wo werden die Daten gespeichert?
- Alle Daten werden in Chrome's lokalem Speicher (`chrome.storage.local`) gespeichert
- Dieser Speicher ist nur für diese Extension zugänglich
- Die Daten werden nicht synchronisiert oder in die Cloud hochgeladen

## Datenübertragung
- **Keine Internetverbindung erforderlich**: Die Extension funktioniert vollständig offline
- **Keine Server-Kommunikation**: Es werden keine Daten an externe Server gesendet
- **Keine Tracking oder Analytik**: Es werden keine Nutzungsdaten erfasst
- **Keine Werbung**: Die Extension enthält keine Werbekomponenten

## Berechtigungen
Die Extension benötigt folgende Berechtigungen:

### `storage`
- **Zweck**: Speichern Ihrer verschlüsselten Zugangsdaten
- **Umfang**: Nur lokaler Speicher, keine Cloud-Synchronisation

### `activeTab` & `scripting`
- **Zweck**: Automatisches Ausfüllen der Login-Felder auf elster.de
- **Umfang**: Nur auf elster.de Domains aktiv

### `notifications`
- **Zweck**: Anzeige von Fehlermeldungen bei Zertifikatsproblemen
- **Umfang**: Nur lokale Browser-Benachrichtigungen

## Datenlöschung
Sie können Ihre Daten jederzeit vollständig löschen:

1. **Über die Extension**: Klicken Sie auf "Alle Daten löschen" im Popup
2. **Über Chrome**: Deinstallieren Sie die Extension
3. **Manuell**: Löschen Sie den Browser-Cache und lokalen Speicher

## Open Source
- Der vollständige Quellcode ist einsehbar
- Sie können jederzeit überprüfen, was die Extension macht
- Keine versteckten Funktionen oder Hintertüren

## Ihre Rechte
- Sie haben die volle Kontrolle über Ihre Daten
- Sie können die Extension jederzeit deinstallieren
- Alle Daten bleiben auf Ihrem Gerät

## Sicherheitshinweise
- Bewahren Sie Ihr Zertifikat sicher auf
- Nutzen Sie ein sicheres Passwort
- Aktualisieren Sie die Extension bei Sicherheitsupdates
- Melden Sie Sicherheitsprobleme umgehend

## Kontakt
Bei Fragen zum Datenschutz oder zur Sicherheit kontaktieren Sie bitte den Entwickler über GitHub Issues.

## Änderungen
Diese Datenschutzerklärung kann bei Bedarf aktualisiert werden. Änderungen werden in der Extension-Beschreibung kommuniziert.

Stand: Januar 2025