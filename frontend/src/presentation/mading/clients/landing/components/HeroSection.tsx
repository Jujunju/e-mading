import React from 'react'

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-light border-bottom shadow-sm">
      <div className="py-5">
        <header className="py-5 mb-5 ">
          <div className="container px-4 px-lg-5 my-5 py-5 text-center">
            <h1 className="display-3 fw-bolder text-dark mb-3 ">Portal Informasi Digital SMK</h1>
            <p className="lead fw-normal text-muted mb-5 px-md-5">Platform penyedia informasi terkini dan pengumuman resmi SMK secara digital.</p>
            <div className="d-flex justify-content-center gap-2">
              <a href="#card" className="btn rounded-pill px-4 py-2 fw-bold text-white" style={{ backgroundColor: '#006d32' }}>
                Info Mading
              </a>
              <button className="btn border border-3 rounded-pill px-4 py-2 fw-bold">Terkini</button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
