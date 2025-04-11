import { useEffect, useState } from 'react';
import { FaUsers, FaMale, FaFemale } from 'react-icons/fa';
import Layout from '../pages/layout/Layout';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from 'recharts';

const Dashboard = () => {
  const [pendaftarData, setPendaftarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard Pendaftar';

    axios
      .get('https://dani.rikpetik.site/api/v1/pendaftar', {
        withCredentials: true,
      })
      .then((response) => {
        const res = response.data;
        if (Array.isArray(res.data)) {
          const sortedData = res.data.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPendaftarData(sortedData);
        } else {
          setPendaftarData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Gagal mengambil data pendaftar:', error);
        setLoading(false);
      });
  }, []);

  const totalPendaftar = pendaftarData.length;
  const totalLaki = pendaftarData.filter(
    (p) => p.jenis_kelamin.toLowerCase() === 'laki-laki'
  ).length;
  const totalPerempuan = pendaftarData.filter(
    (p) => p.jenis_kelamin.toLowerCase() === 'perempuan'
  ).length;

  const pieData = [
    { name: 'Laki-laki', value: totalLaki },
    { name: 'Perempuan', value: totalPerempuan },
  ];

  const COLORS = ['#36a2eb', '#ff6384'];

  return (
    <Layout>
      <div className="dashboard-container fade-in">
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <FaUsers className="card-icon" />
            <h3>Total Pendaftar</h3>
            <p>Semua pendaftar</p>
            <span className="card-value">{loading ? 'Loading...' : totalPendaftar}</span>
          </div>
          <div className="dashboard-card">
            <FaMale className="card-icon" />
            <h3>Laki-laki</h3>
            <p>Pendaftar Laki-laki</p>
            <span className="card-value">{loading ? '...' : totalLaki}</span>
          </div>
          <div className="dashboard-card">
            <FaFemale className="card-icon" />
            <h3>Perempuan</h3>
            <p>Pendaftar Perempuan</p>
            <span className="card-value">{loading ? '...' : totalPerempuan}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="tabel-terbaru">
            <h3>Pendaftar Terbaru</h3>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Jenis Kelamin</th>
                  <th>Asal Sekolah</th>
                  <th>Waktu Daftar</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">Loading...</td>
                  </tr>
                ) : (
                  pendaftarData.slice(0, 5).map((pendaftar, index) => (
                    <tr key={index}>
                      <td>{pendaftar.nm_pendaftar}</td>
                      <td>{pendaftar.jenis_kelamin}</td>
                      <td>{pendaftar.asal_sekolah}</td>
                      <td>{new Date(pendaftar.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="grafik-pie">
            <h3>Statistik Pendaftar</h3>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} Pendaftar`} />
                </PieChart>

                <div className="legend-container">
                  {pieData.map((entry, index) => (
                    <div key={index} className="legend-item">
                      <span
                        className="legend-color"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></span>
                      <span>{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* CSS dijadikan satu */}
        <style>{`
          .dashboard-container {
            padding: 20px;
            background: #f0f2f5;
            min-height: 100vh;
            font-family: 'Segoe UI', sans-serif;
            transition: background 0.3s ease;
          }

          .fade-in {
            animation: fadeIn 0.8s ease-in;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .dashboard-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #2c3e50;
          }

          .dashboard-cards {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
          }

          .dashboard-card {
            flex: 1;
            min-width: 200px;
            background: linear-gradient(145deg, #e5ecf4, #ffffff);
            border-radius: 14px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
            padding: 20px;
            text-align: center;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .dashboard-card:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
          }

          .card-icon {
            font-size: 42px;
            margin-bottom: 10px;
            color: #3b82f6;
            transition: color 0.3s ease;
          }

          .dashboard-card:hover .card-icon {
            color: #2563eb;
          }

          .card-value {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
          }

          .dashboard-content {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            margin-top: 30px;
          }

          .tabel-terbaru {
            flex: 2;
            transition: all 0.3s ease-in-out;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease-in-out;
          }

          th, td {
            padding: 16px 20px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
          }

          th {
            background-color: #f8fafc;
            font-weight: 600;
            color: #374151;
          }

          td {
            color: #4b5563;
          }

          tr:hover td {
            background-color: #f1f5f9;
            transition: background-color 0.3s ease;
          }

          .grafik-pie {
            flex: 1;
            background: white;
            border-radius: 14px;
            padding: 20px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
            text-align: center;
            transition: all 0.3s ease-in-out;
          }

          .legend-container {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 14px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #374151;
          }

          .legend-color {
            width: 14px;
            height: 14px;
            display: inline-block;
            margin-right: 6px;
            border-radius: 3px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Dashboard;
