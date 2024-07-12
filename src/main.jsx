import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AgoraRTCProvider client={client}>
          <App />
      </AgoraRTCProvider>
  </BrowserRouter>,
)
