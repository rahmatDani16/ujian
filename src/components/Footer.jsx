import { Container, Row, Col } from 'react-bootstrap';
import { FaCertificate, FaFacebook, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-4 mt-5'>
      <Container>
        <Row className='text-center text-md-start'>
          <Col md={4}>
            <h5 className='fw-bold d-flex align-items-center'>
              <FaCertificate size={30} color="#ffc107" className="me-2" /> Sertifikasi BNSP
            </h5>
            <p className='small'>
              Sertifikasi BNSP adalah bukti kompetensi kerja yang diakui secara nasional dan internasional, dikeluarkan oleh Badan Nasional Sertifikasi Profesi (BNSP).
            </p>
          </Col>
          <Col md={4}>
            <h5 className='fw-bold'>Ikuti Kami</h5>
            <ul className='list-unstyled small'>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FaFacebook className="me-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FaTwitter className="me-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FaInstagram className="me-2" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FaTelegram className="me-2" /> Telegram
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className='fw-bold'>Kontak Kami</h5>
            <p className='small'>
              Email: info@bnsp.go.id <br />
              Telepon: +62 21-1234-5678 <br />
              Alamat: Jl. M.H. Thamrin No. 8, Jakarta Pusat, Indonesia
            </p>
          </Col>
        </Row>
        <Row className='text-center mt-3'>
          <Col>
            <p className='small'>© {new Date().getFullYear()} Badan Nasional Sertifikasi Profesi. Semua hak dilindungi.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
