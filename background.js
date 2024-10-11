let isRecording = false;
let tsFiles = [];
let tsFileBlobs = [];
let downloadIndex = 0;
let totalDuration = 0; // Gesamtdauer in Sekunden
let segmentDuration = 2; // Annahme: Jeder TS-Segment ist 2 Sekunden lang
let currentTabId = null;

// Aufnahme automatisch starten, wenn eine Seite geladen oder neu geladen wird
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    // Starten Sie die Aufnahme auf der neu geladenen Seite
    startRecording(tabId);
  }
});

// Funktion zum Starten der Aufnahme
function startRecording(tabId) {
  // Zurücksetzen der Aufnahmedaten
  isRecording = true;
  tsFiles = [];
  tsFileBlobs = [];
  downloadIndex = 0;
  totalDuration = 0;
  currentTabId = tabId;

  chrome.webRequest.onCompleted.removeListener(captureTSFile); // Sicherstellen, dass kein Listener doppelt registriert ist

  chrome.webRequest.onCompleted.addListener(
    captureTSFile,
    { urls: ["<all_urls>"], types: ["xmlhttprequest"], tabId: currentTabId }
  );

  console.log('Automatische Aufnahme gestartet auf Tab:', tabId);

  // Aktualisiere den Status im Popup
  chrome.runtime.sendMessage({
    statusUpdate: 'Aufnahme läuft... Gesamtdauer: 00:00:00'
  });
}

// Listener für Nachrichten vom Popup oder Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSkipping') {
    if (currentTabId !== null) {
      // Content Script injizieren, um das Video zu steuern
      chrome.tabs.executeScript(currentTabId, { file: "contentScript.js" }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log('Content Script zum Skippen gestartet.');
        }
      });
      sendResponse({ status: 'Skippen gestartet' });
    } else {
      sendResponse({ status: 'Kein aktiver Tab zum Skippen' });
    }
  }

  else if (request.action === 'stopRecording') {
    if (isRecording) {
      isRecording = false;
      chrome.webRequest.onCompleted.removeListener(captureTSFile);

      // Stoppt das Content Script
      if (currentTabId !== null) {
        chrome.tabs.sendMessage(currentTabId, { action: 'stopSkipping' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          }
        });
      }

      if (tsFiles.length > 0) {
        // Sortiere die TS-Dateien nach der Nummer im Dateinamen
        tsFiles.sort((a, b) => {
          let aIndex = extractIndex(a);
          let bIndex = extractIndex(b);
          return aIndex - bIndex;
        });
        downloadIndex = 0;
        downloadTSFiles();
        sendResponse({ status: 'Aufnahme gestoppt und Dateien werden zusammengeführt...' });
      } else {
        sendResponse({ status: 'Keine TS-Dateien gefunden' });
      }
    } else {
      sendResponse({ status: 'Keine aktive Aufnahme' });
    }
  }

  else if (request.action === 'getStatus') {
    sendResponse({
      isRecording: isRecording,
      totalDuration: totalDuration
    });
  }

  return true; // Für asynchrone Operationen
});

// Funktion zur Erfassung der .ts-Dateien
function captureTSFile(details) {
  if (details.url.includes('.ts')) {
    if (!tsFiles.includes(details.url)) {
      tsFiles.push(details.url);
      totalDuration = tsFiles.length * segmentDuration;
      console.log('Erfasste .ts-Datei:', details.url);

      // Dauer formatieren
      let durationFormatted = formatDuration(totalDuration);

      // Aktualisiere den Status im Popup
      chrome.runtime.sendMessage({
        statusUpdate: `Aufnahme läuft... Gesamtdauer: ${durationFormatted}`
      });
    }
  }
}

// Funktion zum Extrahieren der Indexnummer aus dem Dateinamen
function extractIndex(url) {
  let filename = url.substring(url.lastIndexOf('/') + 1);
  let match = filename.match(/video(\d+)\.ts/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  } else {
    return Number.MAX_SAFE_INTEGER; // Unnummerierte Dateien ans Ende setzen
  }
}

// Funktion zum Herunterladen der erfassten .ts-Dateien
function downloadTSFiles() {
  if (downloadIndex < tsFiles.length) {
    fetch(tsFiles[downloadIndex])
      .then(response => response.blob())
      .then(blob => {
        tsFileBlobs.push(blob);
        console.log(`Heruntergeladen: ${tsFiles[downloadIndex]}`);
        chrome.runtime.sendMessage({
          statusUpdate: `Heruntergeladen: ${downloadIndex + 1}/${tsFiles.length}`
        });
        downloadIndex++;
        downloadTSFiles(); // Nächste Datei herunterladen
      })
      .catch(error => console.error('Fehler beim Herunterladen der Datei:', error));
  } else {
    // Wenn alle .ts-Dateien heruntergeladen wurden
    mergeTSFiles();
  }
}

// Funktion zum Zusammenführen der .ts-Dateien ohne externe Tools
function mergeTSFiles() {
  // Zusammenführen der Blobs
  const mergedBlob = new Blob(tsFileBlobs, { type: 'video/mp2t' });

  // Herunterladen der endgültigen TS-Datei
  const tsUrl = URL.createObjectURL(mergedBlob);
  chrome.downloads.download({
    url: tsUrl,
    filename: 'merged_video.ts'
  }, (downloadId) => {
    console.log('Zusammengeführte TS-Datei wurde heruntergeladen. Download-ID:', downloadId);
    chrome.runtime.sendMessage({ statusUpdate: 'Download abgeschlossen!' });
  });
}

// Funktion zur Formatierung der Dauer von Sekunden zu HH:MM:SS
function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [hrs, mins, secs]
    .map(v => v < 10 ? '0' + v : v)
    .join(':');
}