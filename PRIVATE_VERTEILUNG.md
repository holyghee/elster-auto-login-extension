# Private Verteilung der Extension

## Methode 1: CRX-Datei (Funktioniert nur begrenzt)

### Erstellen:
1. Chrome öffnen → `chrome://extensions/`
2. Entwicklermodus aktivieren
3. "Erweiterung packen" klicken
4. Ordner auswählen: `elster-extension-release`
5. Chrome erstellt eine .crx Datei

### Problem:
- Seit Chrome 75 können CRX-Dateien von unbekannten Quellen NICHT mehr direkt installiert werden
- Chrome blockiert die Installation aus Sicherheitsgründen

## Methode 2: Unternehmensrichtlinien (Für Firmen)

Unternehmen können Extensions über Gruppenrichtlinien installieren:
- Benötigt IT-Administrator-Rechte
- Funktioniert nur in Unternehmensumgebungen

## Empfehlung für Privatnutzer:

### Option A: Einfache Anleitung erstellen
Erstellen Sie eine benutzerfreundliche PDF-Anleitung mit Screenshots:

1. "So installieren Sie die Elster Auto-Login Extension"
2. Schritt-für-Schritt mit Bildern
3. Dauert nur 2 Minuten
4. Einmalige Installation

### Option B: Installer-Script
Ein einfaches Batch-Script für Windows, das:
- Den Ordner an den richtigen Ort kopiert
- Eine Desktop-Verknüpfung zu chrome://extensions erstellt
- Anweisungen anzeigt

## Sicherheitshinweis:
Google hat diese Einschränkungen aus Sicherheitsgründen eingeführt. 
Der Chrome Web Store ist der einzige offizielle Weg für normale Nutzer.