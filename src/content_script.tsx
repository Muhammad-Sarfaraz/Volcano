import axios from "axios";

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("All Oke");
  if (msg.type === "ASK_CHATGPT") {
    alert('All Ok!')
  }
});

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === "ASK_CHATGPT") {
    let originalActiveElement: HTMLElement | null = null;
    let text: string = '';

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
        activeElement.textContent?.trim() || '';
    } else {
      // If no active text input use any selected text on page
      text = document.getSelection()?.toString().trim() || '';
    }

    console.log(text);

    // if(activeElement){
    //   activeElement.innerHTML = "Hi";
    // }
    

    




    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
    const apiKey = 'AIzaSyAvCz8Dvku0xyQ3JwlAItEuKAOqHdDZLho';
  
  
    const response = axios.post(`${url}?key=${apiKey}`, {
      contents: [
        {
          role: 'user',
          parts: [{ text: text }]
        }
      ]
    }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
      console.log(res.data);
    });



    
  }
});
