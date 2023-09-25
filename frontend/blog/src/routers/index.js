import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../pages/errorPage";
import Tech from "../pages/Tech";
import PostEditor from "../pages/PostEditor";
import React from "react";
import Post from "../pages/Post";

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
                    { path: "tech/:code", element: <Post /> },
                    { path: "tech/editor", element: <PostEditor /> },
                ],
            },
            { path: "intro", element: <PostEditor />, },
        ],
    },
]);

export default router;