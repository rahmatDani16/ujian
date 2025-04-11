import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendaftarList = () => {
  const [pendaftar, setPendaftar] = useState([]);

  useEffect(() => {
    getPendaftar();
  }, []);

  const getPendaftar = async () => {
    try {
      const res = await axios.get('https://dani.rikpetik.site/api/v1/pendaftar');
      setPendaftar(res.data);
    } catch (err) {
      console.error("Gagal mengambil data pendaftar:", err);
    }
  };

  const deletePendaftar = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://dani.rikpetik.site/api/v1/pendaftar/${id}`);
      if (res.status === 204) {
        setPendaftar(prevPendaftar => prevPendaftar.filter(p => p.id !== id));
        alert("Data berhasil dihapus!");
      }
    } catch (err) {
      console.error("Gagal menghapus data:", err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div className="container mt-5">
      <style>
        {`
          .table-row-inactive {
            opacity: 0.6;
            transition: all 0.3s ease;
            backdrop-filter: blur(1px);
          }
          .table-row-inactive:hover {
            opacity: 0.85;
            transform: scale(1.01);
          }
        `}
      </style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{
          color: "#2c3e50",
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Daftar Pendaftar
        </h2>
        <Link to="/pendaftar/tambah" className="btn btn-warning fw-bold shadow-sm">
          + Tambah
        </Link>
      </div>

      {pendaftar.length > 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          overflowX: 'auto'
        }}>
          <table className="table table-hover align-middle">
            <thead style={{ backgroundColor: '#f8f9fa', color: '#2c3e50' }}>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Alamat</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody style={{ color: '#2c3e50' }}>
              {pendaftar.map((p, index) => (
                <tr key={p.id} className={p.status !== 'aktif' ? 'table-row-inactive' : ''}>
                  <td>{index + 1}</td>
                  <td>{p.nama}</td>
                  <td>{p.email}</td>
                  <td>{p.alamat}</td>
                  <td>
                    <span className={`badge ${p.status === 'aktif' ? 'bg-success' : 'bg-secondary'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/pendaftar/edit/${p.id}`} className="btn btn-sm btn-outline-primary">
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePendaftar(p.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted mt-4">Belum ada data pendaftar.</p>
      )}
    </div>
  );
};

export default PendaftarList;
