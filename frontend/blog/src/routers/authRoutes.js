import React from "react";
import loadable from '@loadable/component'
import PostEditor from "../pages/PostEditor";

const PublicRoute = loadable(() => import('./PublicRoute'))
const Layout = loadable(() => import('../components/Layout/Layout'))
const ErrorPage = loadable(() => import('../pages/errorPage'))
const SignInSide = loadable(() => import('../pages/Login'))
const SignUp = loadable(() => import('../pages/register'))
const Tech = loadable(() => import('../pages/Tech'))
const Post = loadable(() => import('../pages/Post'))
const Temp = loadable(() => import('../pages/Temp'))

export default {
    path: '/',
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
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
        { path: "intro", element: <Layout />, children: [{path:"", element: <Temp />}]},
        { path: "contact", element: <Layout />, children: [{path:"", element: <Temp />}]},
        { path: "memoirs", element: <Layout />, children: [{path:"", element: <Temp />}]},
    ],
}
