import { NotFound } from "./components/NotFound";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";
import { Interview } from "./components/Interview";
import { FullProfile } from "./pages/FullProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SpeechProvider } from "./contexts/SpeechContext";
import { CookieNotice } from "./components/CookieNotice";
import { lazy, Suspense } from "react";

// Lazy load NEW main page component
const LazyNewMainPage = lazy(() => 
  import("./pages/NewMainPage").then(module => ({
    default: module.NewMainPage
  }))
);

function App() {
  return (
    <Router>
      <SpeechProvider>
        <CookieNotice />
        <Routes>
          {/* Main routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Quantum Reality...</div>}>
                <LazyNewMainPage />
              </Suspense>
            }
          />
          
          {/* Other routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/full-profile" element={<FullProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SpeechProvider>
    </Router>
  );
}

export default App;
