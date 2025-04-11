import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../pages/layout/Layout";

const TambahPendaftar = () => {
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Inject style tag saat komponen dimuat
    const style = document.createElement("style");
    style.textContent = `
      .form-control, .form-select {
        transition: all 0.3s ease;
        box-shadow: none;
      }

      .form-control:focus, .form-select:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 0.25rem rgba(99, 102, 241, 0.2);
      }

      button.btn {
        transition: all 0.3s ease;
      }

      button.btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .form-fade-in {
        animation: fadeIn 0.6s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://dani.rikpetik.site/api/v1/pendaftar",
        formData
      );
      if (response.status === 201) {
        alert("Registrasi berhasil ditambahkan!");
        navigate("/Admin");
      }
    } catch (error) {
      console.error("Gagal menambahkan pendaftar:", error.response || error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Gagal menambahkan data. Pastikan server aktif dan periksa input Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="card bg-white text-dark p-4 rounded-4 shadow-sm border form-fade-in">
          <h3 className="text-bla mb-4 fw-bold">Form Registrasi Baru</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  name="nm_pendaftar"
                  value={formData.nm_pendaftar}
                  onChange={handleChange}
                  className="form-control border-secondary"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="form-control border-secondary"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Jenis Kelamin</label>
                <select
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  className="form-select border-secondary"
                  required
                >
                  <option value="">-- Pilih --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">No HP</label>
                <input
                  type="text"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  className="form-control border-secondary"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Asal Sekolah</label>
                <input
                  type="text"
                  name="asal_sekolah"
                  value={formData.asal_sekolah}
                  onChange={handleChange}
                  className="form-control border-secondary"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Jurusan</label>
                <select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  className="form-select border-secondary"
                  required
                >
                  <option value="">-- Pilih --</option>
                  <option value="RPL">RPL</option>
                  <option value="TKJ">TKJ</option>
                  <option value="MM">MM</option>
                  <option value="OTKP">OTKP</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tgl_lahir"
                  value={formData.tgl_lahir}
                  onChange={handleChange}
                  className="form-control border-secondary"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">NISN</label>
                <input
                  type="text"
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  className="form-control border-secondary"
                  required
                />
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-end gap-3">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                type="button"
                className="btn btn-outline-primary px-4"
                onClick={() => navigate("/Admin")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TambahPendaftar;
