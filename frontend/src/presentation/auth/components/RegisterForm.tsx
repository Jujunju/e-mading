import { ArrowLeft, Book, Layers, User, Lock, EyeOff, Eye, UserPlus, UserRound } from 'lucide-react';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/use-register.hook';
import { AuthClientImplRepository } from '../../../data/repositories/auth/auth-client-impl.repository';
import { RegisterClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/register-client.usecase';

const userClientImplRepository = new AuthClientImplRepository();
const registerClientUseCase = new RegisterClientUseCase(userClientImplRepository);

export const RegisterForm: React.FC = () => {
  const { executeRegister, loading } = useRegister(registerClientUseCase);

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    role: 'siswa',
    kelas: '',
    jurusan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeRegister({
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role,
      kelas: formData.kelas,
      jurusan: formData.jurusan,
    });

  };
  return (
    <div>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-body p-4 p-md-5">
            <Link to="/e-mading/login" className="text-decoration-none small fw-bold d-flex align-items-center gap-1 mb-4 text-muted">
              <ArrowLeft size={16} /> Kembali ke Login
            </Link>

            <div className="mb-4">
              <h3 className="fw-bold text-dark">Daftar Akun Siswa</h3>
              <p className="text-muted small">
                Bergabunglah dengan komunitas <strong>E-Mading</strong>
              </p>
            </div>

            <form autoComplete="on" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-bold small text-secondary">USERNAME</label>
                  <div className="input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0">
                      <UserRound size={18} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      name="username"
                      title="Hanya boleh huruf"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control border-0 py-2 shadow-none"
                      placeholder="namadepan_namabelakang"
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold small text-secondary">PASSWORD</label>
                  <div className="input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0">
                      <Lock size={18} className="text-muted" />
                    </span>
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="form-control border-0 py-2 shadow-none" placeholder="••••••••" required />
                    <button className="btn bg-light border-0 text-muted" type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold small text-secondary">NAMA LENGKAP</label>
                  <div className="input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0">
                      <User size={18} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      pattern="[A-Za-z\s]+"
                      title="Hanya boleh huruf"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-control border-0 py-2 shadow-none"
                      placeholder="Namadepan Namabelakang"
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold small text-secondary">KELAS</label>
                  <div className="input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0">
                      <Layers size={18} className="text-muted" />
                    </span>
                    <select name="kelas" value={formData.kelas} onChange={handleChange} className="form-select border-0 py-2 shadow-none" required>
                      <option value="" disabled>
                        Pilih Tingkatan Kelas
                      </option>
                      <option value="X">X (Sepuluh)</option>
                      <option value="XI">XI (Sebelas)</option>
                      <option value="XII">XII (Dua Belas)</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold small text-secondary">JURUSAN</label>
                  <div className="input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0">
                      <Book size={18} className="text-muted" />
                    </span>
                    <select name="jurusan" value={formData.jurusan} onChange={handleChange} className="form-select border-0 py-2 shadow-none" required>
                      <option value="" disabled>
                        Pilih Jurusan
                      </option>
                      <option value="PPLG">PPLG (Pengembangan Perangkat Lunak & Gim)</option>
                      <option value="DKV">DKV (Desain Komunikasi Visual)</option>
                      <option value="MPLB">MPLB (Manajemen Perkantoran & Layanan Bisnis)</option>
                      <option value="TJKT">TJKT (Teknik Jaringan Komputer & Telekomunikasi)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn w-100 py-2 rounded-3 fw-bold mt-4 shadow-sm d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#006d32', color: '#fff', border: 'none' }} disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <UserPlus size={20} />}
                {loading ? 'Mendaftarkan...' : 'Buat Akun Siswa'}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Sudah punya akun?{' '}
                <Link to="/e-mading/login" className="fw-bold text-decoration-none" style={{ color: '#006d32' }}>
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
