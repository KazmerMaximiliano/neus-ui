import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'neus-ui/dist/neus-ui.css'
import './styles/neus.overrides.css'
import { NeusRoot } from './neus/NeusRoot.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NeusRoot>
      <App />
    </NeusRoot>
  </StrictMode>,
)
