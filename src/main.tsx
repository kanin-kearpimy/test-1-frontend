import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DefaulLayout from './layout/default'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DefaulLayout>
      <App />
    </DefaulLayout>
  </React.StrictMode>,
)
