import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import About from './pages/About';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TrackStatus from './pages/TrackStatus';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  useEffect(() => {
    // Prevent Right Click
    const handleContextMenu = (e) => e.preventDefault();

    // Prevent Keyboard Shortcuts
    const handleKeyDown = (e) => {
      if (e.key === 'F12') e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's' || e.key === 'P' || e.key === 'p')) e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text-light)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)'
          },
          success: {
            iconTheme: { primary: 'var(--success)', secondary: 'white' }
          },
          error: {
            iconTheme: { primary: 'var(--error)', secondary: 'white' }
          }
        }} 
      />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        
        {/* Background Video */}
        <iframe 
          className="bg-video"
          src="https://www.youtube.com/embed/uXuRJy7zrjo?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&disablekb=1&playlist=uXuRJy7zrjo"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Video"
        ></iframe>
        <div className="bg-overlay"></div>

        <div style={{ flex: 1, zIndex: 1, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/track" element={<TrackStatus />} />
          </Routes>
        </div>
        <div style={{ zIndex: 1, position: 'relative' }}>
          <Footer />
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
