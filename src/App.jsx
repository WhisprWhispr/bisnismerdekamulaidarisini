import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import About from './pages/About';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
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
