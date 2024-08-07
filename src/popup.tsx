import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {

  const [key,setKey] = useState<string>("");

  // const setCredentials = () => {
  //   chrome.storage.sync.set(
  //     {
  //       apiKey: key,
  //     },
  //   );
  // }

  // useEffect(()=>{
  //   chrome.storage.sync.get(
  //     {
  //       apiKey: "",
  //     },
  //     (items) => {
  //       setKey(items.apiKey);
  //     }
  //   );
  // },[])

  

  return (
    <>
      <ul style={{ minWidth: "200px" }}>
        <li>Make Something Amazing</li>
        
        <input type="text" onChange={(e) => setKey(e.target.value)}  placeholder="gpt key"/>



      </ul>
    
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
