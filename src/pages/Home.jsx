import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchServerTime, TARGET_DATE } from '../utils/timeCheck';
import { FaCode, FaShoppingCart, FaUserTie, FaIdCard, FaCheckCircle, FaLock, FaUnlock, FaGlobe, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import '../App.css';

function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', domain: '', category: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [slotCount, setSlotCount] = useState(0);
  const [domainStatus, setDomainStatus] = useState({ checking: false, available: null, error: null });

  // Domain availability check
  const handleCheckDomain = async () => {
    const domain = formData.domain;
    if (!domain || !domain.endsWith('.netlify.app') || domain.length < 14) {
      toast.error("Format domain tidak valid (harus diakhiri .netlify.app).");
      setDomainStatus({ checking: false, available: null, error: null });
      return;
    }
    
    setDomainStatus({ checking: true, available: null, error: null });
    try {
      const res = await fetch(`https://api.microlink.io/?url=https://${domain}`);
      const data = await res.json();
      
      if (data.statusCode === 404 || data.data?.title === "Site not found") {
        setDomainStatus({ checking: false, available: true, error: null });
      } else {
        setDomainStatus({ checking: false, available: false, error: null });
      }
    } catch (err) {
      toast.error("Gagal memeriksa ketersediaan domain.");
      setDomainStatus({ checking: false, available: null, error: null });
    }
  };

  // Countdown Logic
  useEffect(() => {
    let intervalId;
    let serverTimeOffset = 0;

    const initializeTimer = async () => {
      // Fetch exact time from server
      const currentServerTime = await fetchServerTime();
      const localTime = new Date().getTime();
      serverTimeOffset = currentServerTime - localTime;

      intervalId = setInterval(() => {
        const now = new Date().getTime() + serverTimeOffset;
        const distance = TARGET_DATE - now;

        if (distance <= 0) {
          clearInterval(intervalId);
          setIsActive(true);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          });
        }
      }, 1000);
    };

    initializeTimer();

    let hasNotifiedFull = false;

    const unsubscribe = onSnapshot(collection(db, "registrations"), (snapshot) => {
      const size = snapshot.size;
      setSlotCount(size);
      
      // Munculkan notifikasi pop-up otomatis jika slot sudah habis
      if (size >= 10 && !hasNotifiedFull) {
        toast('Mohon Maaf, Kuota Telah Habis!', {
          icon: '🛑',
          duration: 6000,
          style: {
            background: 'rgba(239, 68, 68, 0.95)', // var(--error) tapi transparan
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '20px',
            border: '2px solid #fff'
          },
        });
        hasNotifiedFull = true;
      }
    }, (error) => {
      console.error("Error listening to slots realtime", error);
    });

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'domain') {
      setDomainStatus({ checking: false, available: null, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isActive) return;

    setStatus({ loading: true, error: null, success: false });

    try {
      // Re-verify time strictly before submission
      const currentServerTime = await fetchServerTime();
      if (currentServerTime < TARGET_DATE) {
        setStatus({ loading: false, error: null, success: false });
        toast.error("Waktu pendaftaran belum dimulai!");
        return;
      }

      // Validate domain
      if (!formData.domain.endsWith('.netlify.app')) {
        setStatus({ loading: false, error: null, success: false });
        toast.error("Nama domain harus berakhiran .netlify.app!");
        return;
      }

      if (domainStatus.available === null) {
        setStatus({ loading: false, error: null, success: false });
        toast.error("Wajib menekan tombol 'Cek Domain' terlebih dahulu!");
        return;
      }

      if (domainStatus.available === false) {
        setStatus({ loading: false, error: null, success: false });
        toast.error("Nama domain sudah dipakai. Silakan gunakan nama domain lain.");
        return;
      }

      // Check slot availability
      const querySnapshot = await getDocs(collection(db, "registrations"));
      if (querySnapshot.size >= 10) {
        setStatus({ loading: false, error: null, success: false });
        setSlotCount(querySnapshot.size);
        toast.error("Mohon maaf, kuota 10 slot sudah penuh!");
        return;
      }

      // Submit data
      await addDoc(collection(db, "registrations"), {
        ...formData,
        timestamp: new Date().getTime() // Store local timestamp for reference
      });

      setStatus({ loading: false, error: null, success: true });
      setSlotCount(querySnapshot.size + 1);
      setFormData({ name: '', email: '', whatsapp: '', domain: '', category: '' });
      toast.success("Selamat! Anda berhasil mendaftar.");

    } catch (e) {
      setStatus({ loading: false, error: null, success: false });
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error(e);
    }
  };

  const padZero = (num) => num.toString().padStart(2, '0');

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <FaCode className="logo-icon" />
          <span>Suka<span className="logo-gradient">Coding</span></span>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">Spesial Kemerdekaan RI Ke-81</div>
        <h1>PROGRAM <br /> <span className="text-gradient">WEBSITE GRATIS!</span></h1>
        <p>
          Dalam rangka memperingati 17 Agustus 2026, SukaCoding menghadirkan program spesial Website Gratis untuk membantu UMKM, bisnis, maupun project digital Anda.
        </p>

        {/* Countdown */}
        <div className="countdown-container">
          <div className="countdown-box">
            <span className="countdown-value">{padZero(timeLeft.days)}</span>
            <span className="countdown-label">Hari</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-value">{padZero(timeLeft.hours)}</span>
            <span className="countdown-label">Jam</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-value">{padZero(timeLeft.minutes)}</span>
            <span className="countdown-label">Menit</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-value">{padZero(timeLeft.seconds)}</span>
            <span className="countdown-label">Detik</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="content-grid">
        
        {/* Info Section */}
        <div className="info-section">
          
          <div className="glass-panel info-card">
            <h3><FaTrophy /> Hanya 10 Slot! (Siapa Cepat, Dia Dapat)</h3>
            <p className="mb-3" style={{ color: 'var(--text-muted)' }}>Sisa Slot Saat Ini: <strong style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>{Math.max(0, 10 - slotCount)}</strong></p>
            <ul>
              <li><FaCheckCircle /> Jasa Pembuatan Website 100% Gratis</li>
              <li><FaCheckCircle /> Syarat: Domain & Hosting disiapkan peserta</li>
              <li><FaCheckCircle /> Struktur web standar industri (modern & mobile friendly)</li>
            </ul>
          </div>

          <div className="glass-panel info-card">
            <h3><FaGlobe /> Kategori Website</h3>
            <div className="categories">
              <div className="category-item">
                <FaShoppingCart />
                <h4>E-Commerce</h4>
              </div>
              <div className="category-item">
                <FaUserTie />
                <h4>Portfolio</h4>
              </div>
              <div className="category-item">
                <FaIdCard />
                <h4>ID Card</h4>
              </div>
            </div>
          </div>

        </div>

        {/* Registration Form */}
        <div className="registration-section">
          <div className="glass-panel form-card">
            <div className="form-header">
              <h2>Registrasi</h2>
              <p>
                <FaCalendarAlt style={{marginRight: '8px'}} />
                Aktif pada <strong>17 Agustus 2026, 11:20 WIB</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Lengkap / Nama Bisnis</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama Anda"
                  disabled={!isActive || slotCount >= 10 || status.success}
                />
              </div>

              <div className="form-group">
                <label>Alamat Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                  disabled={!isActive || slotCount >= 10 || status.success}
                />
              </div>

              <div className="form-group">
                <label>Nomor WhatsApp</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="08xxxxxxxxxx"
                  disabled={!isActive || slotCount >= 10 || status.success}
                />
              </div>

              <div className="form-group">
                <label>Nama Domain (.netlify.app)</label>
                <div className="domain-input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    pattern="^[a-zA-Z0-9-]+\.netlify\.app$"
                    title="Domain harus berakhiran .netlify.app (contoh: tokoku.netlify.app)"
                    placeholder="nama-website.netlify.app"
                    disabled={!isActive || slotCount >= 10 || status.success}
                  />
                  <button 
                    type="button" 
                    onClick={handleCheckDomain}
                    disabled={!isActive || domainStatus.checking || status.success || !formData.domain}
                    style={{
                      padding: '0 15px',
                      background: 'rgba(59, 130, 246, 0.2)',
                      border: '1px solid var(--primary)',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: '0.3s'
                    }}
                  >
                    {domainStatus.checking ? 'Memeriksa...' : 'Cek Domain'}
                  </button>
                </div>
                {domainStatus.available !== null && (
                  <div style={{ marginTop: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {domainStatus.available === true && <span style={{ color: 'var(--success)' }}><FaCheckCircle /> Domain tersedia!</span>}
                    {domainStatus.available === false && <span style={{ color: 'var(--error)' }}><FaLock /> Domain sudah dipakai, pilih yang lain.</span>}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Kategori Website</label>
                <select 
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={!isActive || slotCount >= 10 || status.success}
                >
                  <option value="" disabled>-- Pilih Kategori --</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="idcard">ID Card / Profil Digital</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={!isActive || slotCount >= 10 || status.loading || status.success}
              >
                {status.loading ? 'Memproses...' : 
                 !isActive ? <><FaLock style={{marginRight: '8px', verticalAlign: 'middle'}}/> Registrasi Belum Dibuka</> : 
                 slotCount >= 10 ? 'Kuota Penuh' : 
                 status.success ? 'Berhasil Daftar' :
                 <><FaUnlock style={{marginRight: '8px', verticalAlign: 'middle'}}/> Daftar Sekarang</>}
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Home;
