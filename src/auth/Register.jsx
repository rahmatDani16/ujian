import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeft } from "react-bootstrap-icons";

const Register = () => {
  const [form, setForm] = useState({
    nm_pendaftar: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    jurusan: "",
    tgl_lahir: "",
    nisn: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const formErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/; 
    const phoneRegex = /^[0-9]+$/;
    const nisnRegex = /^[0-9]{12}$/;

    if (!nameRegex.test(form.nm_pendaftar)) {
      formErrors.nm_pendaftar = "Nama hanya boleh mengandung huruf dan spasi";
    }
    if (!phoneRegex.test(form.no_hp)) {
      formErrors.no_hp = "No HP hanya boleh berisi angka";
    }
    if (!nisnRegex.test(form.nisn)) {
      formErrors.nisn = "NISN harus terdiri dari 12 angka";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post("https://dani.rikpetik.site/api/v1/pendaftar", form);
      if (response.status === 201) {
        setSuccessMsg(" Pendaftaran Berhasil Dilakukan!");
        setForm({
          nm_pendaftar: "",
          alamat: "",
          jenis_kelamin: "",
          no_hp: "",
          asal_sekolah: "",
          jurusan: "",
          tgl_lahir: "",
          nisn: ""
        });

        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setErrors({ general: errorMessage.join(", ") });
      } else {
        setErrors({ general: errorMessage || "Terjadi kesalahan saat mengirim data." });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
      <Link
          to="/"
          className="position-absolute top-0 start-0 m-3 text-dark d-flex align-items-center bg-transparent border-0"
          style={{ textDecoration: "none" }}
      >
    <ArrowLeft className="me-2" />
    </Link>

      <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-4 text-dark">Formulir Pendaftaran</h3>

        {successMsg && (
          <div className="alert alert-success text-center fade show">{successMsg}</div>
        )}
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nama Lengkap" name="nm_pendaftar" value={form.nm_pendaftar} onChange={handleChange} required />
            {errors.nm_pendaftar && <small className="text-danger">{errors.nm_pendaftar}</small>}
          </div>
          <div className="mb-3">
            <textarea className="form-control" placeholder="Alamat" name="alamat" value={form.alamat} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <select className="form-control" name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} required>
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="No HP" name="no_hp" value={form.no_hp} onChange={handleChange} required />
            {errors.no_hp && <small className="text-danger">{errors.no_hp}</small>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Asal Sekolah" name="asal_sekolah" value={form.asal_sekolah} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <select className="form-control" name="jurusan" value={form.jurusan} onChange={handleChange} required>
              <option value="">Pilih Jurusan</option>
              <option value="RPL">RPL</option>
              <option value="TKJ">TKJ</option>
              <option value="MM">MM</option>
              <option value="OTKP">OTKP</option>
            </select>
          </div>
          <div className="mb-3">
            <input type="date" className="form-control" name="tgl_lahir" value={form.tgl_lahir} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="NISN" name="nisn" value={form.nisn} onChange={handleChange} required />
            {errors.nisn && <small className="text-danger">{errors.nisn}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Daftar</button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-muted">Dengan mendaftar, Anda menyetujui <Link to="/terms" className="text-decoration-none text-primary">syarat dan ketentuan</Link> kami.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
