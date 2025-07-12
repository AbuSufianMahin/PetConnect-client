import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import { RouterProvider } from 'react-router'
import AuthProvider from './contexts/AuthContext/AuthProvider';
import { router } from './Router/Router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-inter'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
)
