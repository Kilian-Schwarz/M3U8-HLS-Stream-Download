document.getElementById('startSkipping').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'startSkipping' }, (response) => {
      if (response) {
        document.getElementById('status').textContent = response.status;
      } else {
        document.getElementById('status').textContent = 'Fehler beim Starten des Skippings.';
      }
    });
  });
  
  document.getElementById('stopRecording').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'stopRecording' }, (response) => {
      if (response) {
        document.getElementById('status').textContent = response.status;
      } else {
        document.getElementById('status').textContent = 'Fehler beim Stoppen der Aufnahme.';
      }
    });
  });
  
  // Listener für Statusaktualisierungen
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.statusUpdate) {
      document.getElementById('status').textContent = request.statusUpdate;
  
      // Aktualisiere den Fortschrittsbalken
      let progressBar = document.getElementById('progressBar').firstElementChild;
      let statusText = request.statusUpdate;
  
      // Fortschritt während der Aufnahme basierend auf der Gesamtdauer aktualisieren
      let match = statusText.match(/Gesamtdauer: (\d{2}):(\d{2}):(\d{2})/);
      if (match) {
        // Da wir die Gesamtvideodauer nicht kennen, können wir hier keinen genauen Fortschritt anzeigen
        // Optional könnten Sie hier einen Ladeindikator implementieren
        progressBar.style.width = '100%';
      }
  
      // Fortschritt während des Downloads aktualisieren
      match = statusText.match(/Heruntergeladen: (\d+)\/(\d+)/);
      if (match) {
        let downloaded = parseInt(match[1], 10);
        let total = parseInt(match[2], 10);
        let percent = (downloaded / total) * 100;
        progressBar.style.width = percent + '%';
      }
    }
  });