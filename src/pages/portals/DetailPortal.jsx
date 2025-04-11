import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from '../../components/Navbar';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const CryptoNews = () => {
    const { name } = useParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCryptoNews = async () => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/news`);
            setNews(response.data.data);
        } catch (err) {
            console.error("Error fetching crypto news:", err);
            setError("Gagal mengambil berita crypto.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCryptoNews();
    }, [name]);

    return (
        <div>
            <MyNavbar />
            <Container className="mt-5 pt-5 content">
                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" />
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : news.length > 0 ? (
                    <>
                        <h3 className="fw-bold text-center mt-5 pt-5 content">📰 Berita Crypto Terkini</h3>
                        <p className="text-center text-muted">Dapatkan berita terbaru tentang cryptocurrency</p>

                        <Row>
                            {news.map((article, index) => (
                                <Col key={index} md={6} lg={4} className="mb-4">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                        <Card className="shadow-lg">
                                            <Card.Img 
                                                variant="top" 
                                                src={article.image || 'https://via.placeholder.com/180'} 
                                                style={{ height: "180px", objectFit: "cover" }} 
                                                alt="Thumbnail"
                                            />
                                            <Card.Body>
                                                <Card.Title className="fw-bold text-primary">{article.title}</Card.Title>
                                                <Card.Text className="text-muted">{article.description || "Tidak ada deskripsi."}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <p className="text-center text-danger">Tidak ada berita tersedia.</p>
                )}
            </Container>
        </div>
    );
};

export default CryptoNews;
