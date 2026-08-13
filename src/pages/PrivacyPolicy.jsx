import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '0 2rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', animation: 'fadeInUp 0.8s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Kebijakan Privasi</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Keamanan dan privasi data Anda adalah prioritas utama kami.</p>
        </div>
        
        <div style={{ lineHeight: '1.8', color: 'var(--text-light)', fontSize: '1.05rem' }}>
          <h3 style={{ color: 'var(--accent)', fontSize: '1.4rem', marginBottom: '1rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🔒</span> 1. Pengumpulan Data
          </h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela saat mengisi formulir pendaftaran, seperti Nama, Email, Nomor WhatsApp, dan preferensi website Anda.
          </p>

          <h3 style={{ color: 'var(--accent)', fontSize: '1.4rem', marginBottom: '1rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🛡️</span> 2. Penggunaan Informasi
          </h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Data yang terkumpul murni digunakan untuk keperluan komunikasi terkait pembuatan website gratis Anda, dan tidak akan diperjualbelikan kepada pihak ketiga manapun.
          </p>

          <h3 style={{ color: 'var(--accent)', fontSize: '1.4rem', marginBottom: '1rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✅</span> 3. Keamanan Data
          </h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Sistem kami dilindungi oleh enkripsi standar industri (Firebase) untuk memastikan bahwa data pribadi Anda tersimpan secara aman dari akses yang tidak sah.
          </p>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '1rem 3rem' }}>
              Saya Mengerti, Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
