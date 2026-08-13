import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaArrowLeft, FaListOl } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

function TrackStatus() {
  const [domainInput, setDomainInput] = useState('');
  const [activeSearchDomain, setActiveSearchDomain] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registrationsList, setRegistrationsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "registrations"), (snapshot) => {
      const data = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      data.sort((a, b) => a.timestamp - b.timestamp);
      setRegistrationsList(data);
    });
    return () => unsubscribe();
  }, []);

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

        {loading && <p style={{ textAlign: 'center', marginTop: '2rem' }}>Memuat data...</p>}

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

        <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><FaListOl /> Live Antrean Terkini</h3>
          {registrationsList.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Belum ada pendaftar. Jadilah yang pertama!</p>
          ) : (
            <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
              {registrationsList.map((reg, index) => (
                <li key={reg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '15px', color: 'var(--accent)', fontSize: '1.2rem' }}>#{index + 1}</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '1rem' }}>{reg.domain}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--success)', display: 'flex', alignItems: 'center' }}>
                    <FaCheckCircle style={{marginRight:'6px'}}/> <span className="hide-on-mobile">Masuk Antrean</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackStatus;
