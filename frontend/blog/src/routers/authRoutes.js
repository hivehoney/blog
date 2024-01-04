import React from "react";
import loadable from '@loadable/component'
import PostEditor from "../pages/Blog/PostEditor";
import SignUp from "../pages/Login/register";
import PublicRoute from "./PublicRoute";
import ErrorFallback from "../common/ErrorFallback";
import About from "../pages/Intro/About";
import Resume from "../pages/Intro/Resume";
import Projects from "../pages/Intro/Projects";
import {Navigate} from "react-router";

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
            path: "*", element: <Navigate to="/intro/about" />
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
        {
            path: "intro",
            element: <Layout />,
            children: [
                {path:"about", element: <About />},
                {path:"resume", element: <Resume />},
                {path:"projects", element: <Projects />},
            ]
        },
    ],
}
