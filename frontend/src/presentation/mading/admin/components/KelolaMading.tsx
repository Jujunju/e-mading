import { Pencil, Plus, Search, Trash2, ChevronLeft, ChevronRight, Filter, Calendar, Info } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteAllMading, useGetMading, useDeleteMadingById } from '../hooks/use-manage-mading-hook/use-mading.hooks';
import { FrontMadingImplRepository } from '../../../../data/repositories/mading/admin/front-manage-mading-impl-repository/front-mading-impl.repository';
import { FrontGetMadingUseCase } from '../../../../core/usecases/mading/admin/front-manage-mading/front-mading.usecase';
import Swal from 'sweetalert2';
import { FrontDeleteAllMadingUseCase } from '../../../../core/usecases/mading/admin/front-manage-mading/front-delete-all-mading.usecase';
import '../css/kelola-mading.style.css';
import { FrontDeleteMadingByIdUsecase } from '../../../../core/usecases/mading/admin/front-manage-mading/front-delete-mading-by-id.usecase';
import '../css/kelola-mading.style.css';

const madingRepo = new FrontMadingImplRepository();
const getMadingUseCase = new FrontGetMadingUseCase(madingRepo);
const deleteMadingByIdUseCase = new FrontDeleteMadingByIdUsecase(madingRepo);
const deleteAllMadingUseCase = new FrontDeleteAllMadingUseCase(madingRepo);

const kategoriColors: Record<string, string> = {
  prestasi: '#ffae00',
  info_umum: '#007bff',
  agenda: '#ff4757',
  prakerin: '#2ed573',
  karir: '#a4b0be',
  default: '#006d32',
};

