import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CommandsPage } from './pages/CommandsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SetupPage } from './pages/SetupPage';
import { PermissionsPage } from './pages/PermissionsPage';
import { AboutPage } from './pages/AboutPage';
import { StaffPage } from './pages/StaffPage';
import { OwnerPage } from './pages/OwnerPage';
import { StatusPage } from './pages/StatusPage';
import { EmbedsPage } from './pages/EmbedsPage';
import { AvatarsPage } from './pages/AvatarsPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Helper to scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#000000] text-[#ededed] selection:bg-[#333] selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/commands" element={<CommandsPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/avatars" element={<AvatarsPage />} />
              <Route path="/embeds" element={<EmbedsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/permissions" element={<PermissionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/owner" element={<OwnerPage />} />
              <Route path="/staff/owner" element={<OwnerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
