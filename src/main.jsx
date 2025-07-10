import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './components/Routes/Router'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-inter'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
