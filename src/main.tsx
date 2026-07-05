import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { useUserStore } from './stores/useUserStore'
import './theme/global.css'

// 启动时检查认证状态
function InitApp() {
  const checkAuth = useUserStore((s) => s.checkAuth)
  
  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <InitApp />
    </BrowserRouter>
  </React.StrictMode>,
)
