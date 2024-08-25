import axios from "axios";
import { googleApi } from "./Api/googleApi";

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  
  if (msg.type === "ASK_CHATGPT") {
    alert("All Ok!");
  }
});

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.type === "ASK_CHATGPT") {
      let originalActiveElement: HTMLElement | null = null;
      let text: string = "";

      // Check if there is an active element and if it's an HTMLElement
      const activeElement = document.activeElement as HTMLElement | null;

      if (
        activeElement &&
        (activeElement.isContentEditable ||
          activeElement.nodeName.toUpperCase() === "TEXTAREA" ||
          activeElement.nodeName.toUpperCase() === "INPUT")
      ) {
        // Set as original for later
        originalActiveElement = activeElement;
        // Use selected text or all text in the input
        text =
          document.getSelection()?.toString().trim() ||
          activeElement.textContent?.trim() ||
          "";
      } else {
        // If no active text input use any selected text on page
        text = document.getSelection()?.toString().trim() || "";
      }

      console.log(text);
      console.log("activeElement",activeElement);

      const response = googleApi(text)
        .then((res) => {
          if (activeElement && activeElement.tagName.toLowerCase() === 'textarea') {
            const textareaElement = activeElement as HTMLTextAreaElement;
            textareaElement.value = res.data.candidates[0].content.parts[0].text;
          }
        });
    }
  }
);
