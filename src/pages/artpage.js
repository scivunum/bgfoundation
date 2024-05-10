import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';

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
        </div>
    );
};

export default ArtworkDetailPage;
