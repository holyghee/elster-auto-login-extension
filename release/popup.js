document.addEventListener('DOMContentLoaded', () => {
  const autoLoginCheckbox = document.getElementById('autoLogin');
  const certificateFileInput = document.getElementById('certificateFile');
  const certificateStatusDiv = document.getElementById('certificateStatus');
  const passwordInput = document.getElementById('password');
  const saveBtn = document.getElementById('saveBtn');
  const clearBtn = document.getElementById('clearBtn');
  const statusDiv = document.getElementById('status');
  const loginBtn = document.getElementById('loginBtn');
  
  let certificateData = null;
  let certificateFileName = null;
  
  // Lade gespeicherte Einstellungen
  chrome.runtime.sendMessage({ action: 'getCredentials' }, (response) => {
    if (response.credentials) {
      autoLoginCheckbox.checked = response.autoLoginEnabled;
      passwordInput.value = response.credentials.password || '';
      
      if (response.credentials.certificateFileName) {
        certificateFileName = response.credentials.certificateFileName;
        certificateStatusDiv.textContent = `✓ ${certificateFileName} geladen`;
        certificateStatusDiv.className = 'certificate-status loaded';
      }
    }
  });
  
  // Zertifikat-Upload Handler
  certificateFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.pfx') || file.name.endsWith('.p12')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          certificateData = e.target.result;
          certificateFileName = file.name;
          certificateStatusDiv.textContent = `✓ ${file.name} ausgewählt`;
          certificateStatusDiv.className = 'certificate-status loaded';
        };
        reader.readAsDataURL(file);
      } else {
        showStatus('Bitte wählen Sie eine .pfx oder .p12 Datei!', 'error');
        certificateFileInput.value = '';
      }
    }
  });
  
  // Speichern-Button Handler
  saveBtn.addEventListener('click', () => {
    if (!passwordInput.value) {
      showStatus('Bitte geben Sie Ihr Passwort ein!', 'error');
      return;
    }
    
    const credentials = {
      certificateData: certificateData,
      certificateFileName: certificateFileName,
      password: passwordInput.value
    };
    
    chrome.runtime.sendMessage({
      action: 'saveCredentials',
      credentials: credentials,
      autoLoginEnabled: autoLoginCheckbox.checked
    }, (response) => {
      if (response.success) {
        showStatus('Einstellungen gespeichert!', 'success');
      } else {
        showStatus('Fehler beim Speichern!', 'error');
      }
    });
  });
  
  // Login-Button Handler
  loginBtn.addEventListener('click', () => {
    // Öffne Elster Login-Seite in neuem Tab
    chrome.tabs.create({ 
      url: 'https://www.elster.de/eportal/login/softpse',
      active: true 
    });
    // Schließe das Popup
    window.close();
  });
  
  // Löschen-Button Handler
  clearBtn.addEventListener('click', () => {
    if (confirm('Möchten Sie wirklich alle gespeicherten Daten löschen?')) {
      chrome.storage.local.clear(() => {
        autoLoginCheckbox.checked = false;
        certificateFileInput.value = '';
        passwordInput.value = '';
        certificateData = null;
        certificateFileName = null;
        certificateStatusDiv.className = 'certificate-status';
        showStatus('Alle Daten gelöscht!', 'success');
      });
    }
  });
  
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    
    setTimeout(() => {
      statusDiv.className = 'status-message';
    }, 3000);
  }
});