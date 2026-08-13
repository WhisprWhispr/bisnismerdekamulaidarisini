import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '0 2rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', animation: 'fadeInUp 0.8s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Syarat & Ketentuan</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Peraturan program Website Gratis SukaCoding.</p>
        </div>
        
        <div style={{ lineHeight: '1.8', color: 'var(--text-light)', fontSize: '1.05rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span>📝</span> Ketentuan Umum</h3>
            <p style={{ color: 'var(--text-muted)' }}>Program ini berlaku khusus dalam rangka memeriahkan HUT RI ke-81. Kuota pembuatan website gratis terbatas dan berhak dihentikan kapan saja oleh pihak SukaCoding tanpa pemberitahuan sebelumnya.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--secondary)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span>⚖️</span> Hak dan Kewajiban</h3>
            <p style={{ color: 'var(--text-muted)' }}>Peserta wajib memberikan data yang valid (bukan spam). Pihak SukaCoding berhak membatalkan pendaftaran yang terindikasi menggunakan data fiktif atau melanggar hukum yang berlaku di Indonesia.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span>⏱️</span> Masa Aktif</h3>
            <p style={{ color: 'var(--text-muted)' }}>Website gratis yang telah selesai dibuat akan diberikan kepada pengguna beserta hak aksesnya (domain subdomain). Perawatan setelah penyerahan menjadi tanggung jawab penuh pengguna.</p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '1rem 3rem' }}>
              Setuju & Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
