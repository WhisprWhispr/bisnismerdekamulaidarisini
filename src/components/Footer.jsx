import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      padding: '2rem 0',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto'
    }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/track" style={{ color: 'var(--text-light)', textDecoration: 'none', fontWeight: 'bold' }}>Lacak Status</Link>
        <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Kebijakan Privasi</Link>
        <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Syarat & Ketentuan</Link>
        <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tentang Kami</Link>
        <Link to="/login" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>Admin</Link>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
        &copy; 2026 SukaCoding - All rights reserved. 
      </p>
    </footer>
  );
}

export default Footer;
