import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx'
import Hello from './components/Hello.jsx';
import About from './components/About.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='/om-oss' element={<About />} />
        <Route path='/hello' element={<Hello />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
