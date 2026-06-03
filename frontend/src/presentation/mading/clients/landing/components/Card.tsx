import React, { useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetMading } from '../../../admin/hooks/use-manage-mading-hook/use-mading.hooks';
import '../css/card.style.css';
import { getMadingUC } from '../../../../../di/manage-mading/admin/admin-mading-container';

export const Card: React.FC = () => {
  const { executeGetMadingHook, data: dataMading, loading } = useGetMading(getMadingUC);

  useEffect(() => {
    executeGetMadingHook();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-grow text-success" role="status"></div>
      </div>
    );

  return (
    <div className="container py-5" id="berita-terbaru">
      <div className="text-center mb-5 pt-5">
        <h2 className="fw-bold h1" style={{ color: '#0f172a', letterSpacing: '-1px' }}>
          E-Mading Terkini
        </h2>
        <p className="text-muted">Sumber informasi resmi dan pengumuman terbaru SMK secara terpadu.</p>
      </div>

      <div className="row g-4">
        {(dataMading || [])?.length > 0 ? (
          dataMading?.map((e) => (
            <div key={e.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 mading-card-premium">
                <div className="position-relative overflow-hidden img-container">
                  <img src={`http://localhost:8080/uploads/${e.gambar}`} className="w-100 h-100 object-fit-cover mading-img" alt={e.judul} />
                  <div className="mading-badge">{e.kategori}</div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mb-2 text-muted small fw-medium">
                    <Calendar size={14} className="text-success" />
                    <span>{new Date(e.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                  </div>

                  <h5 className="mading-card-title mb-3">{e.judul}</h5>

                  <p className="text-secondary small mading-excerpt mb-4">{e.isi}</p>

                  <div className="mt-auto pt-3 border-top border-light">
                    <Link to={`/e-mading/detail-mading/${e.slug}`} className="btn-mading-link">
                      Baca Selengkapnya <ArrowRight size={18} className="arrow-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <p>Belum ada informasi yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </div>
  );
};
