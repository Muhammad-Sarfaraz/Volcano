import axios from "axios";

// Create a context menu item
chrome.contextMenus.create({
  id: "ask-me",
  title: "Ask ChatGPT",
  contexts: ["all"],
});

// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  if (info.menuItemId === "ask-me" && tab && tab.id !== undefined) {
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, { type: "ASK_CHATGPT" });
  }

  


});
