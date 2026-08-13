import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '0 2rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', animation: 'fadeInUp 0.8s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Tentang Kami</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Mengenal SukaCoding Lebih Dekat</p>
        </div>
        
        <div style={{ lineHeight: '1.8', color: 'var(--text-light)', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>SukaCoding</strong> didirikan dengan semangat untuk memajukan talenta digital di Indonesia. Kami adalah tim developer dan desainer yang berdedikasi tinggi untuk memberikan solusi website terbaik.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Dalam rangka memperingati <strong>HUT Kemerdekaan Republik Indonesia ke-81</strong>, kami mempersembahkan program khusus berupa pembuatan website profesional secara <em>GRATIS</em> untuk membantu UMKM, pelajar, dan masyarakat luas agar dapat hadir dan bersaing di ranah digital.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🇮🇩</div>
              <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Visi Kami</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Menciptakan ekosistem digital Indonesia yang mandiri, kreatif, dan berdaya saing global.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Misi Kami</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Memberikan akses teknologi dan pembuatan website gratis untuk mendorong pertumbuhan bisnis lokal.</p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '1rem 3rem' }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
