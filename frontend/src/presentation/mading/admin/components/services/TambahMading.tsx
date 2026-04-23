import { AlertCircle, AlignLeft, ImagePlus, Send, Tag, Type, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCreateMading } from '../../hooks/use-manage-mading-hook/use-mading.hooks';
import { FrontMadingImplRepository } from '../../../../../data/repositories/mading/admin/front-manage-mading-impl-repository/front-mading-impl.repository';
import { FrontCreateMadingUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-add-mading/front-create-mading.usecse';
import Swal from 'sweetalert2';
import '../../css/tambah-mading.style.css'

const frontMadingImplRepository = new FrontMadingImplRepository();
const frontMadingUseCase = new FrontCreateMadingUseCase(frontMadingImplRepository);

export const TambahMading: React.FC = () => {
  const { executeCreateMadingHook, loading } = useCreateMading(frontMadingUseCase);

  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    isi: '',
    gambar: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire('File Terlalu Besar', 'Maksimal ukuran gambar adalah 2MB', 'warning');
        return;
      }
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, gambar: file }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gambar) {
      Swal.fire('Gambar Kosong', 'Silakan unggah poster mading terlebih dahulu', 'error');
      return;
    }

    const dataPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) dataPayload.append(key, value);
    });

    executeCreateMadingHook(dataPayload);

    setFormData({
      judul: '',
      kategori: '',
      isi: '',
      gambar: null,
    });
    setPreview(null)
  };

  return (
    <div className="p-4" style={{ backgroundColor: '#fbfbfb', minHeight: '100vh' }}>
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.5px' }}>
            Buat Informasi Baru
          </h3>
          <p className="text-muted mb-0">Lengkapi detail di bawah untuk mempublikasikan berita sekolah.</p>
        </div>
        <Link to="/admin/kelola-mading" className="btn btn-light rounded-3 px-3 fw-semibold text-secondary border-0">
          <X size={18} className="me-1" /> Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* KIRI: EDITOR AREA */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h6 className="fw-bold mb-0">Konten Utama</h6>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted" style={{ fontSize: '11px' }}>
                    Judul Mading
                  </label>
                  <div className="input-group custom-input-group">
                    <span className="input-group-text bg-light border-0">
                      <Type size={18} />
                    </span>
                    <input name="judul" value={formData.judul} onChange={handleChange} type="text" className="form-control bg-light border-0 py-2-5" placeholder="Contoh: Juara 1 Lomba LKS Nasional..." required />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted" style={{ fontSize: '11px' }}>
                    Kategori Informasi
                  </label>
                  <div className="input-group custom-input-group">
                    <span className="input-group-text bg-light border-0">
                      <Tag size={18} />
                    </span>
                    <select name="kategori" value={formData.kategori} onChange={handleChange} className="form-select bg-light border-0 py-2-5" required>
                      <option value="" disabled>
                        Pilih kategori...
                      </option>
                      <option value="prestasi">Prestasi</option>
                      <option value="info_umum">Info Umum</option>
                      <option value="agenda">Agenda</option>
                      <option value="prakerin">Prakerin</option>
                      <option value="keagamaan">Keagamaan</option>
                      <option value="karir">Karir</option>
                      <option value="karya_siswa">Karya Siswa</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase text-muted" style={{ fontSize: '11px' }}>
                    Isi Berita
                  </label>
                  <div className="input-group custom-input-group">
                    <span className="input-group-text bg-light border-0 align-items-start pt-3">
                      <AlignLeft size={18} />
                    </span>
                    <textarea
                      name="isi"
                      value={formData.isi}
                      onChange={handleChange}
                      className="form-control bg-light border-0 py-3"
                      rows={10}
                      placeholder="Tuliskan detail informasi di sini secara lengkap..."
                      style={{ resize: 'none' }}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: MEDIA AREA */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <label className="form-label fw-bold small text-uppercase text-muted mb-3" style={{ fontSize: '11px' }}>
                  Media / Poster
                </label>

                <div className="upload-zone position-relative rounded-4 overflow-hidden mb-3">
                  {preview ? (
                    <div className="preview-container position-relative">
                      <img src={preview} className="w-100 object-fit-cover shadow-sm" style={{ height: '350px' }} alt="Preview" />
                      <div className="overlay-change d-flex align-items-center justify-content-center">
                        <span className="text-white fw-bold bg-dark bg-opacity-50 px-3 py-2 rounded-pill">Ganti Gambar</span>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-upload text-center py-5 bg-light border-2 border-dashed rounded-4">
                      <div className="icon-circle bg-white shadow-sm mb-3 mx-auto">
                        <ImagePlus size={30} className="text-success" />
                      </div>
                      <h6 className="fw-bold mb-1">Unggah Poster</h6>
                      <p className="text-muted small">Format: JPG, PNG, WEBP (Maks 2MB)</p>
                    </div>
                  )}
                  <input type="file" onChange={handleFileChange} className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" accept="image/*" />
                </div>

                <div className="alert border-0 bg-success-subtle rounded-3 d-flex gap-3 mb-0">
                  <AlertCircle size={20} className="text-success mt-1" />
                  <div className="small text-success">
                    <strong className="d-block mb-1">Tips Publikasi:</strong>
                    Pastikan informasi yang kamu tulis sudah sesuai dengan pedoman sekolah. Gunakan gambar berkualitas tinggi agar mading terlihat profesional.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 py-3 rounded-4 shadow-lg border-0 d-flex align-items-center justify-content-center gap-2 transition-all hover-scale"
              style={{ backgroundColor: '#006d32', color: '#fff' }}
            >
              {loading ? <span className="spinner-border spinner-border-sm"></span> : <Send size={20} />}
              <span className="fw-bold">{loading ? 'Sedang Memproses...' : 'Publikasikan Sekarang'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
