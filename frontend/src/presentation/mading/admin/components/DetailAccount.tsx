import React, { useEffect } from 'react';
import { Calendar, MessageSquare, Clock, User, ShieldCheck, BookOpen, GraduationCap, Hash, Layout, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { FrontStudentImplRepository } from '../../../../data/repositories/mading/admin/front-manage-student-impl-repository/front-student-impl.repository';
import { FrontGetStudentByIdUseCase } from '../../../../core/usecases/mading/admin/front-manage-student/front-get-student-by-id.usecase';
import { useGetStudentById } from '../hooks/use-manage-student-hook/use-student.hook';
import { FrontGetDetailCommentUseCase } from '../../../../core/usecases/mading/admin/front-manage-comment/front-get-detail-comment.usecase';
import { useGetCommentById } from '../hooks/use-manage-comment-hook/use-comment.hooks';
import { AdminFrontCommentImplRepository } from '../../../../data/repositories/mading/admin/front-manage-comment-impl-repository/front-comment-impl.repository';
import type { FrontCommentEntity } from '../../../../core/entities/front-comment.entity';


const studentRepo = new FrontStudentImplRepository();
const repoComment = new AdminFrontCommentImplRepository();
const getStudentById = new FrontGetStudentByIdUseCase(studentRepo);
const getCommentById = new FrontGetDetailCommentUseCase(repoComment);

export const DetailAccount: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  
  const { executeGetStudentByIdHook, data: dataStudent } = useGetStudentById(getStudentById);
  const { executeGetCommentByIdHook, data: dataComment } = useGetCommentById(getCommentById);

  useEffect(() => {
    if (id) {
      executeGetStudentByIdHook(id);
      executeGetCommentByIdHook(id);
    }
  }, [id]);

  const comments = dataComment || [];
  const latestComment = comments[0];

  const userDetail = {
    fullName: dataStudent?.fullName || 'Memuat...',
    username: dataStudent?.username || '-',
    role: dataStudent?.role || '-',
    kelas: dataStudent?.kelas || '-',
    jurusan: dataStudent?.jurusan || '-',
    createdAt: dataStudent?.createdAt ? new Date(dataStudent.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full' }) : '-',
  };

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        {/* HEADER */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <Link to="/admin/data-siswa/" className="btn btn-white shadow-sm rounded-circle p-2 text-success border-0">
            <ArrowLeft size={24} />
          </Link>
          <h4 className="fw-bold mb-0">Profil Pengguna</h4>
        </div>

        {/* PROFILE CARD */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div style={{ height: '180px', background: 'linear-gradient(135deg, #006d32 0%, #00a859 100%)' }}></div>
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-md-row align-items-end gap-4 mt-n5" style={{ marginTop: '-90px' }}>
              <img src={`https://ui-avatars.com/api/?name=${userDetail.fullName}&background=fff&color=006d32&bold=true&size=200`} className="rounded-circle border border-5 border-white shadow" width="150" height="150" alt="profile" />
              <div className="flex-grow-1 mb-2">
                <div className="d-flex align-items-center gap-2">
                  <h2 className="fw-bold mb-0 text-dark">{userDetail.fullName}</h2>
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <p className="text-muted fs-5 mb-0">@{userDetail.username}</p>
              </div>
              {/* <div className="d-flex gap-2 mb-2">
                <button className="btn btn-success rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2">
                  <Edit3 size={18} /> Edit Profil
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* IDENTITAS */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                <User size={20} className="text-success" /> Identitas Akun
              </h5>
              <div className="d-flex flex-column gap-3">
                <InfoItem label="Kelas" value={userDetail.kelas} icon={<BookOpen size={18} />} />
                <InfoItem label="Jurusan" value={userDetail.jurusan} icon={<GraduationCap size={18} />} />
                <InfoItem label="Role Akses" value={userDetail.role} icon={<Hash size={18} />} />
                <InfoItem label="Bergabung" value={userDetail.createdAt} icon={<Calendar size={18} />} />
              </div>
            </div>
          </div>

          {/* STATS & TIMELINE */}
          <div className="col-lg-8">
            <div className="row g-3 mb-4">
              {/* TOTAL KOMENTAR */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white h-100">
                  <div className="bg-success-subtle text-success rounded-circle p-3 mx-auto mb-2" style={{ width: 'fit-content' }}>
                    <MessageSquare size={28} />
                  </div>
                  <h3 className="fw-bold mb-0 text-dark">{comments.length}</h3>
                  <p className="text-muted small mb-0">Total Komentar</p>
                </div>
              </div>

              {/* AKTIVITAS TERAKHIR */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-center">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="bg-primary-subtle text-primary rounded-3 p-2">
                      <Clock size={20} />
                    </div>
                    <h6 className="fw-bold mb-0 text-dark">Aktivitas Terakhir</h6>
                  </div>
                  {latestComment ? (
                    <div>
                      <p className="text-muted small mb-1">Berkomentar di:</p>
                      <p className="fw-bold text-dark mb-0 text-truncate">"{latestComment.judul}"</p>
                      <small className="text-success fw-medium">{new Date(latestComment.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</small>
                    </div>
                  ) : (
                    <p className="text-muted small mb-0">Belum ada aktivitas.</p>
                  )}
                </div>
              </div>
            </div>

            {/* RIWAYAT */}
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <Layout size={20} className="text-success" />
                <h5 className="fw-bold mb-0 text-dark">Riwayat Komentar</h5>
              </div>

              <div className="timeline-container px-2">
                {comments.length > 0 ? (
                  comments.map((comment, index) => <TimelineItem key={comment.id} comment={comment} isLast={index === comments.length - 1} />)
                ) : (
                  <div className="text-center py-5">
                    <MessageSquare size={40} className="text-muted opacity-25 mb-3" />
                    <p className="text-muted">Belum pernah memberikan komentar.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .uppercase-tracking { text-transform: uppercase; letter-spacing: 1px; font-size: 11px; font-weight: 700; }
        .italic { font-style: italic; }
      `}</style>
    </div>
  );
};

// Sub-komponen kecil agar kode utama tidak terlalu panjang (Cleaner Code)
const InfoItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="info-item">
    <small className="text-muted d-block uppercase-tracking">{label}</small>
    <div className="d-flex align-items-center gap-2 text-dark mt-1">
      <span className="text-secondary">{icon}</span>
      <span className="fw-bold">{value}</span>
    </div>
  </div>
);

const TimelineItem = ({ comment, isLast }: { comment: FrontCommentEntity; isLast: boolean }) => (
  <div className="d-flex gap-3 mb-4 position-relative">
    {!isLast && <div className="position-absolute" style={{ left: '17px', top: '35px', bottom: '-25px', width: '2px', backgroundColor: '#e9ecef' }}></div>}
    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm" style={{ width: '36px', height: '36px', minWidth: '36px', zIndex: 1 }}>
      <MessageSquare size={16} />
    </div>
    <div className="flex-grow-1 border-bottom pb-3 border-light">
      <p className="mb-1 text-dark fw-medium">
        Mengomentari <span className="fw-bold text-success">"{comment.judul}"</span>
      </p>
      <p className="mb-2 text-muted italic small bg-light p-2 rounded-3" style={{ borderLeft: '3px solid #dee2e6' }}>
        "{comment.isiKomentar}"
      </p>
      <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '11px' }}>
        <Clock size={12} /> {new Date(comment.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  </div>
);
