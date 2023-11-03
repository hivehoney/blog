import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../pages/errorPage";
import Tech from "../pages/Tech";
import PostEditor from "../pages/PostEditor";
import React from "react";
import Post from "../pages/Post";
import Temp from "../pages/Temp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "blog",
                children: [
                    { path: "tech", element: <Tech /> },
                    { path: "tech/detail/:postCode", element: <Post /> },
                    { path: "tech/editor", element: <PostEditor /> },
                ],
            },
            { path: "intro", element: <Temp />, },
            { path: "contact", element: <Temp />, },
            { path: "memoirs", element: <Temp />, },
        ],
    },
]);

export default router;