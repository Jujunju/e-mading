import { Calendar, FileText, Trash2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDeleteComment, useGetComment } from '../hooks/use-manage-comment-hook/use-comment.hooks';
import Swal from 'sweetalert2';
import '../css/kelola-komentar.style.css';
import { deleteCommentByIdUC, getCommentsUC } from '../../../../di/manage-comment/client/comment-client-container';

export const KelolaKomentar: React.FC = () => {
  const { executeGetCommentHook, data: dataComment, loading } = useGetComment(getCommentsUC);
  const { executeDeleteCommentHook } = useDeleteComment(deleteCommentByIdUC);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    executeGetCommentHook();
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil((dataComment || []).length / itemsPerPage);
  }, [dataComment, itemsPerPage]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     return (dataComment || []).slice(indexOfFirstItem, indexOfLastItem);
  }, [dataComment,currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Komentar?',
      text: 'Komentar ini akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      await executeDeleteCommentHook(id);
      await executeGetCommentHook()
      Swal.fire('Terhapus!', 'Komentar berhasil dihapus.', 'success');
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-grow text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="mt-3 text-muted">Memuat komentar...</p>
      </div>
    );
  }

  return (
    <div className="p-3 p-md-4" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Moderasi Komentar</h4>
        <p className="text-muted small mb-0">
          Total interaksi: <b>{dataComment?.length} Komentar</b>
        </p>
      </div>

      <div className="row g-3 mb-4">
        {currentItems?.length > 0 ? (
          currentItems?.map((e) => (
            <div key={e.id} className="col-12">
              <div className="card border-0 shadow-sm rounded-4 comment-card">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${e.fullName}&background=006d32&color=fff&bold=true`} className="rounded-circle shadow-sm" width="45" height="45" alt="avatar" />
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">{e.fullName}</h6>
                        <small className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                          <Calendar size={12} />
                          {new Date(e.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </small>
                      </div>
                    </div>
                    <button className="btn-delete-mini" onClick={() => handleDelete(e.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="p-3 rounded-3 bg-light border-start border-4" style={{ borderColor: '#006d32' }}>
                      <p className="mb-0 text-dark" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "{e.isiKomentar}"
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3 pt-2 border-top border-light">
                    <FileText size={12} className="text-success" />
                    <small className="text-muted fw-bold uppercase" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                      ARTIKEL:
                    </small>
                    <span className="text-success fw-bold text-truncate" style={{ fontSize: '11px', maxWidth: '300px' }}>
                      {e.judul}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <MessageSquare size={48} className="text-muted opacity-25 mb-3" />
            <p className="text-muted">Tidak ada komentar untuk dimoderasi.</p>
          </div>
        )}
      </div>

      {(dataComment && dataComment?.length || 0) > itemsPerPage && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 bg-white p-3 rounded-4 shadow-sm border">
          <span className="text-muted small">
            Halaman <b>{currentPage}</b> dari <b>{totalPages}</b>
          </span>
          <nav>
            <ul className="pagination mb-0 gap-2">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link rounded-circle border-0 shadow-sm" onClick={() => paginate(currentPage - 1)}>
                  <ChevronLeft size={18} />
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link rounded-circle border-0 shadow-sm fw-bold"
                    onClick={() => paginate(i + 1)}
                    style={{
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: currentPage === i + 1 ? '#006d32' : '#fff',
                      color: currentPage === i + 1 ? '#fff' : '#006d32',
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link rounded-circle border-0 shadow-sm" onClick={() => paginate(currentPage + 1)}>
                  <ChevronRight size={18} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
