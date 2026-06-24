import React, { useEffect, useState } from 'react';
import { Navbar } from '../../landing/components/Navbar';
import { Pencil, Send, Trash2, Calendar, Tag, MessageCircle, Heart, Share2, ChevronLeft, MoreHorizontal, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditComment, useGetComment, useSaveComment } from '../hooks/use-user-comment/use-comment.hooks';
import '../css/detail-mading.style.css';
import { useDeleteComment } from '../../../admin/hooks/use-manage-comment-hook/use-comment.hooks';
import Swal from 'sweetalert2';
import { getMadingBySlug } from '../../../../../di/manage-mading/client/client-mading-container';
import { createCommentUC, editCommentByIdUC } from '../../../../../di/manage-comment/client/comment-client-container';
import { useGetMadingBySlug } from '../hooks/use-user-comment/use-user-mading.hooks';
import { useAuth } from '../../../../auth/hooks/use-auth.hook';
import { frontGetAllCommentUseCase, deleteCommentByIdUC } from '../../../../../di/manage-comment/comment-admin-container';

export const DetailMading: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { executeGetMadingBySlugHook, data: dataMading } = useGetMadingBySlug(getMadingBySlug);
  const { executeGetCommentHook, data: dataComment } = useGetComment(frontGetAllCommentUseCase);
  const { executeCommentHook } = useSaveComment(createCommentUC);
  const { executeEditCommentHook } = useEditComment(editCommentByIdUC);
  const { executeDeleteCommentHook } = useDeleteComment(deleteCommentByIdUC);
  const {isAuthenticated, user} = useAuth()

  const [comment, setComment] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const found = dataMading?.find((item) => item.slug === slug);

  useEffect(() => {
    if(slug) {
      executeGetMadingBySlugHook(slug);
    }
    executeGetCommentHook();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon maaf, sepertinya anda belum login? Daftar dulu yuk supaya ide kerenmu bisa tersampaikan! 🚀',
      });
      return;
    }

    if (!comment.trim()) return;

    const getId = dataMading?.find((e) => e.slug === slug);

    try {
      if (editingId) {
        await executeEditCommentHook(editingId, {
          madingId: getId?.id,
          isiKomentar: comment.trim(),
        });
        setEditingId(null);
      } else {
        await executeCommentHook({
          madingId: getId?.id,
          isiKomentar: comment.trim(),
        });
      }

      setComment('');
      executeGetCommentHook();
    } catch (error) {
      console.error('Gagal memproses komentar:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const result = await Swal.fire({
      title: 'Hapus Komentar?',
      text: 'Komentar yang dihapus tidak bisa dikembalikan loh!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      draggable: true,
    });

    if (result.isConfirmed) {
      try {
        await executeDeleteCommentHook(commentId);

        await Swal.fire({
          title: 'Terhapus!',
          text: 'Komentar kamu sudah hilang.',
          icon: 'success',
          showConfirmButton: false,
        });

        executeGetCommentHook(); 
      } catch (error) {
        Swal.fire({
          title: 'Gagal!',
          text: 'Ada masalah saat menghapus komentar.',
          icon: 'error',
        });
        console.error('Gagal menghapus komentar:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setComment('');
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <Navbar />

      <div className="container pt-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 d-flex justify-content-between align-items-center mb-4">
            <button onClick={() => navigate(-1)} className="btn btn-success border-0 shadow-sm rounded-pill px-3 d-flex align-items-center gap-2">
              <ChevronLeft size={18} /> <span className="fw-medium">Kembali</span>
            </button>
            <div className="d-flex gap-2">
              <button className="btn btn-success border-0 shadow-sm rounded-circle p-2">
                <Share2 size={18} className="text-white" />
              </button>
              <button className="btn btn-success border-0 shadow-sm rounded-circle p-2">
                <MoreHorizontal size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
              <div className="position-relative">
                <img src={found?.gambar} className="w-100" alt="cover" style={{ height: '500px', objectFit: 'cover' }} />
                <div className="image-overlay-soft" />
              </div>
              <div className="card-body p-4 p-md-5 mt-n5 position-relative bg-white mx-3 rounded-4 shadow-sm" style={{ marginTop: '-40px' }}>
                <div className="mb-4">
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold">
                    <Tag size={14} className="me-1" /> {found?.kategori}
                  </span>
                </div>
                <h1 className="display-6 fw-bold text-dark mb-3">{found?.judul}</h1>
                <div className="d-flex align-items-center gap-3 mb-5 py-3 border-bottom border-top">
                  <Calendar size={18} className="text-success" />
                  <div>
                    <small className="text-muted d-block">Diterbitkan pada</small>
                    <span className="fw-semibold text-dark">{found && new Date(found.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full' })}</span>
                  </div>
                </div>
                <div className="mading-body-text fs-5 text-secondary">
                  {found?.isi.split('\n').map((para, i) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-top">
                  <button onClick={() => setIsLiked(!isLiked)} className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 transition-all ${isLiked ? 'btn-danger text-white' : 'btn-light'}`}>
                    <Heart size={20} fill={isLiked ? 'white' : 'none'} />
                    <span className="fw-bold">{isLiked ? 'Disukai' : 'Suka'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="discussion-container mb-5 pb-5">
              <div className="d-flex align-items-center gap-2 mb-4">
                <MessageCircle className="text-success" />
                <h5 className="fw-bold mb-0">Diskusi Siswa ({dataComment?.length || 0})</h5>
              </div>

              <div className="comment-stack">
                {dataComment && dataComment.length > 0 ? (
                  dataComment.map((e) => (
                    <div key={e.id} className="comment-card mb-4">
                      <div className="d-flex gap-3">
                        <img src={`https://ui-avatars.com/api/?name=${e.fullName}&background=006d32&color=fff&bold=true`} alt="avatar" className="rounded-circle shadow-sm" width="48" height="48" />
                        <div className="flex-grow-1 bg-white p-4 rounded-4 shadow-sm border border-light">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <span className="fw-bold text-dark d-block">{e.fullName}</span>
                              <span className="text-success small fw-bold text-uppercase" style={{ fontSize: '10px' }}>
                                • {e.role}
                              </span>
                            </div>
                            <small className="text-muted">{e.createdAt}</small>
                          </div>
                          <p className="text-secondary mt-3 mb-0">{e.isiKomentar}</p>

                          {isAuthenticated && user?.user?.id === e.userId && (
                            <div className="mt-3 pt-3 border-top d-flex gap-3">
                              <button
                                onClick={() => {
                                  setEditingId(e.id);
                                  setComment(e.isiKomentar!);
                                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                }}
                                className={`btn btn-sm d-flex align-items-center gap-1 p-0 ${editingId === e.id ? 'text-primary fw-bold' : 'text-warning'}`}
                              >
                                <Pencil size={14} /> Edit
                              </button>
                              <button onClick={() => handleDeleteComment(e.id)} className="btn btn-sm text-danger d-flex align-items-center gap-1 p-0">
                                <Trash2 size={14} /> Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 bg-light rounded-4">
                    <p className="text-muted mb-0 fw-medium">Belum ada diskusi. Jadilah yang pertama!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="fixed-bottom py-4 bg-light shadow-lg border-top">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    {editingId && (
                      <div className="d-flex justify-content-between align-items-center mb-2 px-3 animate-fade-in">
                        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                          <Pencil size={12} className="me-1" /> Sedang mengubah komentar...
                        </span>
                        <button onClick={handleCancelEdit} className="btn btn-sm text-danger p-0 d-flex align-items-center gap-1 fw-bold">
                          <X size={14} /> Batal
                        </button>
                      </div>
                    )}
                    <div className="card border-0 shadow-sm rounded-pill p-1 border">
                      <div className="d-flex align-items-center px-2">
                        <textarea className="form-control border-0 text-dark shadow-none py-2 px-3" value={comment} onChange={(e) => setComment(e.target.value)} rows={1} placeholder="Tulis pendapatmu..." style={{ resize: 'none' }} />
                        <button
                          onClick={handleCommentSubmit}
                          className={`btn rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm text-white transition-all ${editingId ? 'btn-warning rotate-icon' : 'btn-success'}`}
                          style={{ width: '40px', height: '40px', minWidth: '40px' }}
                        >
                          {editingId ? <Send size={18} /> : <Send size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
