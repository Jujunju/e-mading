import React, { useEffect } from 'react';
import { Clock, MessageSquare, Calendar, ChevronRight, User, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

// IMPORT CLEAN ARCHITECTURE KAMU
import { FrontStudentImplRepository} from '../../../../../data/repositories/mading/admin/front-manage-student-impl-repository/front-student-impl.repository';
import { FrontGetStudentByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-get-student-by-id.usecase';
import { useGetStudentById } from '../../../admin/hooks/use-manage-student-hook/use-student.hook';

import { AdminFrontCommentImplRepository } from '../../../../../data/repositories/mading/admin/front-manage-comment-impl-repository/front-comment-impl.repository';
import { FrontGetDetailCommentUseCase } from '../../../../../core/usecases/mading/admin/front-manage-comment/front-get-detail-comment.usecase';
import { useGetCommentById } from '../../../admin/hooks/use-manage-comment-hook/use-comment.hooks';

// Inisialisasi
const repoStudent = new FrontStudentImplRepository();
const repoComment = new AdminFrontCommentImplRepository();
const getStudentUseCase = new FrontGetStudentByIdUseCase(repoStudent);
const getCommentUseCase = new FrontGetDetailCommentUseCase(repoComment);

export const MyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { executeGetStudentByIdHook, data: studentData } = useGetStudentById(getStudentUseCase);
  const { executeGetCommentByIdHook, data: commentsData } = useGetCommentById(getCommentUseCase);

  useEffect(() => {
    if (id) {
      executeGetStudentByIdHook(id);
      executeGetCommentByIdHook(id);
    }
  }, [id]);

  // Fallback data jika sedang loading
  const student = {
    fullName: studentData?.fullName || 'Memuat...',
    username: studentData?.username || '...',
    class: `${studentData?.kelas || ''} ${studentData?.jurusan || ''}`,
    joinedDate: studentData?.createdAt ? new Date(studentData.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : '-',
    totalComments: commentsData?.length || 0,
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <Navbar />
      <div className="container px-4 shadow-lg py-3 rounded-4 bg-white" style={{ maxWidth: '800px', marginTop: '120px', border: '1px solid #f1f5f9' }}>
        {/* TOMBOL KEMBALI */}
        <div className="mb-4">
          <Link to="/e-mading" className="btn btn-light border-0 shadow-sm rounded-pill px-3 d-flex align-items-center gap-2 text-success" style={{ width: 'fit-content' }}>
            <ChevronLeft size={18} /> <span className="fw-medium">Kembali</span>
          </Link>
        </div>

        {/* HEADER PROFILE */}
        <div className="d-flex align-items-center gap-4 mb-5 pb-4 border-bottom">
          <img src={`https://ui-avatars.com/api/?name=${student.fullName}&background=006d32&color=fff&bold=true&size=128`} className="rounded-circle shadow-sm" width="80" height="80" alt="avatar" />
          <div>
            <h3 className="fw-bolder mb-1 text-dark">{student.fullName}</h3>
            <div className="d-flex align-items-center gap-3 text-muted small">
              <span className="d-flex align-items-center gap-1">
                <User size={14} className="text-success" /> {student.class}
              </span>
              <span className="d-flex align-items-center gap-1 text-success fw-bold">@{student.username}</span>
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="row g-3 mb-5">
          <div className="col-md-6">
            <StatsCard label="Total Kontribusi" value={`${student.totalComments} Komentar`} icon={<MessageSquare size={20} />} />
          </div>
          <div className="col-md-6">
            <StatsCard label="Terdaftar Sejak" value={student.joinedDate} icon={<Calendar size={20} />} />
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="activity-section">
          <div className="d-flex align-items-center gap-2 mb-4">
            <Clock size={16} className="text-muted" />
            <h6 className="fw-bold text-uppercase mb-0" style={{ letterSpacing: '1px', fontSize: '12px', color: '#64748b' }}>
              Aktivitas Terbaru
            </h6>
          </div>

          <div className="list-group list-group-flush">
            {commentsData && commentsData.length > 0 ? (
              commentsData.map((comment) => (
                <div key={comment.id} className="list-group-item px-0 py-3 border-0 border-bottom d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></div>
                    <div>
                      <p className="mb-0 text-dark" style={{ fontSize: '15px' }}>
                        Menulis komentar di mading <span className="fw-bold text-success">"{comment.judul}"</span>
                      </p>
                      <p className="mb-1 text-muted small italic">"{comment.isiKomentar}"</p>
                      <small className="text-muted" style={{ fontSize: '11px' }}>
                        {new Date(comment.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted opacity-50" />
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted small">Belum ada aktivitas komentar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Helper Stats
const StatsCard = ({ label, value, icon }: { label: string; value: string; icon: any }) => (
  <div className="p-4 rounded-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #edf2f7' }}>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <p className="text-muted small mb-1">{label}</p>
        <h4 className="fw-bold mb-0 text-dark">{value}</h4>
      </div>
      <div className="bg-white p-2 rounded-3 shadow-sm text-success">{icon}</div>
    </div>
  </div>
);
