import React from "react";
import loadable from '@loadable/component'
import PostEditor from "../pages/Blog/PostEditor";
import SignUp from "../pages/Login/register";
import PublicRoute from "./PublicRoute";
import ErrorFallback from "../common/ErrorFallback";

// const PublicRoute = loadable(() => import('./PublicRoute'))
const Layout = loadable(() => import('../components/Layout/Layout'))
const ErrorPage = loadable(() => import('../pages/errorPage'))
const SignInSide = loadable(() => import('../pages/Login/Login'))
const Tech = loadable(() => import('../pages/Blog/Tech'))
const Post = loadable(() => import('../pages/Blog/Post'))
const Temp = loadable(() => import('../pages/Temp'))

export default {
    path: '/',
    element: <PublicRoute />,
    errorElement: <ErrorFallback />,
    children: [
        {
            path:"", element: <Layout />
        },
        {
            children: [
                {path: '/login', element: <SignInSide />},
                {path: '/register', element: <SignUp />},
            ]
        },
        {
            path: "blog",
            element: <Layout />,
            children: [
                { path: "tech", element: <Tech /> },
                { path: "tech/detail/:postCode", element: <Post /> },
                { path: "tech/editor", element: <PostEditor /> },
            ],
        },
        { path: "intro", element: <Layout />, children: [{path:"about", element: <Temp />}]},
        { path: "contact", element: <Layout />, children: [{path:"", element: <Temp />}]},
        { path: "memoirs", element: <Layout />, children: [{path:"", element: <Temp />}]},
    ],
}
