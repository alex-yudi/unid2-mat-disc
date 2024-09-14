import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { MathJaxContext } from 'better-react-mathjax'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MathJaxContext>
      <App />
    </MathJaxContext>
  </React.StrictMode>,
)
