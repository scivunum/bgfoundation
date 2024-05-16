import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Tag, Form, Input, Button, message, Breadcrumb } from 'antd';
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';

const ArtworkDetail = () => {
    const { id } = useParams();

    // Dummy artwork details (replace this with actual fetching from API or state)
    const artwork ={
        id: id,
        title: 'Artwork Title',
        author: 'Artist Name',
        price: '$500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget suscipit mauris. Nullam vel urna nec urna tempus efficitur. Vestibulum auctor, libero sit amet accumsan fringilla, justo leo viverra purus, at vestibulum risus felis non justo. Aenean ac enim vitae sapien gravida vehicula.',
        hashtags: ['#abstract', '#modern', '#colorful'],
        date: '2022-01-01',
        imageUrl: 'https://via.placeholder.com/300x200', // Example image URL
    };

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Here you can implement logic to save the updated artwork details
        // For now, let's just toggle back to view mode
        setEditMode(false);
        message.success('Artwork details saved!');
    };

    return (
        <div style={{ padding: '20px' }} className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<Link to="/admin/artworks"><span>Art Works</span></Link>) },
                            { title: (<span>Artwork({id})</span>) },
                        ]}
                    />
                <EditOutlined onClick={handleEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <img src={artwork.imageUrl} alt={artwork.title} style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col xs={24} sm={12} md={16} lg={18}>
                    <Card title={editMode ? 'Edit Artwork' : artwork.title} style={{ borderRadius: '2px', borderColor: colors.primary }}>
                        {editMode ? (
                            <Form layout="vertical">
                                <Form.Item label="Title" name="title" initialValue={artwork.title}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Author" name="author" initialValue={artwork.author}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Price" name="price" initialValue={artwork.price}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Description" name="description" initialValue={artwork.description}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item label="Hashtags" name="hashtags" initialValue={artwork.hashtags}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Date" name="date" initialValue={artwork.date}>
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Author:</strong> {artwork.author}</p>
                                <p><strong>Price:</strong> {artwork.price}</p>
                                <p><strong>Description:</strong> {artwork.description}</p>
                                <p><strong>Hashtags:</strong> {artwork.hashtags.map(tag => <Tag key={tag}>{tag}</Tag>)}</p>
                                <p><strong>Date:</strong> {artwork.date}</p>
                                <Button onClick={handleEdit}>Edit</Button>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ArtworkDetail;
