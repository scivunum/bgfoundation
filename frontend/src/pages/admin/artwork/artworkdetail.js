import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link} from 'react-router-dom';
import { Row, Col, Card, Form, Input, Button, message, Breadcrumb } from 'antd';
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';
import { backendUrl } from '../../../utils/utils'; // Import backendUrl for the API endpoint
import LoadingSpinner from '../../../components/LoadingSpinner';
import { getBase64, base64ToFile } from '../../../utils/imageconverter';

const ArtworkDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artwork, setArtwork] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/artworks/${id}`)
            .then(response => {
                const fetchedArtwork = response.data.data;
                // Convert image back to File object if needed
                const imageFile = base64ToFile(fetchedArtwork.image, 'artwork.jpg');
                setArtwork({ ...fetchedArtwork, imageFile });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching artwork details:', error);
                message.error('Failed to fetch artwork details.');
                setIsLoading(false);
            });
    }, [id]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    };

    const handleSave = async (values) => {
        if (file) {
            values.image = await getBase64(file);
        }

        axios.put(`${backendUrl}/api/v1/artworks/${id}`, values)
            .then(response => {
                console.log('Artwork details updated:', response.data);
                console.log(values);
                setArtwork(response.data.data);
                setEditMode(false);
                message.success('Artwork details saved!');
            })
            .catch(error => {
                console.error('Error updating artwork details:', error);
                message.error('Failed to save artwork details.');
            });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div style={{ padding: '20px' }} className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/"><HomeOutlined /></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/admin">Admin</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/admin/artworks">Art Works</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Artwork ({id})</Breadcrumb.Item>
                </Breadcrumb>
                <EditOutlined onClick={handleEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    {artwork.image && (
                        <img src={artwork.image} alt={artwork.name} style={{ width: '100%', height: 'auto' }} />
                    )}
                </Col>
                <Col xs={24} sm={12} md={16} lg={18}>
                    <Card title={editMode ? 'Edit Artwork' : artwork.name} style={{ borderRadius: '2px', borderColor: colors.primary }}>
                        {editMode ? (
                            <Form form={form} layout="vertical" initialValues={artwork} onFinish={handleSave}>
                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the artwork name' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Artist" name="artist_id" rules={[{ required: true, message: 'Please enter the artist id' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description' }]}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item label="Event" name="event_id" rules={[{ required: true, message: 'Please enter the Event id' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Upload Image">
                                    <Input type="file" onChange={handleFileChange} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Save</Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Artist:</strong> {artwork.artist_id}</p>
                                <p><strong>Price:</strong> {artwork.price}</p>
                                <p><strong>Description:</strong> {artwork.description}</p>
                                <p><strong>Event:</strong> {artwork.event_id}</p>
                                <p><strong>Created Date:</strong> {artwork.createdAt}</p>
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
