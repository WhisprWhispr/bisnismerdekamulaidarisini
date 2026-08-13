import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

function TrackStatus() {
  const [domainInput, setDomainInput] = useState('');
  const [activeSearchDomain, setActiveSearchDomain] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeSearchDomain) return;

    setLoading(true);
    setStatus(null);

    const q = query(collection(db, "registrations"), where("domain", "==", activeSearchDomain));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLoading(false);
      if (!snapshot.empty) {
        setStatus('found');
      } else {
        setStatus('not_found');
      }
    }, (error) => {
      console.error(error);
      setStatus('error');
      setLoading(false);
    });

    // Cleanup listener on unmount or when activeSearchDomain changes
    return () => unsubscribe();
  }, [activeSearchDomain]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!domainInput) return;
    
    let searchDomain = domainInput.toLowerCase().trim();
    if (!searchDomain.endsWith('.netlify.app')) {
      searchDomain += '.netlify.app';
    }

    setActiveSearchDomain(searchDomain);
  };

  return (
    <div className="app-container" style={{ maxWidth: '600px', margin: '4rem auto' }}>
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '2rem', width: 'fit-content' }}>
        <FaArrowLeft style={{ marginRight: '8px' }} /> Kembali ke Beranda
      </Link>
      
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-light)' }}>Lacak Status Pendaftaran</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Masukkan nama domain Anda untuk mengecek status pendaftaran website gratis Anda.</p>
        
        <form onSubmit={handleSearch}>
          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="contoh: bisnisku" 
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn" style={{ width: 'auto', padding: '0 1.5rem' }} disabled={loading}>
              <FaSearch />
            </button>
          </div>
        </form>

        {loading && <p style={{ textAlign: 'center', marginTop: '2rem' }}>Mencari secara realtime...</p>}

        {status === 'found' && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', textAlign: 'center' }}>
            <FaCheckCircle style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '1rem' }} />
            <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Pendaftaran Ditemukan!</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Domain <strong>{activeSearchDomain}</strong> telah terdaftar dan saat ini sedang <strong style={{color: 'var(--success)'}}><FaClock style={{verticalAlign:'middle'}}/> Dalam Antrean</strong>. Tim Developer kami akan segera memproses pembuatan website Anda.</p>
          </div>
        )}

        {status === 'not_found' && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: '8px', textAlign: 'center' }}>
            <FaTimesCircle style={{ fontSize: '3rem', color: 'var(--error)', marginBottom: '1rem' }} />
            <h3 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Pendaftaran Tidak Ditemukan</h3>
            <p style={{ color: 'var(--text-light)' }}>Domain tersebut belum terdaftar, Anda mungkin salah mengetik, atau telah dihapus oleh Admin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackStatus;
