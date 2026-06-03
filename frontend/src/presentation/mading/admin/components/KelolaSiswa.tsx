import { Search, Trash2, UserRound, ChevronLeft, ChevronRight, Filter, User } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../css/kelola-siswa.style.css';

import { useDeleteAllStudent, useDeleteStudent, useGetStudent } from '../hooks/use-manage-student-hook/use-student.hook';
import { deleteAllStudentUC, deleteStudentUC, getStudentsUC } from '../../../../di/manage-student/student-container';

export const KelolaSiswa: React.FC = () => {
  const { executeStudentHook, data: dataStudent, loading } = useGetStudent(getStudentsUC);
  const { executeDeleteStudentHook } = useDeleteStudent(deleteStudentUC);
  const { executeDeleteAllStudentHook } = useDeleteAllStudent(deleteAllStudentUC);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategoriKelas, setSelectedKategoriKelas] = useState('');
  const [selectedKategoriJurusan, setSelectedKategoriJurusan] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    executeStudentHook();
  }, []);

  const filteredData = useMemo(() => {
    return (
      dataStudent?.filter((e) => {
        const search = e.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const selectkategoriKelas = selectedKategoriKelas === '' || e.kelas?.toLowerCase() == selectedKategoriKelas.toLowerCase();
        const selectkategoriJurusan = selectedKategoriJurusan === '' || e.jurusan?.toLowerCase() == selectedKategoriJurusan.toLowerCase();

        return search && e.role !== 'admin' && selectkategoriKelas && selectkategoriJurusan;
      }) || []
    );
  }, [dataStudent, searchTerm, selectedKategoriJurusan, selectedKategoriKelas]);

  const totalPages = useMemo(() => {
    return Math.ceil((dataStudent || []).length / itemsPerPage);
  }, [filteredData, itemsPerPage, dataStudent]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length && filteredData.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((e) => e.id));
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleBulkDelete = async () => {
    const result = await Swal.fire({
      title: 'Hapus Terpilih?',
      text: `Anda akan menghapus ${selectedIds.length} akun sekaligus.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus Semua',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      await executeDeleteAllStudentHook(selectedIds);
      setSelectedIds([]);
      await executeStudentHook();
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data berhasil dibersihkan.',
        icon: 'success',
        draggable: true,
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'Hapus Siswa?',
      text: `Akun ${name} akan dihapus secara permanen.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      await executeDeleteStudentHook(id);
      await executeStudentHook();
      await Swal.fire('Berhasil', 'Siswa telah dihapus.', 'success');
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-grow text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="mt-3 text-muted">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="p-3 p-md-4">
      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-12 col-lg-6 text-sm-center text-md-center text-lg-start text-md-start">
          <h4 className="fw-bold text-dark mb-1">Info Siswa yang Terdaftar</h4>
          <p className="text-muted small mb-0">Total: {filteredData?.length} akun terdaftar</p>
        </div>
        <div className="col-sm-10 col-md-8 col-lg-12 mx-auto card border-0 shadow-sm rounded-4 mb-4 ">
          <div className="card-body p-3 p-md-4">
            <div className="row g-3">
              <div className="col-12 col-md-12">
                <div className="input-group bg-light border-0 rounded-3 px-2">
                  <span className="input-group-text bg-transparent border-0 text-muted">
                    <Search size={18} />
                  </span>
                  <input type="text" className="form-control border-0 bg-transparent py-2 shadow-none" placeholder="Cari berdasarkan nama atau username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="input-group bg-light border-0 rounded-3 px-2">
                  <span className="input-group-text bg-transparent border-0 text-muted">
                    <Filter size={18} />
                  </span>
                  <select className="form-select bg-transparent border-0 py-2 shadow-none fw-medium text-muted" value={selectedKategoriKelas} onChange={(e) => setSelectedKategoriKelas(e.target.value)}>
                    <option value="">Kelas</option>
                    <option value="x">X</option>
                    <option value="xi">XI</option>
                    <option value="xii">XII</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="input-group bg-light border-0 rounded-3 px-2">
                  <span className="input-group-text bg-transparent border-0 text-muted">
                    <Filter size={18} />
                  </span>
                  <select className="form-select bg-transparent border-0 py-2 shadow-none fw-medium text-muted" value={selectedKategoriJurusan} onChange={(e) => setSelectedKategoriJurusan(e.target.value)}>
                    <option value="">Jurusan</option>
                    <option value="dkv">DKV</option>
                    <option value="pplg">PPLG</option>
                    <option value="tjkt">TJKT</option>
                    <option value="mplb">MPLB</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4 d-flex gap-2">
                <button className={`btn w-100 py-2 rounded-3 fw-bold border ${selectedIds.length > 0 ? 'btn-success border-0 text-white' : 'btn-white bg-white'}`} onClick={handleSelectAll}>
                  {selectedIds.length > 0 ? 'Lepas Semua' : 'Pilih Semua'}
                </button>
                {selectedIds.length > 0 && (
                  <button className="btn btn-danger w-100 py-2 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm" onClick={handleBulkDelete}>
                    <Trash2 size={16} /> Hapus ({selectedIds.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8 mx-sm-auto col-lg-12 card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0 custom-table">
            <thead className="bg-light d-none d-md-table-header-group">
              <tr>
                <th className="text-muted small fw-bold uppercase ">#</th>
                <th className="ps-2 py-3 text-muted small fw-bold uppercase">Siswa</th>
                <th className="py-3 text-muted small fw-bold uppercase">Kelas & Jurusan</th>
                <th className="py-3 text-muted small fw-bold uppercase">Role</th>
                <th className="py-3 text-muted small fw-bold uppercase text-center">Bergabung</th>
                <th className="pe-4 py-3 text-end text-muted small fw-bold uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {currentItems.length > 0 ? (
                currentItems.map((s) => (
                  <tr key={s.id} className={`responsive-row ${selectedIds.includes(s.id) ? 'is-selected' : ''}`}>
                    <td className="td-check ps-lg-4">
                      <div className="form-check custom-checkbox">
                        <input type="checkbox" className="form-check-input shadow-none cursor-pointer" checked={selectedIds.includes(s.id)} onChange={() => toggleSelect(s.id)} />
                        <span className="mobile-label d-lg-none">PILIH SISWA</span>
                      </div>
                    </td>
                    <td className=" border-0">
                      <div className="d-flex align-items-center gap-3">
                        <img src={`https://ui-avatars.com/api/?name=${s.fullName}&background=006d32&color=fff&bold=true`} alt="avatar" className="rounded-circle shadow-sm flex-shrink-0" width="45" height="45" />
                        <div className="text-truncate">
                          <span className="fw-bold text-dark d-block mb-0">{s.fullName}</span>
                          <span className="text-muted d-flex align-items-center gap-1 extra-small">
                            <UserRound size={12} /> {s.username}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className=" py-md-3 border-0">
                      <div className="mobile-label d-md-none">ROLE</div>
                      <div className="" style={{ color: '#57606d' }}>
                        <span className="badge text-bg-success fw-semibold small me-2">{s.role}</span>
                      </div>
                    </td>
                    <td className=" py-md-3 border-0">
                      <div className="mobile-label d-md-none">KELAS & JURUSAN</div>
                      <div className="info-kelas-jurusan d-flex flex-row" style={{ color: '#57606d' }}>
                        <span className="fw-semibold small me-2">{s.kelas}</span>
                        <span className="fw-medium" style={{ fontSize: '14px' }}>
                          {s.jurusan}
                        </span>
                      </div>
                    </td>
                    <td className="py-md-3 border-0 text-md-center">
                      <div className="mobile-label d-md-none">TANGGAL BERGABUNG</div>
                      <span className="text-muted small">
                        {new Date(s.createdAt as string).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="pe-md-4 border-0 text-md-end action-cell ">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <Link to={`/admin/data-siswa/detail-account/${s.id}`} className="btn-detail-mini rounded-3 p-2 d-flex align-items-center justify-content-center w-100 w-md-auto ">
                          <User size={20} className="me-2" />
                        </Link>
                        <button className="btn-delete-mini rounded-3 p-2 d-flex align-items-center justify-content-center w-100 w-md-auto" onClick={() => handleDelete(s.id, s.fullName!)}>
                          <Trash2 size={16} className="me-2 d-md-none" />
                          <span className="d-md-none fw-bold">Hapus Akun</span>
                          <Trash2 size={16} className="d-none d-md-block" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-5 text-center text-muted">
                    <UserRound size={40} className="mb-2 opacity-25" />
                    <p className="mb-0">Tidak ada data siswa.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(dataStudent || []).length > itemsPerPage && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 bg-white p-3 rounded-4 shadow-sm border">
          <p className="text-muted small mb-0">
            Menampilkan <b>{currentItems.length}</b> sampai <b>{filteredData.length}</b> dari <b>{dataStudent?.length}</b> siswa
          </p>
          <nav>
            <ul className="pagination mb-0 gap-2">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link rounded-3 border-0 shadow-sm d-flex align-items-center justify-content-center" onClick={() => paginate(currentPage - 1)} style={{ width: '36px', height: '36px' }}>
                  <ChevronLeft size={18} />
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link rounded-3 border-0 shadow-sm fw-bold d-flex align-items-center justify-content-center"
                    onClick={() => paginate(index + 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: currentPage === index + 1 ? '#006d32' : '#fff',
                      color: currentPage === index + 1 ? '#fff' : '#006d32',
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link rounded-3 border-0 shadow-sm d-flex align-items-center justify-content-center" onClick={() => paginate(currentPage + 1)} style={{ width: '36px', height: '36px' }}>
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
