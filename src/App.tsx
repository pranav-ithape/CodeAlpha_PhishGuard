import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/common/ScrollToTop';
import { RootLayout } from './layouts/RootLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LearnPage } from './pages/LearnPage';
import { LessonPage } from './pages/LessonPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { EmailAnalysisPage } from './pages/EmailAnalysisPage';
import { UrlAnalysisPage } from './pages/UrlAnalysisPage';
import { QuizPage } from './pages/QuizPage';
import { PreventionPage } from './pages/PreventionPage';
import { IncidentResponsePage } from './pages/IncidentResponsePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LandingPage } from './pages/LandingPage';

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<RootLayout />}>
        {/* Core application routes */}
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Learning routes */}
        <Route path="learn" element={<LearnPage />} />
        <Route path="learn/:slug" element={<LessonPage />} />
        
        {/* Interactive labs & case studies */}
        <Route path="examples" element={<ExamplesPage />} />
        <Route path="email-analysis" element={<EmailAnalysisPage />} />
        <Route path="url-analysis" element={<UrlAnalysisPage />} />
        
        {/* Assessment */}
        <Route path="quiz" element={<QuizPage />} />
        
        {/* Defense and emergency playbooks */}
        <Route path="prevention" element={<PreventionPage />} />
        <Route path="incident-response" element={<IncidentResponsePage />} />
        
        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
