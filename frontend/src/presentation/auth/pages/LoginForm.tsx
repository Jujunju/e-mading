import React, { useState } from 'react';
import { Eye, EyeOff, Lock, LogIn, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.hook';

export const LoginForm: React.FC = () => {
  const { handlerLogin, isSubmitloading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handlerLogin({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-5">
            <h3 className="fw-bold text-dark">Selamat Datang!</h3>
            <p className="text-muted small">Masuk ke akun E-Mading Anda untuk mulai mengelola informasi.</p>
          </div>

          <form autoComplete="on" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold small text-secondary">USERNAME</label>
              <div className="input-group border rounded-3 overflow-hidden">
                <span className="input-group-text bg-light border-0">
                  <UserRound size={18} className="text-muted" />
                </span>
                <input type="text" name="username" className="form-control border-0 py-2 shadow-none" placeholder="namadepan_namabelakang" required value={formData.username} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-bold small text-secondary">KATA SANDI</label>
              </div>
              <div className="input-group border rounded-3 overflow-hidden">
                <span className="input-group-text bg-light border-0">
                  <Lock size={18} className="text-muted" />
                </span>
                <input type={`${showPassword ? 'text' : 'password'}`} name="password" className="form-control border-0 py-2 shadow-none" placeholder="••••••••" required value={formData.password} onChange={handleChange} />
                <button className="btn bg-light border-0 text-muted" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#006d32', color: '#fff', border: 'none' }}
              disabled={isSubmitloading}
            >
              {isSubmitloading ? <span className="spinner-border spinner-border-sm"></span> : <LogIn size={20} />}
              {isSubmitloading ? 'Mengecek...' : 'Masuk Sekarang'}
            </button>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Belum punya akun?
                <Link to="/e-mading-by-jujun/register" className="fw-bold text-decoration-none" style={{ color: '#006d32' }}>
                  {' '}
                  Daftar Gratis
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
