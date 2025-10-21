import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContextProvider.tsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Toaster position='top-center' reverseOrder={false} />
    <App />
  </AuthProvider>,
)
