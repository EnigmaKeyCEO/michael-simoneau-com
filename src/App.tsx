import { QuantumBackground } from "./components/QuantumBackground";
import { NotFound } from "./components/NotFound";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";
import { Interview } from "./components/Interview";
import { FullProfile } from "./pages/FullProfile";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SpeechProvider } from "./contexts/SpeechContext";
import { MainNav } from "./components/MainNav";
import { CookieNotice } from "./components/CookieNotice";
import { lazy, Suspense } from "react";

// Lazy load components that need speech
const LazyMainPage = lazy(() =>
  import("./components/MainPage").then((module) => ({
    default: module.MainPage,
  }))
);
const LazySecurityAudit = lazy(() =>
  import("./components/SecurityAudit").then((module) => ({
    default: module.SecurityAudit,
  }))
);
const LazyDemoMassacre = lazy(() =>
  import("./components/DemoMassacre").then((module) => ({
    default: module.DemoMassacre,
  }))
);
const LazyCTOTriage = lazy(() =>
  import("./components/CTOTriage").then((module) => ({
    default: module.CTOTriage,
  }))
);

function App() {
  return (
    <HashRouter>
      <QuantumBackground />
      <SpeechProvider>
        <MainNav />
      </SpeechProvider>
      <CookieNotice />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <SpeechProvider>
                <LazyMainPage />
              </SpeechProvider>
            </Suspense>
          }
        />
        <Route
          path="/security-audit"
          element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <SpeechProvider>
                <LazySecurityAudit />
              </SpeechProvider>
            </Suspense>
          }
        />
        <Route
          path="/demo-massacre"
          element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <SpeechProvider>
                <LazyDemoMassacre />
              </SpeechProvider>
            </Suspense>
          }
        />
        <Route
          path="/triage"
          element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <SpeechProvider>
                <LazyCTOTriage />
              </SpeechProvider>
            </Suspense>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/profile" element={<FullProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
