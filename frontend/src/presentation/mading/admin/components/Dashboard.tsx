import { FileText, Layout, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMading } from '../hooks/use-manage-mading-hook/use-mading.hooks';
import { FrontMadingImplRepository } from '../../../../data/repositories/mading/admin/front-manage-mading-impl-repository/front-mading-impl.repository';
import { FrontGetMadingUseCase } from '../../../../core/usecases/mading/admin/front-manage-mading/front-mading.usecase';
import { FrontStudentImplRepository } from '../../../../data/repositories/mading/admin/front-manage-student-impl-repository/front-student-impl.repository';
import { FrontGetStudentUseCase } from '../../../../core/usecases/mading/admin/front-manage-student/front-student.usecase';
import { useGetStudent } from '../hooks/use-manage-student-hook/use-student.hook';
import '../css/dashboard.style.css'

const madingRepo = new FrontMadingImplRepository();
const getMadingUseCase = new FrontGetMadingUseCase(madingRepo);

const studentRepo = new FrontStudentImplRepository();
const getStudentUseCase = new FrontGetStudentUseCase(studentRepo);

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  interface MyTokenPayload {
    id: string;
    fullName: string;
    role: string;
  }

  const { executeGetMadingHook, data: dataMading, loading: loadMading } = useGetMading(getMadingUseCase);
  const { executeStudentHook, data: dataSiswa } = useGetStudent(getStudentUseCase);

  const token = localStorage.getItem('token');
  const decode = token ? jwtDecode<MyTokenPayload>(token) : null;

  useEffect(() => {
    if (!token || decode?.role !== 'admin') {
      navigate('/e-mading/login');
      return;
    }

    const fetchData = async () => {
      await Promise.all([executeGetMadingHook(), executeStudentHook()]);
    };
    fetchData();
  }, [token, decode?.role, navigate]);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!token || decode?.role !== 'admin') return null;

  if (loadMading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-grow text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="text-muted fw-bold">Menyiapkan Data Statistik...</p>
      </div>
    );
  }

  return (
    <div className="p-2 p-md-3 animate__animated animate__fadeIn">
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Statistik Mading</h4>
        <p className="text-muted small">Pantau perkembangan informasi dan partisipasi siswa secara real-time.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="card border-0 rounded-4 overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #006d32 0%, #00a34c 100%)', color: 'white' }}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-12 col-md-8 text-center text-md-start">
                  <div className="badge px-3 py-2 mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)' }}>
                    <ShieldCheck size={14} className="me-1" /> Administrator System
                  </div>
                  <h2 className="fw-bold mb-4">Halo, {decode?.fullName}! 👋</h2>

                  <div className="d-flex gap-2 justify-content-center justify-content-md-start">
                    <Link to="/admin/kelola-mading/tambah-mading" className="btn btn-light fw-bold px-4 py-2 rounded-3 text-success shadow-sm transition-all hover-up">
                      + Buat Mading
                    </Link>
                    <button onClick={handleRefresh} className="btn fw-bold px-4 py-2 rounded-3 border-white text-white shadow-sm transition-all" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      Refresh Data
                    </button>
                  </div>
                </div>

                <div className="col-12 col-md-4 text-center text-md-end mt-4 mt-md-0 d-none d-sm-block">
                  <div className="opacity-75 small tracking-wider">{new Date().toLocaleDateString('id-ID', { weekday: 'long' })}</div>
                  <h5 className="fw-bold mb-0">{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</h5>
                  <div className="mt-3 opacity-25">
                    <ShieldCheck size={80} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 bg-white">
        <div className="card-body p-4">
          <div className="mb-4">
            <h5 className="fw-bold text-dark mb-1">Ringkasan Manajemen</h5>
            <p className="text-muted small">Klik pada kartu untuk mengelola data spesifik.</p>
          </div>

          <div className="row g-3">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card p-4 border border-light-subtle rounded-4 bg-light-subtle d-flex flex-column align-items-center text-center h-100">
                <div className="icon-box mb-3 text-primary bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <Users size={28} />
                </div>
                <div className="fw-bold text-dark mb-1" style={{ fontSize: '16px' }}>
                  Data Siswa
                </div>
                <div className="text-muted small">
                  Total: <span className="text-primary fw-bold">{dataSiswa?.filter((e) => e.role !== 'admin').length || 0} Akun</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card p-4 border border-light-subtle rounded-4 bg-light-subtle d-flex flex-column align-items-center text-center h-100">
                <div className="icon-box mb-3 text-success bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <FileText size={28} />
                </div>
                <div className="fw-bold text-dark mb-1" style={{ fontSize: '16px' }}>
                  Data Mading
                </div>
                <div className="text-muted small">
                  Total: <span className="text-success fw-bold">{dataMading?.length || 0} Post</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card p-4 border border-light-subtle rounded-4 bg-light-subtle d-flex flex-column align-items-center text-center h-100">
                <div className="icon-box mb-3 text-warning bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <MessageCircle size={28} />
                </div>
                <div className="fw-bold text-dark mb-1" style={{ fontSize: '16px' }}>
                  Komentar
                </div>
                <div className="text-muted small">
                  Total: <span className="text-warning fw-bold">0 Pesan</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card p-4 border border-light-subtle rounded-4 bg-light-subtle d-flex flex-column align-items-center text-center h-100">
                <div className="icon-box mb-3 text-info bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <Layout size={28} />
                </div>
                <div className="fw-bold text-dark mb-1" style={{ fontSize: '16px' }}>
                  Kategori
                </div>
                <div className="text-muted small">
                  Total: <span className="text-info fw-bold">0 Jenis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
