import React from 'react'
import Navbar from './components/navbar'
import Login from './components/login'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Land from './components/land'
import Notes from './components/notes';
import Register from './components/register';




function ErrorPage() {
  return (
    <div className="h-[30vh] flex flex-col justify-evenly items-center">
      <h1 className="text-3xl text-center">404 - Page Not Found</h1>
      <p className="text-lg md:text-2xl text-center">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Land />
        <Notes />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
  },

]);


const App = () => {
  return (
    <RouterProvider router={router}>
      {router.currentRoute ? router.currentRoute.element : <ErrorPage />}
    </RouterProvider>
  )
}

export default App
