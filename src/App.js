import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Leftbar from './components/Leftbar';
import Home from './components/Home';
import Generate from './components/Generate';
import DataProvider from './contexts/dataContext';

function App() {

  const Layout = () => {
    return (
      <div >

        <div className='main_section flex'>
          <Leftbar />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>

      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        // <protectedRoute>
        <Layout />
        // </protectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/generate',
          element: <Generate />
        }
      ]
    },

  ])

  return (
    <>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider >
    </>
  );
}

export default App;
