import { ArrowLeftToLine, LogOut, TextAlignStart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { KelolaMading } from '../components/KelolaMading';
import { KelolaSiswa } from '../components/KelolaSiswa';
import { KelolaKomentar } from '../components/KelolaKomentar';
import { TambahMading } from '../components/services/TambahMading';
import { UpdateMading } from '../components/services/UpdateMading';
import Swal from 'sweetalert2';
import '../css/main-dashboard.style.css';
import { Sidebar } from '../components/Sidebar';
import { DetailAccount } from '../components/DetailAccount';
import { useAuth } from '../../../auth/hooks/use-auth.hook';

export const MyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { verifyToken, isAuthenticated, user } = useAuth();

  useEffect(() => {
verifyToken();
  }, [])

  useEffect(() => {

    if (!isAuthenticated || user?.user?.role !== 'admin') {
      navigate('/e-mading-by-jujun/login');
      return;
    }
    queueMicrotask(() => {
      setIsSidebarOpen(false);
    });
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Apakah anda yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      await Swal.fire({
        title: 'Berhasil logout!',
        icon: 'success',
        draggable: true,
      });
      navigate('/e-mading-by-jujun/login');
    }
  };

  if (!isAuthenticated || user?.user.role !== 'admin') return null;

  return (
    <div className="d-flex" style={{ backgroundColor: '#f8f9fa', height: '100vh', overflowX: 'hidden', overflowY: 'hidden' }}>
      {isSidebarOpen && <div className="sidebar-overlay d-xl-none" onClick={() => setIsSidebarOpen(false)}></div>}

      <div>
        <Sidebar funcHandleLogout={handleLogout} isSdOpen={isSidebarOpen} stIsSdOpen={setIsSidebarOpen} />
      </div>

      <div className="flex-grow-1 overflow-y-auto" style={{ minWidth: 0 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 sticky-top">
          <div className="container-fluid p-0">
            <button className="btn p-2 d-xl-none rounded-circle border-0 hover-bg-light me-3" onClick={() => setIsSidebarOpen(true)}>
              <TextAlignStart size={28} className="text-dark" />
            </button>

            <div className="d-flex align-items-center ms-auto position-relative">
              <div className="d-flex align-items-center ps-4" style={{ cursor: 'pointer' }} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <div className="text-end me-3 d-none d-sm-block">
                  <p className="mb-0 fw-bold small text-dark">{user?.user.fullName}</p>
                  <p className="mb-0 text-muted small" style={{ fontSize: '11px' }}>
                    Admin SMK-TMPC
                  </p>
                </div>
                <img src={`https://ui-avatars.com/api/?name=${user?.user.fullName}&background=006d32&color=fff`} alt="Admin" className="rounded-circle shadow-sm" width="40" height="40" />
              </div>

              <div className={`profile-dropdown shadow-lg p-3 rounded-4 ${isProfileOpen ? 'dropdown-active' : ''}`}>
                <div className="text-center mb-3">
                  <img src={`https://ui-avatars.com/api/?name=${user?.user.fullName}&background=006d32&color=fff`} className="rounded-circle mb-2" width="60" height="60" alt="Admin" />
                  <h6 className="fw-bold mb-0">{user?.user.fullName}</h6>
                  <span className="badge bg-success-light text-success rounded-pill px-3 py-1 mt-1" style={{ fontSize: '10px' }}>
                    Administrator
                  </span>
                </div>
                <hr className="text-muted opacity-25" />
                <div className="d-flex flex-column gap-1">
                  <Link to="/e-mading-by-jujun" className="dropdown-item-custom rounded-3 d-flex align-items-center gap-2 py-2 px-3 text-secondary text-decoration-none small">
                    <ArrowLeftToLine size={16} /> Beranda Publik
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item-custom rounded-3 d-flex align-items-center gap-2 py-2 px-3 text-danger border-0 bg-transparent w-100 text-start small fw-medium">
                    <LogOut size={16} /> Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-3 p-lg-4 animate__animated animate__fadeIn overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kelola-mading/*" element={<KelolaMading />} />
            <Route path="kelola-mading/tambah-mading" element={<TambahMading />} />
            <Route path="kelola-mading/edit-mading/:id" element={<UpdateMading />} />
            <Route path="data-siswa" element={<KelolaSiswa />} />
            <Route path="data-siswa/detail-account/:id" element={<DetailAccount />} />
            <Route path="data-komentar" element={<KelolaKomentar />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
