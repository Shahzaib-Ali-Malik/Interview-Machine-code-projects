import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '../config/Layouts/MainLayout'
import HomePage from '../features/Home/ui/pages/HomePage'
import QuestionBankPage from '../features/Question-Bank/ui/pages/QuestionBankPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "question-bank",
                element: <QuestionBankPage/>
            }
        ]
    }
])

const MainRoutes = () => {
  return <RouterProvider router={router}/>
}

export default MainRoutes