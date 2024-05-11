import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col, Image, Card, Pagination  } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const ArtworkDetailPage = () => {
    const { id } = useParams(); 

    // Placeholder data for artwork details
    const artworkDetails = {
        title: 'Artwork Title',
        imageUrl: 'https://via.placeholder.com/400x300',
        artist: 'Artist Name',
        date: '2022-01-01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac hendrerit ex. Integer ac velit quis nisl placerat gravida nec a lorem. Proin consequat consequat est, sit amet fermentum libero congue ut. Maecenas vehicula elit vel libero posuere aliquet. Curabitur at mi eu lacus cursus tincidunt in nec elit.',
        price: '$1,000',
        hashtags: ['#abstract', '#modern', '#colorful'],
        dimensions: '20" x 30"',
        materials: 'Oil on canvas',
    };
    const alsolike = [
        { id:1, title: 'Artwork 1', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-01', author: 'Artist 1', hashtags: ['#abstract', '#modern', '#colorful'], price:'$500' },
        { id:2, title: 'Artwork 2', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-02', author: 'Artist 2', hashtags: ['#portrait', '#classic', '#monochrome'], price:'$500' },
        { id:3, title: 'Artwork 3', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-03', author: 'Artist 3', hashtags: ['#landscape', '#impressionist', '#scenic'], price:'$500' },
        { id:4, title: 'Artwork 4', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-04', author: 'Artist 4', hashtags: ['#abstract', '#surreal', '#dreamy'], price:'$500' },
        { id:5, title: 'Artwork 5', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-05', author: 'Artist 5', hashtags: ['#modern', '#geometric', '#vibrant'], price:'$500' },
        { id:6, title: 'Artwork 6', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-06', author: 'Artist 6', hashtags: ['#portrait', '#realism', '#expressive'], price:'$500' },
        { id:7, title: 'Artwork 7', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-07', author: 'Artist 7', hashtags: ['#landscape', '#naturalistic', '#serene'], price:'$500' },
        { id:8, title: 'Artwork 8', imageUrl: 'https://via.placeholder.com/150', date: '2022-01-08', author: 'Artist 8', hashtags: ['#abstract', '#futuristic', '#dynamic'], price:'$500' },
    ]  
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // Number of artworks per page

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;


    // Fetch the artwork details based on the ID
    // You can fetch the details from your data source or API

    return (
        <div style={{ padding: '24px', marginTop: '80px' }}>
            <Title level={2}>{artworkDetails.title}</Title>
            <Paragraph>{id}</Paragraph>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <img src={artworkDetails.imageUrl} alt={artworkDetails.title} style={{ width: '100%', borderRadius: '8px' }} />
                </Col>
                <Col xs={24} md={12}>
                    <Paragraph><strong>Artist:</strong> {artworkDetails.artist}</Paragraph>
                    <Paragraph><strong>Date:</strong> {artworkDetails.date}</Paragraph>
                    <Paragraph><strong>Description:</strong> {artworkDetails.description}</Paragraph>
                    <Paragraph><strong>Price:</strong> {artworkDetails.price}</Paragraph>
                    <Paragraph><strong>Dimensions:</strong> {artworkDetails.dimensions}</Paragraph>
                    <Paragraph><strong>Materials:</strong> {artworkDetails.materials}</Paragraph>
                    <Paragraph><strong>Hashtags:</strong> {artworkDetails.hashtags.join(', ')}</Paragraph>
                </Col>
            </Row>
            <div className='mt-4 p-2 bg-light'>
                <Title level={2} className='align-left'>You May Also Like</Title>
                <Row gutter={[16, 16]}>
                    {alsolike.slice(startIndex, endIndex).map((artwork, index) => (
                        <Col key={index} xs={12} sm={6} lg={4} >
                            <Link to={`/artworks/${artwork.id}`} className='text-dark text-decoration-none'>
                                <Card
                                    hoverable
                                    style={{ borderRadius: '1px' }}
                                    cover={<Image src={artwork.imageUrl} style={{ borderRadius: '1px' }} />}
                                >
                                    <Card.Meta
                                        title={artwork.title}
                                        description={`By ${artwork.author}`}
                                    />
                                    <small className='fw-bold'>Price: {artwork.price}</small> <br/>
                                    <small>Date: {artwork.date}</small>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        current={currentPage}
                        total={alsolike.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetailPage;
