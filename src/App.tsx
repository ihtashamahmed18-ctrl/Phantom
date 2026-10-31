import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Process from '@/pages/Process';
import Gallery from '@/pages/Gallery';
// import Testimonials from '@/pages/Testimonials';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import AdminGallery from '@/pages/AdminGallery';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-ink-950" />;
  }

  if (isAdmin || session) return <>{children}</>;

  return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/gallery" element={<Gallery />} />
                  {/* <Route path="/testimonials" element={<Testimonials />} /> */}
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
                  <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
