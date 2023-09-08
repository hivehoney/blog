import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Tech from "./pages/Tech";
import Layout from "./components/Layout/Layout";
import PostEditor from "./pages/PostEditor";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./redux";
import {logger} from "redux-logger/src";
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import Editor from "./components/Blog/Editor";
import {Outlet} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();

const enhancer =
    process.env.NODE_ENV === "production"
        ? compose(applyMiddleware(sagaMiddleware))
        : composeWithDevTools(applyMiddleware(sagaMiddleware, logger));

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    enhancer
});

// sagaMiddleware.run(rootSaga);

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
                    { path: "tech/editor", element: <PostEditor /> },
                ],
            },
            { path: "intro", element: <PostEditor />, },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

reportWebVitals();
