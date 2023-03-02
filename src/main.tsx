import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import './util.css'
import './patches.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import QueryClientProvider from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider>
          <App />
      </QueryClientProvider>
  </React.StrictMode>
)
