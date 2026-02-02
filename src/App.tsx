import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ScrollToHash from './components/ScrollToHash';
import IndustryLandingPage from './pages/IndustryLandingPage';
import LegacyWorkRedirect from './pages/LegacyWorkRedirect';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Legacy URLs from the previous portfolio */}
        <Route path="/work" element={<Navigate to="/#work" replace />} />
        <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route
          path="/industries/transaction-coordinators"
          element={<IndustryLandingPage industry="transaction-coordinators" />}
        />
        <Route path="/industries/trades" element={<IndustryLandingPage industry="trades" />} />
        <Route path="/industries/home-services" element={<IndustryLandingPage industry="home-services" />} />

        <Route path="/case-study/:id" element={<CaseStudyPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
