import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'; // App will become a layout/outlet component
import './index.css';
import { ScrollProvider } from './contexts/ScrollContext';

// Import page/route components
import { NotFound } from "./components/NotFound";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";
import { Interview } from "./components/Interview";
import { ZeroTruth } from "./components/ZeroTruth";
import { FullProfile } from "./pages/FullProfile";
import { CryptoFabric } from "./pages/CryptoFabric";

// Lazy load NEW main page component
const LazyNewMainPage = lazy(() => 
  import("./pages/NewMainPage").then(module => ({
    default: module.NewMainPage
  }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component will now act as a layout, rendering an Outlet
    children: [
      {
        index: true, // This makes it the default child route for "/"
        element: (
          <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Initializing Interface...</div>}>
            <ScrollProvider>
              <LazyNewMainPage />
            </ScrollProvider>
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:postId",
        element: <BlogPost />,
      },
      {
        path: "interview",
        element: <Interview />,
      },
      {
        path: "zero",
        element: <ZeroTruth />,
      },
      {
        path: "full-profile",
        element: <FullProfile />,
      },
      {
        path: "crypto-fabric",
        element: <CryptoFabric />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
