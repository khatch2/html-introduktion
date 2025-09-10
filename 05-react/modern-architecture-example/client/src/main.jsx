import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx'
import Hello from './components/Hello.jsx';
import About from './components/About.jsx';
import RootLayout from './layout/RootLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path='/om-oss' element={<About />} />
          <Route path='/hello' element={<Hello />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
