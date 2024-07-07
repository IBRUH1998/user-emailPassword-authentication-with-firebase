import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './assets/Components/Root/Root'
import Home from './assets/Components/Root/Home/Home'
import Login from './assets/Components/Login/Login'
import Registration from './assets/Components/Registration/Registration'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration></Registration>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
