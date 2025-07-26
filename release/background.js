// Background Service Worker
importScripts('crypto-utils.js');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Elster Auto-Login Extension installiert');
});

// Listener für Tab-Updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('elster.de')) {
    chrome.storage.local.get(['autoLoginEnabled'], (result) => {
      if (result.autoLoginEnabled) {
        chrome.tabs.sendMessage(tabId, { action: 'tryAutoLogin' });
      }
    });
  }
});

// Nachrichtenhandler für Popup-Kommunikation
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveCredentials') {
    // Verwende sichere Verschlüsselung für sensible Daten
    (async () => {
      try {
        // Verschlüssele nur das Passwort, Zertifikatsdaten bleiben wie sie sind
        const secureCredentials = {
          certificateData: request.credentials.certificateData,
          certificateFileName: request.credentials.certificateFileName,
          encryptedPassword: await secureStorage.encrypt({ password: request.credentials.password })
        };
        
        chrome.storage.local.set({
          credentials: secureCredentials,
          autoLoginEnabled: request.autoLoginEnabled
        }, () => {
          sendResponse({ success: true });
        });
      } catch (error) {
        console.error('Verschlüsselungsfehler:', error);
        sendResponse({ success: false, error: 'Verschlüsselung fehlgeschlagen' });
      }
    })();
    
    return true; // Async response
  }
  
  if (request.action === 'getCredentials') {
    chrome.storage.local.get(['credentials', 'autoLoginEnabled'], async (result) => {
      if (result.credentials) {
        try {
          // Entschlüssele das Passwort
          let password = '';
          if (result.credentials.encryptedPassword) {
            const decrypted = await secureStorage.decrypt(result.credentials.encryptedPassword);
            password = decrypted.password;
          } else if (result.credentials.password) {
            // Fallback für alte Base64-kodierte Passwörter (Migration)
            password = atob(result.credentials.password);
          }
          
          const decryptedCredentials = {
            certificateData: result.credentials.certificateData,
            certificateFileName: result.credentials.certificateFileName,
            password: password
          };
          
          sendResponse({
            credentials: decryptedCredentials,
            autoLoginEnabled: result.autoLoginEnabled || false
          });
        } catch (error) {
          console.error('Entschlüsselungsfehler:', error);
          sendResponse({
            credentials: null,
            autoLoginEnabled: false,
            error: 'Entschlüsselung fehlgeschlagen'
          });
        }
      } else {
        sendResponse({
          credentials: null,
          autoLoginEnabled: false
        });
      }
    });
    
    return true; // Async response
  }
  
  if (request.action === 'certificateError') {
    // Zeige Browser-Notification bei Zertifikatsfehler
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Elster Zertifikatsfehler',
      message: request.error || 'Ihr Zertifikat ist ungültig oder abgelaufen. Bitte erneuern Sie es.',
      priority: 2,
      buttons: [
        { title: 'Extension öffnen' }
      ]
    });
    
    // Badge auf Extension-Icon setzen
    chrome.action.setBadgeText({ text: '!' });
    chrome.action.setBadgeBackgroundColor({ color: '#F44336' });
    
    // Speichere Fehlerstatus
    chrome.storage.local.set({ 
      certificateError: true,
      lastError: request.error 
    });
  }
});