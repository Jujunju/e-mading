import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogOut, Home, Newspaper, Layout, ArrowLeftToLine, User } from 'lucide-react';
import '../css/navbar.style.css';
import { useAuth } from '../../../../auth/hooks/use-auth.hook';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { handlerLogout, user, isAuthenticated, verifyToken } = useAuth();

  useEffect(() => {
    verifyToken();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan keluar dari sesi ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      handlerLogout();
      await Swal.fire({
        title: 'Berhasil logout!',
        icon: 'success',
        draggable: true,
      });
      navigate('/e-mading/login');
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg position-fixed start-0 end-0 top-0 py-3"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        zIndex: 1050,
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/e-mading">
          <div className="rounded-3 bg-success p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
            <span className="text-white fw-bold h4 mb-0">E</span>
          </div>
          <div className="d-flex flex-column" style={{ lineHeight: '1' }}>
            <span className="fw-bolder fs-5 text-dark mb-1">
              E-<span className="text-success">Mading</span>
            </span>
            <small className="text-muted" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
              OFFICIAL PORTAL
            </small>
          </div>
        </Link>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav" style={{ marginLeft: '-30px' }}>
          {location.pathname === `/e-mading/my-profile/${user?.user?.id}` || location.pathname !== `/e-mading/detail-mading/` ? (
            <ul className="navbar-nav gap-lg-4 py-3 py-lg-0"></ul>
          ) : (
            <ul className="navbar-nav gap-lg-4 py-3 py-lg-0">
              <li className="nav-item">
                <a href="#" className={`nav-link fw-bold d-flex align-items-center gap-2 text-dark `}>
                  <Home size={18} /> Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#berita-terbaru" className={`nav-link fw-bold d-flex align-items-center gap-2 text-dark`}>
                  <Newspaper size={18} /> Portal Berita
                </a>
              </li>
              {user?.user?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link fw-bold text-dark d-flex align-items-center gap-2">
                    <Layout size={18} /> Dashboard
                  </Link>
                </li>
              )}
            </ul>
          )}
          {location.pathname === `/e-mading` && (
            <ul className="navbar-nav gap-lg-4 py-3 py-lg-0">
              <li className="nav-item">
                <a href="#" className={`nav-link fw-bold d-flex align-items-center gap-2 text-dark `}>
                  <Home size={18} /> Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#berita-terbaru" className={`nav-link fw-bold d-flex align-items-center gap-2 text-dark`}>
                  <Newspaper size={18} /> Portal Berita
                </a>
              </li>
              {user?.user?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link fw-bold text-dark d-flex align-items-center gap-2">
                    <Layout size={18} /> Dashboard
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          {!isAuthenticated ? (
            <div className="d-flex gap-2">
              <Link to="/e-mading/login" className="btn btn-light px-4 rounded-pill fw-bold text-success border-0">
                Masuk
              </Link>
              <Link to="/e-mading/register" className="btn btn-success px-4 rounded-pill fw-bold shadow-sm border-0">
                Daftar
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }} onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className="rounded-circle overflow-hidden shadow-sm border border-2 border-success" style={{ width: '40px', height: '40px' }} data-bs-toggle="dropdown">
                <img src={`https://ui-avatars.com/api/?name=${user?.user?.fullName}&background=006d32&color=fff`} className="w-100 h-100" alt="profile" />
              </div>
              <div className={`profile-dropdown shadow-lg p-3 rounded-4 ${isProfileOpen ? 'dropdown-active' : ''}`}>
                <div className="text-center mb-3">
                  <img src={`https://ui-avatars.com/api/?name=${user?.user?.fullName}&background=006d32&color=fff`} className="rounded-circle mb-2" width="60" height="60" alt="" />
                  <h6 className="fw-bold mb-0">{user?.user?.fullName}</h6>
                  <span className="badge bg-success-light text-success rounded-pill px-3 py-1 mt-1" style={{ fontSize: '10px' }}>
                    {user?.user?.username !== 'admin_mading' ? user?.user?.username : 'admin_mading'}
                  </span>
                </div>
                <hr className="text-muted opacity-25" />
                <div className="d-flex flex-column gap-1 ">
                  {location.pathname === `/e-mading/my-profile/${user?.user?.id}` ? (
                    <div>
                      <Link to="/e-mading" className="dropdown-item-custom text-success rounded-3 d-flex align-items-center gap-2 py-2 px-3 text-secondary text-decoration-none small">
                        <ArrowLeftToLine size={16} /> Beranda Publik
                      </Link>
                    </div>
                  ) : (
                    <div className="">
                      <Link to={`/e-mading/my-profile/${user?.user?.id}`} className="dropdown-item-custom rounded-3 d-flex align-items-center gap-2 py-2 px-3 text-success text-decoration-none fw-medium">
                        <User size={16} /> Profile
                      </Link>
                    </div>
                  )}

                  {user?.user?.role === 'admin' && (
                    <Link to={`/admin/dashboard`} className="dropdown-item-custom-dash rounded-3 d-flex align-items-center gap-2 py-2 px-3 text-secondary border-0 w-100 text-start small fw-medium text-decoration-none">
                      <Layout size={16} /> Dashboard
                    </Link>
                  )}

                  <button onClick={handleLogout} className="dropdown-item-custom-logout rounded-3 d-flex align-items-center gap-2 py-2 px-3 text-danger border-0 w-100 text-start small fw-medium">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
