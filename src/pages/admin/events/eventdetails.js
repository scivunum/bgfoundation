import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { Row, Col, Card, Form, Input, Button, message, Breadcrumb, Upload, Image, Tooltip, Popconfirm } from 'antd';
import { HomeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';

const EventDetail = () => {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [fileList, setFileList] = useState([
        { id: 0, imageUrl: 'https://via.placeholder.com/150' },
        { id: 1, imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, imageUrl: 'https://via.placeholder.com/150' }
    ]);

    // Dummy event details (replace this with actual fetching from API or state)
    const [event, setEvent] = useState({
        id: id,
        title: 'Event Title',
        date: '2022-01-01',
        status: 'Active',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget suscipit mauris. Nullam vel urna nec urna tempus efficitur. Vestibulum auctor, libero sit amet accumsan fringilla, justo leo viverra purus, at vestibulum risus felis non justo. Aenean ac enim vitae sapien gravida vehicula.',
        artworks: fileList
    });

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Here you can implement logic to save the updated event details
        // For now, let's just toggle back to view mode
        setEditMode(false);
        message.success('Event details saved!');
    };

    const handleFileUpload = (info) => {
        let newFileList = [...info.fileList];
        if (newFileList.length <fileList.length){
            console.log(newFileList);
            setFileList(newFileList);
        }else{
            newFileList = newFileList.map(file => {
                if (file.response) {
                    file.url = file.response.url; // Assuming API responds with URL
                }
                return {id:fileList.length,imageUrl:file};
            });
            console.log(newFileList);
            setFileList(newFileList);
        }
        
    };

    const handleRemoveImage = (id) => {
        setFileList(fileList.filter(image => image.id !== id));
    };

    useEffect(() => {
        // Fetch event details from API or state
        // For now, just set the event data
        setEvent({ ...event, artworks: fileList });
    }, [fileList, event]);

    return (
        <div style={{ padding: '20px' }} className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb
                    items={[
                        { title: (<Link to="/"><HomeOutlined /></Link>) },
                        { title: (<Link to="/admin"><span>Admin</span></Link>) },
                        { title: (<Link to="/admin/events"><span>Events</span></Link>) },
                        { title: (<span>Event ({id})</span>) },
                    ]}
                />
                <EditOutlined onClick={handleEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24} lg={24}>
                    <Card title={editMode ? 'Edit Event' : event.title} style={{ borderRadius: '2px', borderColor: colors.primary }}>
                        {editMode ? (
                            <Form layout="vertical">
                                <Form.Item label="Title" name="title" initialValue={event.title}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Date" name="date" initialValue={event.date}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Status" name="status" initialValue={event.status}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Description" name="description" initialValue={event.description}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item label="Upload Images" name="images">
                                    <Upload
                                        listType="picture"
                                        fileList={fileList}
                                        onChange={handleFileUpload}
                                        onRemove={handleRemoveImage}
                                        beforeUpload={() => false}
                                    >
                                        <Tooltip title="Upload Image">
                                            <Button icon={<PlusOutlined />} />
                                        </Tooltip>
                                    </Upload>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Status:</strong> {event.status}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {event.artworks.map(artwork => (
                                        <div key={artwork.id} style={{ position: 'relative', marginRight: '8px', marginBottom: '8px' }}>
                                            <Link to={`/admin/artworks/${artwork.id}`} style={{textDecoration: 'none'}}>
                                                <Image src={artwork.imageUrl} width={150}  />
                                            </Link>
                                            <Popconfirm
                                                title="Are you sure you want to remove this image?"
                                                onConfirm={() => handleRemoveImage(artwork.id)}
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
