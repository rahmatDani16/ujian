import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const MyNavbar = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .navbar-custom {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        background-color: #2d3e50 !important;
      }

      .navbar-brand {
        font-weight: bold;
        font-size: 1.5rem;
        color: #fff !important;
      }

      .nav-link-custom {
        color: #fff;
        margin-left: 20px;
        font-weight: 500;
        text-decoration: none;
        padding: 10px;
        transition: color 0.3s ease, transform 0.3s ease;
      }

      .nav-link-custom:hover {
        color: #ffcc00;
        text-decoration: underline;
        transform: scale(1.1);
      }

      .nav-link-custom:active {
        color: #ff9900;
      }

      @media (max-width: 991px) {
        .nav-link-custom {
          margin-left: 0;
          margin-top: 10px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand d-flex align-items-center">
          Pendaftaran Sertifikasi BNSP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="bnsp-navbar" />
        <Navbar.Collapse id="bnsp-navbar">
          <Nav className="ms-auto">
            <Nav.Item>
              <NavLink to="/register" className="nav-link-custom">
                Pendaftaran Sertifikasi
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
