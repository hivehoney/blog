import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./errorPage";
import Tech from "./pages/Tech";
import Layout from "./Layout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "blog/:tech",
                element: <Tech />,
                /*loader: async () => {
                    const response = await fetch("http://localhost:8080/blog");
                    if (!response.ok) {
                    } else {
                        const resData = await response.json();
                        return resData.events;
                    }
                },*/
            },
        ],
        errorElement: <ErrorPage />,
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
