import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import router from "./routers";
import {CookiesProvider} from "react-cookie";
import {RecoilRoot} from "recoil";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            refetchOnWindowFocus: true,
            retry: 0,
        },
        mutations: {
            useErrorBoundary: true,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <CookiesProvider>
                    <RouterProvider router={router} />
                </CookiesProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);

reportWebVitals();