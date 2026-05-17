// Background service worker — handles opening/focusing AI chat windows

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openClaudeChat' || message.action === 'openChatGPT' || message.action === 'openGemini') {
    
    // 1. OPEN SIDE PANEL IMMEDIATELY using the user gesture!
    if (sender.tab && sender.tab.windowId) {
      chrome.sidePanel.open({ windowId: sender.tab.windowId }).catch(console.error);
    }

    // 2. Determine platform details
    const platform = message.action === 'openClaudeChat' ? 'claude' : 
                     message.action === 'openChatGPT' ? 'chatgpt' : 'gemini';
                     
    const defaultUrl = platform === 'claude' ? 'https://claude.ai/new' : 
                       platform === 'chatgpt' ? 'https://chatgpt.com/?model=auto' : 'https://gemini.google.com/app';
                       
    // 3. Set the new chat URL for the side panel to pick up
    chrome.storage.local.set({ activeSidePanelUrl: defaultUrl }, () => {
       sendResponse({ success: true, sidePanel: true });
    });

    return true; 
  }
});
