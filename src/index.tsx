import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { About, Shop } from "@/pages";
import App from "@/components/App";

const root = document.getElementById("root");
const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "about",
                element: <Suspense fallback={"Loading..."}><About /></Suspense>
            },
            {
                path: "shop",
                element: <Suspense fallback={"Loading..."}><Shop /></Suspense>
            }
        ]
    }
])

container.render(<RouterProvider router={router} />);