import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Form, Input, Button, message, Breadcrumb, Upload, Image, Tooltip, Popconfirm, DatePicker, Select } from 'antd';
import { HomeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { colors } from '../../../components/style';
import { backendUrl } from '../../../utils/utils';
import LoadingSpinner from '../../../components/LoadingSpinner';

const { Option } = Select;

const EventDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/events/${id}`);
                const eventData = response.data;

                form.setFieldsValue({
                    ...eventData,
                    start_date: moment(eventData.start_date),
                    close_date: moment(eventData.close_date),
                });

                setEvent(eventData);
                fetchArtworks(eventData.artworks);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
                message.error('Failed to fetch event details.');
            }
        };

        const fetchArtworks = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/artworks`, {
                    params: { event_id: id }
                });
                const artworkData = response.data.data;

                const preparedFileList = artworkData.map((artwork, index) => ({
                    uid: artwork._id, // Use artwork ID as UID
                    name: `image-${index}`,
                    status: 'done',
                    url: artwork.image,
                }));

                setArtworks(artworkData);
                setFileList(preparedFileList);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
                message.error('Failed to fetch artworks.');
            }
        };

        fetchEventDetails();
    }, [id, form]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const values = await form.validateFields();
            const updatedEvent = {
                ...values,
                start_date: values.start_date.toISOString(),
                close_date: values.close_date.toISOString(),
                artworks: artworks.length,
            };

            await axios.put(`${backendUrl}/api/v1/events/${id}`, updatedEvent);
            setEvent(updatedEvent);
            setEditMode(false);
            message.success('Event details saved!');
        } catch (error) {
            console.error('Failed to save event details:', error);
            message.error('Failed to save event details.');
        }
        setIsLoading(false);
    };
    

    const handleRemoveImage = async (file) => {
        try {
            await axios.put(`${backendUrl}/api/v1/artworks/${file.uid}`, { event_id: null });
            setFileList(fileList.filter(item => item.uid !== file.uid));
            message.success('Image removed successfully');
        } catch (error) {
            console.error('Failed to remove image:', error);
            message.error('Failed to remove image.');
        }
    };

    if (!event) return <LoadingSpinner />;

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
                        <Link to="/admin/events">Events</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Event ({id})</Breadcrumb.Item>
                </Breadcrumb>
                <EditOutlined onClick={handleEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24} lg={24}>
                    <Card title={editMode ? 'Edit Event' : event.name} style={{ borderRadius: '2px', borderColor: colors.primary }}>
                        {editMode ? (
                            <Form form={form} layout="vertical" onFinish={handleSave}>
                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the event name' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Start Date" name="start_date" rules={[{ required: true, message: 'Please select the start date' }]}>
                                    <DatePicker showTime />
                                </Form.Item>
                                <Form.Item label="Close Date" name="close_date" rules={[{ required: true, message: 'Please select the close date' }]}>
                                    <DatePicker showTime />
                                </Form.Item>
                                <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the event status' }]}>
                                    <Select>
                                        <Option value="upcoming">Upcoming</Option>
                                        <Option value="ongoing">Ongoing</Option>
                                        <Option value="ended">Ended</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the event description' }]}>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isLoading}>
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Date:</strong> {moment(event.start_date).format('YYYY-MM-DD HH:mm')} - {moment(event.close_date).format('YYYY-MM-DD HH:mm')}</p>
                                <p><strong>Status:</strong> {event.status}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {fileList.map(file => (
                                        <div key={file.uid} style={{ position: 'relative', marginRight: '8px', marginBottom: '8px' }}>
                                            <Link to={`/admin/artworks/${file.uid}`} style={{ textDecoration: 'none' }}>
                                                <Image src={file.url || URL.createObjectURL(file.originFileObj)} width={150} />
                                            </Link>
                                            <Popconfirm
                                                title="Are you sure you want to remove this image?"
                                                onConfirm={() => handleRemoveImage(file)}
                                                okText="Yes"
                                                cancelText="No"
                                                placement="topRight"
                                            >
                                                <Button type="link" icon={<DeleteOutlined />} style={{ position: 'absolute', top: 0, right: 0 }} size="small" />
                                            </Popconfirm>
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={handleEdit}>Edit</Button>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default EventDetail;
