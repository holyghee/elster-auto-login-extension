// Content Script für Elster-Seite
let autoLoginEnabled = false;
let credentials = null;
let hasAttemptedLogin = false;

// Lade gespeicherte Einstellungen
// Passwort wird bereits entschlüsselt vom Background Script geliefert
chrome.runtime.sendMessage({ action: 'getCredentials' }, (response) => {
  if (response) {
    autoLoginEnabled = response.autoLoginEnabled || false;
    credentials = response.credentials || null;
    
    if (autoLoginEnabled && credentials) {
      attemptAutoLogin();
    }
  }
});

function attemptAutoLogin() {
  // Warte bis die Seite vollständig geladen ist
  if (document.readyState !== 'complete') {
    window.addEventListener('load', attemptAutoLogin);
    return;
  }

  // Erkenne verschiedene Login-Szenarien auf Elster
  detectAndHandleLoginPage();
}

function detectAndHandleLoginPage() {
  // Verhindere mehrfache Ausführung
  if (hasAttemptedLogin) return;
  
  // Spezifisch für Elster: Zertifikat-Upload-Feld suchen
  const certificateInput = document.querySelector('input[type="file"], input[name*="zertifikat"], input[id*="certificate"]');
  
  // Passwort-Feld suchen - Elster nutzt oft spezifische IDs
  const passwordFields = document.querySelectorAll('input[type="password"], input[name*="password"], input[name*="passwort"], input[id*="password"]');
  
  // Login-Button suchen - verschiedene Varianten für Elster
  const loginButtons = document.querySelectorAll('#bestaetigenButton, button[type="submit"], input[type="submit"], input[value*="Anmelden"], button[type="button"]');
  
  // Automatisches Zertifikat-Handling
  if (certificateInput && credentials.certificateData) {
    // Konvertiere Base64 zurück zu Blob
    const base64Data = credentials.certificateData.split(',')[1];
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/x-pkcs12' });
    
    // Erstelle File-Objekt
    const file = new File([blob], credentials.certificateFileName || 'certificate.pfx', {
      type: 'application/x-pkcs12',
      lastModified: Date.now()
    });
    
    // Versuche das Zertifikat zu setzen
    try {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      certificateInput.files = dataTransfer.files;
      
      // Trigger change event
      certificateInput.dispatchEvent(new Event('change', { bubbles: true }));
      
      console.log('Zertifikat automatisch gesetzt');
      highlightElement(certificateInput, '✓ Zertifikat automatisch geladen', '#4CAF50');
      hasAttemptedLogin = true;
    } catch (e) {
      // Fallback: Wenn automatisches Setzen nicht funktioniert, highlighte das Feld
      highlightElement(certificateInput, 'Bitte wählen Sie Ihre .pfx Zertifikatsdatei aus', '#FF9800');
      console.log('Automatisches Zertifikat-Upload nicht möglich, Feld markiert');
      hasAttemptedLogin = true;
    }
  }
  
  if (passwordFields.length > 0 && credentials.password) {
    // Passwort automatisch einfügen
    passwordFields.forEach(field => {
      if (field.offsetParent !== null) { // Prüfe ob das Feld sichtbar ist
        field.value = credentials.password;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    
    // Versuche automatisch zu submitten nur wenn beide Felder ausgefüllt sind
    if (loginButtons.length > 0) {
      // Prüfe ob Zertifikat bereits geladen wurde oder warte auf Upload
      if (certificateInput && certificateInput.files.length > 0) {
        submitForm();
      } else if (certificateInput) {
        // Warte auf manuellen Upload
        certificateInput.addEventListener('change', () => {
          if (certificateInput.files.length > 0) {
            submitForm();
          }
        });
      }
    }
  }
  
  function submitForm() {
    setTimeout(() => {
      // Zuerst nach dem spezifischen Elster-Button suchen
      const bestaetigenButton = document.getElementById('bestaetigenButton');
      if (bestaetigenButton && bestaetigenButton.offsetParent !== null) {
        console.log('Auto-Submit: Klicke auf #bestaetigenButton');
        bestaetigenButton.click();
        
        // Nach dem Klick auf Fehler prüfen
        setTimeout(() => {
          checkForErrors();
        }, 1000);
        return;
      }
      
      // Fallback: Nach anderen Login-Buttons suchen
      const visibleButton = Array.from(loginButtons).find(btn => 
        btn.offsetParent !== null && 
        (btn.textContent.includes('Anmelden') || btn.value?.includes('Anmelden') || 
         btn.textContent.includes('Bestätigen') || btn.value?.includes('Bestätigen'))
      );
      if (visibleButton) {
        console.log('Auto-Submit: Klicke auf alternativen Button');
        visibleButton.click();
        
        // Nach dem Klick auf Fehler prüfen
        setTimeout(() => {
          checkForErrors();
        }, 1000);
      }
    }, 500);
  }
}

function highlightElement(element, message, color = '#4CAF50') {
  element.style.border = `3px solid ${color}`;
  element.style.backgroundColor = color === '#4CAF50' ? '#E8F5E9' : '#FFF3E0';
  
  const tooltip = document.createElement('div');
  tooltip.textContent = message;
  tooltip.style.cssText = `
    position: absolute;
    background: #333;
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 10000;
  `;
  
  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.bottom + 5) + 'px';
  
  document.body.appendChild(tooltip);
  
  setTimeout(() => {
    tooltip.remove();
  }, 5000);
}

// Funktion zum Überprüfen von Fehlermeldungen auf der Seite
function checkForErrors() {
  // Suche nach typischen Elster-Fehlermeldungen
  const errorSelectors = [
    '.error-message',
    '.fehler',
    '.alert-danger',
    '[role="alert"]',
    '.validation-error',
    '#fehlerMeldung'
  ];
  
  const errorTexts = [
    'zertifikat',
    'ungültig',
    'abgelaufen',
    'fehlerhaft',
    'nicht lesbar',
    'passwort falsch',
    'authentifizierung fehlgeschlagen'
  ];
  
  for (const selector of errorSelectors) {
    const errorElements = document.querySelectorAll(selector);
    for (const element of errorElements) {
      const text = element.textContent.toLowerCase();
      for (const errorText of errorTexts) {
        if (text.includes(errorText)) {
          handleCertificateError(element.textContent);
          return true;
        }
      }
    }
  }
  
  // Prüfe auch ob nach Submit ein Fehler aufgetreten ist
  setTimeout(() => {
    const stillOnLoginPage = document.querySelector('#bestaetigenButton') || 
                           document.querySelector('input[type="file"]');
    if (stillOnLoginPage && hasAttemptedLogin) {
      // Wir sind immer noch auf der Login-Seite nach Versuch
      handleCertificateError('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.');
    }
  }, 3000);
  
  return false;
}

// Funktion zur Behandlung von Zertifikatsfehlern
function handleCertificateError(errorMessage) {
  console.error('Zertifikatsfehler erkannt:', errorMessage);
  
  // Sende Nachricht an Background Script
  chrome.runtime.sendMessage({
    action: 'certificateError',
    error: errorMessage
  });
  
  // Zeige eine prominente Warnung auf der Seite
  const warningDiv = document.createElement('div');
  warningDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f44336;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 10001;
    max-width: 400px;
    font-family: Arial, sans-serif;
  `;
  
  warningDiv.innerHTML = `
    <h3 style="margin: 0 0 10px 0;">⚠️ Zertifikatsfehler</h3>
    <p style="margin: 0 0 15px 0;">${errorMessage}</p>
    <p style="margin: 0 0 15px 0;"><strong>Bitte aktualisieren Sie Ihr Zertifikat:</strong></p>
    <ol style="margin: 0 0 15px 0; padding-left: 20px;">
      <li>Laden Sie ein neues Zertifikat von Elster herunter</li>
      <li>Klicken Sie auf das Extension-Icon</li>
      <li>Wählen Sie die neue .pfx Datei aus</li>
      <li>Speichern Sie die Einstellungen</li>
    </ol>
    <button id="closeWarning" style="
      background: white;
      color: #f44336;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    ">Verstanden</button>
  `;
  
  document.body.appendChild(warningDiv);
  
  document.getElementById('closeWarning').addEventListener('click', () => {
    warningDiv.remove();
  });
  
  // Automatisch nach 30 Sekunden entfernen
  setTimeout(() => {
    if (warningDiv.parentNode) {
      warningDiv.remove();
    }
  }, 30000);
}

// Listener für Nachrichten vom Background Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'tryAutoLogin') {
    attemptAutoLogin();
    sendResponse({ success: true });
  }
});

// Überwache DOM-Änderungen für dynamisch geladene Login-Formulare
const observer = new MutationObserver((mutations) => {
  if (autoLoginEnabled && credentials && !hasAttemptedLogin) {
    detectAndHandleLoginPage();
  }
});

// Starte Observer nur wenn body existiert
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}