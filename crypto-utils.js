// Sichere Verschlüsselung mit Web Crypto API

const CRYPTO_CONFIG = {
  name: 'AES-GCM',
  length: 256
};

class SecureStorage {
  constructor() {
    this.keyName = 'elster_encryption_key';
  }

  // Generiere oder lade den Verschlüsselungsschlüssel
  async getOrCreateKey() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.keyName], async (result) => {
        if (result[this.keyName]) {
          // Schlüssel existiert bereits
          const key = await crypto.subtle.importKey(
            'jwk',
            result[this.keyName],
            CRYPTO_CONFIG,
            true,
            ['encrypt', 'decrypt']
          );
          resolve(key);
        } else {
          // Neuen Schlüssel generieren
          const key = await crypto.subtle.generateKey(
            CRYPTO_CONFIG,
            true,
            ['encrypt', 'decrypt']
          );
          
          // Schlüssel als JWK exportieren und speichern
          const exportedKey = await crypto.subtle.exportKey('jwk', key);
          chrome.storage.local.set({ [this.keyName]: exportedKey }, () => {
            resolve(key);
          });
        }
      });
    });
  }

  // Verschlüssele Daten
  async encrypt(data) {
    const key = await this.getOrCreateKey();
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));
    
    // Generiere einen zufälligen Initialisierungsvektor (IV)
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Verschlüssele die Daten
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: CRYPTO_CONFIG.name,
        iv: iv
      },
      key,
      encodedData
    );
    
    // Kombiniere IV und verschlüsselte Daten
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);
    
    // Konvertiere zu Base64 für die Speicherung
    return btoa(String.fromCharCode.apply(null, combined));
  }

  // Entschlüssele Daten
  async decrypt(encryptedDataBase64) {
    const key = await this.getOrCreateKey();
    
    // Dekodiere von Base64
    const combined = Uint8Array.from(atob(encryptedDataBase64), c => c.charCodeAt(0));
    
    // Extrahiere IV und verschlüsselte Daten
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);
    
    // Entschlüssele die Daten
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: CRYPTO_CONFIG.name,
        iv: iv
      },
      key,
      encryptedData
    );
    
    // Dekodiere und parse JSON
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedData);
    return JSON.parse(jsonString);
  }

  // Sichere Löschung aller gespeicherten Daten
  async clearAll() {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  }
}

// Exportiere die Instanz für die Verwendung in anderen Dateien
const secureStorage = new SecureStorage();