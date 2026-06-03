import { AlertCircle, AlignLeft, ImagePlus, Send, Tag, Type, X } from 'lucide-react';
import React, { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetMadingById, useEditMadingById } from '../../hooks/use-manage-mading-hook/use-mading.hooks';
import Swal from 'sweetalert2';
import '../../css/edit-mading.style.css';
import { editMadingByIdUC, getMadingByIdUC } from '../../../../../di/manage-mading/admin/admin-mading-container';

export const EditMading: React.FC = () => {
  const { id } = useParams();
  const { executeGetMadingByIdHook, data, loading: loadMading } = useGetMadingById(getMadingByIdUC);
  const { executeEditMadingByIdHook, loading } = useEditMadingById(editMadingByIdUC);

  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    isi: '',
    gambar: null as File | null | string,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loadedMading, setLoadedMading] = useState(false);

  useEffect(() => {
    if (id) executeGetMadingByIdHook(id);
  }, [id]);

  if (data && !loadedMading) {
    setFormData({
      judul: data.judul || '',
      kategori: data.kategori || '',
      isi: data.isi || '',
      gambar: data.gambar || null,
    });
    setLoadedMading(true);
  }

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.gambar) {
      Swal.fire('Gambar Kosong', 'Gambar tidak boleh kosong', 'error');
      return;
    }

    if(id) {
      executeEditMadingByIdHook(id, formData);
    }

    if (loadMading) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border text-success mb-3" role="status"></div>
          <p className="text-muted fw-medium">Mengambil data mading...</p>
        </div>
      );
    }
  };
  return (
    <div className="p-4" style={{ backgroundColor: '#fbfbfb', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.5px' }}>
            Edit Informasi
          </h3>
          <p className="text-muted mb-0">Perbarui detail informasi mading digital Anda.</p>
        </div>
        <Link to="/admin/kelola-mading" className="btn btn-light rounded-3 px-3 fw-semibold text-secondary border-0">
          <X size={18} className="me-1" /> Batal
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
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
                    <input name="judul" value={formData.judul} onChange={handleChange} type="text" className="form-control bg-light border-0 py-2-5" placeholder="Masukkan judul baru..." required />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted" style={{ fontSize: '11px' }}>
                    Kategori
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
                    Isi Informasi
                  </label>
                  <div className="input-group custom-input-group">
                    <span className="input-group-text bg-light border-0 align-items-start pt-3">
                      <AlignLeft size={18} />
                    </span>
                    <textarea name="isi" value={formData.isi} onChange={handleChange} className="form-control bg-light border-0 py-3" rows={10} placeholder="Tuliskan isi berita terbaru..." style={{ resize: 'none' }} required></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <label className="form-label fw-bold small text-uppercase text-muted mb-3" style={{ fontSize: '11px' }}>
                  Media / Poster
                </label>

                <div className="upload-zone position-relative rounded-4 overflow-hidden mb-3">
                  <div className="preview-container position-relative">
                    <img src={preview || `http://localhost:8080/uploads/${data?.gambar}`} className="w-100 object-fit-cover shadow-sm" style={{ height: '350px' }} alt="Preview" />
                    <div className="overlay-change d-flex flex-column align-items-center justify-content-center">
                      <ImagePlus size={32} className="text-white mb-2" />
                      <span className="text-white fw-bold bg-dark bg-opacity-50 px-3 py-2 rounded-pill small">Ganti Gambar</span>
                    </div>
                  </div>
                  <input type="file" onChange={handleFileChange} name="gambar" className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" accept="image/*" />
                </div>

                <div className="alert border-0 bg-success-subtle rounded-3 d-flex gap-3 mb-0">
                  <AlertCircle size={20} className="text-success mt-1" />
                  <div className="small text-success">
                    <strong className="d-block mb-1">Catatan:</strong>
                    Jika gambar tidak diganti, sistem akan tetap menggunakan poster lama. Pastikan perubahan judul dan isi sudah benar sebelum disimpan.
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
              <span className="fw-bold">{loading ? 'Sedang Memperbarui...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
