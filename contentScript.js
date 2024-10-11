let skipInterval = null;

function startSkipping() {
  const video = document.querySelector('video');
  if (video) {
    let duration = video.duration;

    // Wenn die Videodauer noch nicht verfügbar ist, warten
    if (isNaN(duration) || duration === Infinity) {
      video.addEventListener('loadedmetadata', () => {
        duration = video.duration;
        performSkipping(video, duration);
      });
    } else {
      performSkipping(video, duration);
    }
  } else {
    console.error('Kein Videoelement gefunden.');
  }
}

function performSkipping(video, duration) {
  let currentTime = 0;

  skipInterval = setInterval(() => {
    currentTime += 2; // Springe alle 2 Sekunden vorwärts
    if (currentTime <= duration) {
      video.currentTime = currentTime;
    } else {
      clearInterval(skipInterval);
      skipInterval = null;
    }
  }, 500); // Alle 500 ms springen
}

function stopSkipping() {
  if (skipInterval) {
    clearInterval(skipInterval);
    skipInterval = null;
  }
}

startSkipping();

// Listener für Nachrichten vom Hintergrundskript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'stopSkipping') {
    stopSkipping();
  }
});