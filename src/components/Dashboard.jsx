import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../pages/layout/Layout";

const Dashboard = () => {
  const [dataUser, setDataUser] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nm_pendaftar: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    jurusan: "",
    tgl_lahir: "",
    nisn: "",
  });

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const res = await axios.get("https://dani.rikpetik.site/api/v1/pendaftar");
      const fetched = Array.isArray(res.data) ? res.data : res.data.data || [];
      setDataUser(fetched);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`https://dani.rikpetik.site/api/v1/pendaftar/${id}`);
      setFormData(res.data.data);
      setEditId(id);
      setEditMode(true);
    } catch (err) {
      console.error("Gagal ambil data untuk edit:", err);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus data?");
    if (!konfirmasi) return;
    try {
      await axios.delete(`https://dani.rikpetik.site/api/v1/pendaftar/${id}`);
      fetchDataUser();
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const namaRegex = /^[a-zA-Z\s]+$/;
    const angkaRegex = /^[0-9]+$/;

    if (!namaRegex.test(formData.nm_pendaftar)) {
      alert("Nama hanya boleh berisi huruf dan spasi.");
      return;
    }

    if (!angkaRegex.test(formData.no_hp)) {
      alert("Nomor HP hanya boleh berisi angka.");
      return;
    }

    if (!angkaRegex.test(formData.nisn)) {
      alert("NISN hanya boleh berisi angka.");
      return;
    }

    try {
      const payload = {
        ...formData,
        no_hp: formData.no_hp.toString(),
        nisn: formData.nisn.toString(),
      };
      await axios.put(`https://dani.rikpetik.site/api/v1/pendaftar/${editId}`, payload);
      alert("Data berhasil diperbarui");
      setEditMode(false);
      setEditId(null);
      setFormData({
        nm_pendaftar: "",
        alamat: "",
        jenis_kelamin: "",
        no_hp: "",
        asal_sekolah: "",
        jurusan: "",
        tgl_lahir: "",
        nisn: "",
      });
      fetchDataUser();
    } catch (err) {
      console.error("Gagal update data:", err);
    }
  };

  return (
    <Layout>
      <style>{`
        .custom-card {
          transition: all 0.5s ease;
          border-radius: 1rem;
        }
        .custom-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: scale(1.05);
        }
        .table tbody tr:hover {
          background-color: #eef2ff;
          transition: background-color 0.3s ease;
        }
        .custom-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.25);
          transition: all 0.3s ease-in-out;
        }
        .fade-in {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeIn 0.5s ease forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container py-5 fade-in">
        <h2 className="text-dark mb-4 fw-bold">Data Pendaftar</h2>

        {dataUser.length > 0 ? (
          <div className="table-responsive mb-5">
            <table className="table table-light table-striped table-bordered">
              <thead className="text-center text-dark">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>No HP</th>
                  <th>Asal Sekolah</th>
                  <th>Jurusan</th>
                  <th>Tanggal Lahir</th>
                  <th>NISN</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody className="text-dark">
                {dataUser.map((item, idx) => (
                  <tr key={item.id_pendaftar}>
                    <td className="text-center">{idx + 1}</td>
                    <td>{item.nm_pendaftar}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.no_hp}</td>
                    <td>{item.asal_sekolah}</td>
                    <td>{item.jurusan}</td>
                    <td>{item.tgl_lahir}</td>
                    <td>{item.nisn}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(item.id_pendaftar)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item.id_pendaftar)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">Tidak ada data pendaftar.</p>
        )}

        {editMode && (
          <div className="card custom-card bg-white text-dark p-4 rounded-4 shadow fade-in">
            <h4 className="mb-4">Edit Data Pendaftar</h4>
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                {[
                  ["nm_pendaftar", "Nama Lengkap"],
                  ["alamat", "Alamat"],
                  ["no_hp", "No HP"],
                  ["asal_sekolah", "Asal Sekolah"],
                  ["jurusan", "Jurusan"],
                  ["tgl_lahir", "Tanggal Lahir", "date"],
                  ["nisn", "NISN"],
                ].map(([name, label, type = "text"]) => (
                  <div className="col-md-6" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="form-control border-dark custom-input"
                      placeholder={label}
                      required
                    />
                  </div>
                ))}

                <div className="col-md-6">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    className="form-select border-dark custom-input"
                    required
                  >
                    <option value="">-- Pilih Jenis Kelamin --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end gap-3">
                <button type="submit" className="btn btn-dark px-4">
                  Simpan
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark px-4"
                  onClick={() => setEditMode(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
