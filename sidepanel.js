const iframe = document.getElementById('chat-frame');
const loading = document.getElementById('loading');

// Load the active URL initially
chrome.storage.local.get(['activeSidePanelUrl'], (result) => {
  if (result.activeSidePanelUrl) {
    iframe.src = result.activeSidePanelUrl;
  }
});

// Hide loading spinner when iframe loads
iframe.addEventListener('load', () => {
  if (iframe.src && iframe.src !== 'about:blank') {
    loading.style.display = 'none';
  }
});

// Listen for updates from the background script to change the AI platform
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.activeSidePanelUrl) {
    if (changes.activeSidePanelUrl.newValue !== iframe.src) {
      loading.style.display = 'block';
      iframe.src = changes.activeSidePanelUrl.newValue;
    }
  }
});
