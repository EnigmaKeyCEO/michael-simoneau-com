import React from 'react';
import { QuantumBackground } from './components/QuantumBackground';
import { MainPage } from './components/MainPage';
import { SecurityAudit } from './components/SecurityAudit';
import { DemoMassacre } from './components/DemoMassacre';
import { CTOTriage } from './components/CTOTriage';
import { NotFound } from './components/NotFound';
import { Blog } from './components/Blog';
import { BlogPost } from './components/BlogPost';
import { Interview } from './components/Interview';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SpeechProvider } from './contexts/SpeechContext';
import { MainNav } from './components/MainNav';
import { CookieNotice } from './components/CookieNotice';

function App() {
  return (
    <HashRouter>
      <SpeechProvider>
        <QuantumBackground />
        <MainNav />
        <CookieNotice />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/proof" element={<SecurityAudit />} />
          <Route path="/bloodbath" element={<DemoMassacre />} />
          <Route path="/triage" element={<CTOTriage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SpeechProvider>
    </HashRouter>
  );
}

export default App;