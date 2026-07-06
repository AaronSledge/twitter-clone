import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Account from './Account.jsx'
import Home from "./Home.jsx"

createRoot(document.getElementById('root')).render(
  //call upon app jsx
  <StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/account/:handle" element={<Account />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