export const KelolaMading: React.FC = () => {
  const { executeGetMadingHook, data, loading: loadMading } = useGetMading(getMadingUseCase);
  const { executeDeleteAllMadingHook } = useDeleteAllMading(deleteAllMadingUseCase);
  const { executeDeleteMadingByIdHook } = useDeleteMadingById(deleteMadingByIdUseCase);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    executeGetMadingHook();
  }, []);

  const filteredData = useMemo(() => {
    return (
      data?.filter((item) => {
        const cocokJudul = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
        const cocokKategori = selectedKategori === '' || item.kategori.toLowerCase() === selectedKategori.toLowerCase();
        return cocokJudul && cocokKategori;
      }) || []
    );
  }, [data, searchTerm, selectedKategori]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
      setSelectedIds(filteredData.map((item) => item.id));
    }
  };

  const handleBulkDelete = async () => {
    const result = await Swal.fire({
      title: 'Hapus Terpilih?',
      text: `Anda akan menghapus ${selectedIds.length} artikel sekaligus.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus Semua',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      await executeDeleteAllMadingHook(selectedIds);
      setSelectedIds([]);
      await executeGetMadingHook();
      Swal.fire('Terhapus!', 'Data berhasil dibersihkan.', 'success');
    }
  };

  const handleDeleteById = async (id: string, judul: string) => {
    const result = await Swal.fire({
      title: 'Hapus Terpilih?',
      text: `Anda akan menghapus artikel ${judul}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      await executeDeleteMadingByIdHook(id);
      await executeGetMadingHook();
      Swal.fire('Terhapus!', 'Data berhasil dibersihkan.', 'success');
    }
  };

  if (loadMading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-grow text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="text-muted fw-bold">Sinkronisasi Basis Data...</p>
      </div>
    );
  }

  return (
    <div className="p-3 p-md-4 animate__animated animate__fadeIn" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. TOP BAR: Title & Action */}

      <div className="header-content col-12 col-sm-8 text-sm-center text-md-start col-md-12 mx-sm-auto d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-1px' }}>
            Kelola Mading
          </h3>
          <p className="text-muted small mb-0">Manajemen konten informasi dan pengumuman sekolah.</p>
        </div>
        <Link to="tambah-mading" className="btn btn-success py-2 px-4 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 border-0 fw-bold" style={{ backgroundColor: '#006d32' }}>
          <Plus size={20} /> Tambah Konten
        </Link>
      </div>

      <div className="col-sm-10 col-md-12 mx-auto card border-0 shadow-sm rounded-4 mb-4 ">
        <div className="card-body p-3 p-md-4">
          <div className="row g-3">
            <div className="col-12 col-md-12">
              <div className="input-group bg-light border-0 rounded-3 px-2">
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <Search size={18} />
                </span>
                <input type="text" className="form-control border-0 bg-transparent py-2 shadow-none" placeholder="Cari judul artikel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="input-group bg-light border-0 rounded-3 px-2">
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <Filter size={18} />
                </span>
                <select className="form-select bg-transparent border-0 py-2 shadow-none fw-medium text-muted" onChange={(e) => setSelectedKategori(e.target.value)}>
                  <option value="">Semua Kategori</option>
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
            <div className="col-12 col-md-5 d-flex gap-2">
              <button onClick={handleSelectAll} className={`btn w-100 py-2 rounded-3 fw-bold border ${selectedIds.length > 0 ? 'btn-success border-0 text-white' : 'btn-white bg-white'}`}>
                {selectedIds.length > 0 ? 'Lepas Semua' : 'Pilih Semua'}
              </button>
              {selectedIds.length > 0 && (
                <button onClick={handleBulkDelete} className="btn btn-danger w-100 py-2 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm">
                  <Trash2 size={16} /> Hapus ({selectedIds.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto card border-0 shadow-sm rounded-4 overflow-hidden mb-4  py-3">
        <div className="table-container">
          <table className="table align-middle mb-0 custom-responsive-table">
            <thead className="bg-light d-none d-xl-table-header-group">
              <tr>
                <th className="ps-4 py-3" style={{ width: '50px' }}>
                  #
                </th>
                <th className="py-3 text-muted small fw-bold text-uppercase">Informasi Konten</th>
                <th className="py-3 text-muted small fw-bold text-uppercase text-center">Kategori</th>
                <th className="py-3 text-muted small fw-bold text-uppercase text-center">Tgl Rilis</th>
                <th className="pe-4 py-3 text-end text-muted small fw-bold text-uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="responsive-tbody">
              {currentItems.length > 0 ? (
                currentItems.map((d) => (
                  <tr key={d.id} className={`responsive-row ${selectedIds.includes(d.id) ? 'is-selected' : ''}`}>
                    <td className="td-check ps-lg-4">
                      <div className="form-check custom-checkbox">
                        <input type="checkbox" className="form-check-input shadow-none cursor-pointer" checked={selectedIds.includes(d.id)} onChange={() => toggleSelect(d.id)} />
                        <span className="mobile-label d-lg-none">PILIH ARTIKEL</span>
                      </div>
                    </td>

                    <td className="td-content">
                      <div className="d-flex align-items-center gap-3">
                        <img src={`http://localhost:8080/uploads/${d.gambar}`} className="img-thumb rounded-3 shadow-sm border" alt="mading" />
                        <div className="overflow-hidden">
                          <h6 className="mb-0 fw-bold text-dark ">{d.judul}</h6>
                        </div>
                      </div>
                    </td>

                    <td className="td-kategori text-lg-center">
                      <span className="mobile-label d-lg-none">KATEGORI</span>
                      <span
                        className="badge rounded-pill fw-bold"
                        style={{
                          backgroundColor: `${kategoriColors[d.kategori.toLowerCase()] || kategoriColors.default}15`,
                          color: kategoriColors[d.kategori.toLowerCase()] || kategoriColors.default,
                          fontSize: '10px',
                          padding: '6px 12px',
                        }}
                      >
                        ● {d.kategori.toUpperCase()}
                      </span>
                    </td>

                    <td className="td-date text-lg-center">
                      <span className="mobile-label d-lg-none">TGL PUBLIKASI</span>
                      <div className="d-flex align-items-center justify-content-lg-center gap-2 text-muted small">
                        <Calendar size={13} />
                        {new Date(d.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>

                    <td className="td-action pe-lg-4 text-lg-end">
                      <div className="action-wrapper">
                        <Link to={`edit-mading/${d.id}`} className="btn-action edit">
                          <Pencil size={15} /> <span>Edit</span>
                        </Link>
                        <button className="btn-action delete" onClick={() => handleDeleteById(d.id, d.judul)}>
                          <Trash2 size={15} /> <span>Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-5 text-center text-muted">
                    <Info size={40} className="mb-2 opacity-25" />
                    <p className="mb-0">Data tidak ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredData.length > 0 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 bg-white p-3 rounded-4 shadow-sm border">
          <span className="text-muted small">
            Menampilkan <b>{currentItems.length}</b> dari <b>{filteredData.length}</b> artikel
          </span>
          <nav>
            <ul className="pagination mb-0 gap-2">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link rounded-circle border-0 shadow-sm" onClick={() => setCurrentPage((prev) => prev - 1)}>
                  <ChevronLeft size={16} />
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link rounded-circle border-0 shadow-sm fw-bold" style={currentPage === i + 1 ? { backgroundColor: '#006d32', color: 'white' } : { color: '#006d32' }} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link rounded-circle border-0 shadow-sm" onClick={() => setCurrentPage((prev) => prev + 1)}>
                  <ChevronRight size={16} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
