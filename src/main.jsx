import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts (self-hosted via Fontsource)
import '@fontsource/aileron/300.css'
import '@fontsource/aileron/300-italic.css'
import '@fontsource/aileron/400.css'
import '@fontsource/aileron/600.css'
import '@fontsource/aileron/700.css'
import '@fontsource/cormorant-garamond/300.css' // H1, H2, H5 (Light)
import '@fontsource/cormorant-garamond/400.css' // H3 (Regular)

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)