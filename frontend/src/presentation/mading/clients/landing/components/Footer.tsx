import React from 'react';
import {Instagram, Youtube } from 'lucide-react';
import '../css/footer.style.css'

export const Footer: React.FC = () => {
  return (
    <footer className="py-5 border-top bg-white">
      <div className="container py-5">
        <div className="row justify-content-center g-5 text-center">
          <div className="col-lg-10">
            <a className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2 py-2 justify-content-center text-decoration-none" href="/" style={{ color: '#0f172a' }}>
              E-Mading
            </a>

            <p className="text-muted px-md-5">Platform Mading Digital. Solusi inovatif untuk mempermudah penyediaan informasi dan berita sekolah.</p>

            <div className="d-flex gap-4 justify-content-center mt-4">
              <a href="https://www.instagram.com/sayjunz_/" style={{ color: '#0f172a' }} className="transition-opacity opacity-75 hover-opacity-100">
                <Instagram size={24} />
              </a>
              <a href="https://www.youtube.com/@jnjunaedi" style={{ color: '#0f172a' }} className="transition-opacity opacity-75 hover-opacity-100">
                <Youtube size={25} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-5 opacity-10" />

        <div className="text-center text-muted small">
          © 2026 <strong>E-Mading</strong>. <br className="d-md-none" />
          Created By{' '}
          <a href="https://www.instagram.com/sayjunz_/" className="fw-bold text-decoration-none" style={{ color: '#006d32' }}>
            Jujun Junaedi 👨‍💻
          </a>
        </div>
      </div>
    </footer>
  );
};
