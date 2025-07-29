import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import { RouterProvider } from 'react-router'
import AuthProvider from './contexts/AuthContext/AuthProvider';
import { router } from './Router/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './Utilities/ScrollToTop';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-inter'>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}>
            <ScrollToTop />
          </RouterProvider>

        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
)
