import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Homepage from './components/Homepage/Homepage';
import Errorpage from './components/Errorpage/Errorpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <Errorpage />,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
