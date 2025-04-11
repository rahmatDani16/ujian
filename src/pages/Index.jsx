import { Container, Row, Col, Card} from "react-bootstrap";
import MyNavbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

const HomeBNSP = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fb" }}>
      <MyNavbar />
      <section
        className="text-white d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg, #001f3f, #00b4d8)",
          padding: "100px 5%",
          minHeight: "100vh",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <motion.h1
                className="fw-bold mb-4"
                style={{ fontSize: "52px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Bangun Karier Profesional Anda Bersama <span style={{ color: "#38b000" }}>BNSP</span>
              </motion.h1>
              <motion.p
                style={{ fontSize: "18px", lineHeight: "1.7" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                Raih pengakuan resmi dengan sertifikat kompetensi dari BNSP. Tingkatkan kredibilitas dan daya saing Anda di dunia kerja!
              </motion.p>
            </Col>
            <Col md={6} className="text-center">
              <motion.img
                src="https://tse1.mm.bing.net/th?id=OIP.jrxJVX1_jYLE4NOBOnzzdQHaJv&pid=Api"
                alt="BNSP Intro"
                className="img-fluid rounded shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section style={{ padding: "80px 5%" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 className="fw-bold text-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Kenapa Sertifikasi BNSP Penting?
              </motion.h2>
              <p className="text-muted fs-5 mt-3">
                Diakui secara nasional & internasional, memperkuat kredibilitas dan daya saing Anda di industri kerja.
              </p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6}>
              <motion.img
                src="https://tse2.mm.bing.net/th?id=OIP.mxFLyxa1DAJHwhaHZNxtDwHaEK&pid=Api"
                alt="Benefit Sertifikasi"
                className="img-fluid rounded shadow"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </Col>
            <Col md={6}>
              <ul className="list-unstyled fs-5" style={{ lineHeight: "2" }}>
                {[
                  "Diakui oleh industri dan lembaga pemerintahan",
                  "Meningkatkan nilai jual di pasar kerja",
                  "Bukti nyata keahlian & kompetensi Anda",
                  "Peluang lebih luas untuk promosi dan jenjang karier"
                ].map((item, idx) => (
                  <li key={idx} className="mb-2">
                    <FaCheckCircle color="#38b000" className="me-2" />
                    {item}
                  </li>
                ))}
                           </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ backgroundColor: "#ffffff", padding: "80px 5%" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 className="fw-bold text-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Tentang BNSP
              </motion.h2>
              <p className="text-muted fs-5 mt-3">
                BNSP adalah lembaga independen yang menyelenggarakan sertifikasi kompetensi kerja sesuai dengan UU No. 13 Tahun 2003.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <motion.img
                src="https://tse3.mm.bing.net/th?id=OIP.4LZYbJ6N4jhSsOSMAcWiOwHaHa&pid=Api"
                alt="Tentang BNSP"
                className="img-fluid rounded shadow"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ backgroundColor: "#f1f5f9", padding: "80px 5%" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 className="fw-bold text-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Mitra Lembaga Sertifikasi Profesi (LSP)
              </motion.h2>
              <p className="text-muted">Berikut beberapa mitra resmi LSP yang telah bekerja sama dengan BNSP:</p>
            </Col>
          </Row>
          <Row className="g-4 justify-content-center">
            {[
              {
                title: "LSP Teknologi Informasi",
                img: "https://lspdigital.id/storage/photo/article/5fe95983443f4_1609128323.jpeg"
              },
              {
                title: "LSP Pariwisata Indonesia",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaE0DBHOqrTrFrGTCB7rwzk5jwWrngoSaJaQ&s"
              },
              {
                title: "LSP Logistik & Transportasi",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yoPfKuwQmkPzu1qsyhikfvOFgl0sa73fGA&s"
              }
            ].map((item, index) => (
              <Col md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card className="shadow-lg text-center border-0 glass-card">
                    <Card.Img variant="top" src={item.img} className="rounded-top" style={{ height: "200px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title className="fw-bold">{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section style={{ backgroundColor: "#ffffff", padding: "80px 5%" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 className="fw-bold text-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Apa Kata Mereka?
              </motion.h2>
              <p className="text-muted">Pengalaman peserta sertifikasi bersama BNSP</p>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              {
                nama: "Andi Saputra",
                isi: "Sertifikasi BNSP membantu saya mendapatkan promosi di tempat kerja. Prosesnya jelas dan profesional.",
              },
              {
                nama: "Ratna Dewi",
                isi: "Saya lebih percaya diri melamar pekerjaan dengan sertifikat dari BNSP. Terima kasih!",
              },
              {
                nama: "Fajar Pratama",
                isi: "Langkah besar untuk karier saya. Sertifikat ini menjadi bukti nyata kompetensi saya.",
              },
            ].map((testi, idx) => (
              <Col md={4} key={idx}>
                <motion.div
                  className="p-4 shadow rounded bg-light h-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.3 }}
                >
                  <FaQuoteLeft size={30} className="mb-3 text-primary" />
                  <p className="fst-italic">{testi.isi}</p>
                  <h6 className="fw-bold mt-3">{testi.nama}</h6>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />

      <style>{`
        .glass-card {
          backdrop-filter: blur(10px);
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default HomeBNSP;