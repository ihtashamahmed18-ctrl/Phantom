import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useAnimations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { signOut } = useAuth();
  useScrollReveal([location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar onSignOut={signOut} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
