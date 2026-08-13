import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const unsubscribeDb = onSnapshot(collection(db, "registrations"), (snapshot) => {
      const data = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      // Sort by timestamp if available
      data.sort((a, b) => a.timestamp - b.timestamp);
      setRegistrations(data);
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribeDb();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const getWhatsAppLink = (reg) => {
    let phone = reg.whatsapp || "";
    if (phone.startsWith('0')) {
      phone = '62' + phone.substring(1);
    } else if (!phone.startsWith('62') && !phone.startsWith('+')) {
      phone = '62' + phone; 
    }
    
    const message = `Halo, ${reg.name} 👋\n\nTerima kasih telah berpartisipasi dalam program Website Gratis Spesial Kemerdekaan RI dari SukaCoding.\n\nBerikut adalah rincian pendaftaran Anda: \n• Nama Domain : ${reg.domain} \n• Kategori : ${reg.category}\n\nPendaftaran Anda telah berhasil kami verifikasi dan masuk ke dalam kuota antrean kami. Tim developer kami akan segera memproses pembuatan website Anda.\n\nJika ada informasi tambahan, kami akan menghubungi Anda kembali melalui nomor ini.\n\nSalam hangat, \nTim SukaCoding 🇮🇩`;
    
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const getEmailLink = (reg) => {
    const subject = `Pendaftaran Website Gratis Berhasil - ${reg.domain}`;
    const body = `Halo, ${reg.name} 👋\n\nTerima kasih telah berpartisipasi dalam program Website Gratis Spesial Kemerdekaan RI dari SukaCoding.\n\nBerikut adalah rincian pendaftaran Anda: \n• Nama Domain : ${reg.domain} \n• Kategori : ${reg.category}\n\nPendaftaran Anda telah berhasil kami verifikasi dan masuk ke dalam kuota antrean kami. Tim developer kami akan segera memproses pembuatan website Anda.\n\nJika ada informasi tambahan, kami akan menghubungi Anda kembali melalui alamat email anda ini.\n\nSalam hangat, \nTim SukaCoding 🇮🇩`;
    
    return `mailto:${reg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.6rem 1.2rem', background: 'var(--error)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Logout
        </button>
      </div>

      <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '12px', padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
            <tr>
              <th style={{ padding: '1.2rem 1rem' }}>No</th>
              <th style={{ padding: '1.2rem 1rem' }}>Nama</th>
              <th style={{ padding: '1.2rem 1rem' }}>Email (Klik)</th>
              <th style={{ padding: '1.2rem 1rem' }}>WhatsApp (Klik)</th>
              <th style={{ padding: '1.2rem 1rem' }}>Domain</th>
              <th style={{ padding: '1.2rem 1rem' }}>Kategori</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Belum ada pendaftar.</td>
              </tr>
            ) : (
              registrations.map((reg, index) => (
                <tr key={reg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem' }}>{index + 1}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{reg.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={getEmailLink(reg)} style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      ✉️ {reg.email}
                    </a>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <a href={getWhatsAppLink(reg)} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      💬 {reg.whatsapp}
                    </a>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--accent)' }}>{reg.domain}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap'
                    }}>{reg.category}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
