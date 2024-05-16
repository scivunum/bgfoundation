import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Form, Input, Button, message, Breadcrumb, Upload, Image, Tooltip, Popconfirm } from 'antd';
import { HomeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';

const PaymentDetail = () => {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [fileList, setFileList] = useState([
        { id: 0, imageUrl: 'https://via.placeholder.com/150' },
        { id: 1, imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, imageUrl: 'https://via.placeholder.com/150' }
    ]);

    // Dummy payment details (replace this with actual fetching from API or state)
    const [payment, setPayment] = useState({
        id: id,
        payer: 'Payer Name',
        reason: 'Payment Reason',
        event: 'Event Title',
        artwork: 'Artwork Title',
        amount: '$100',
        date: '2022-01-01',
        artworks: fileList
    });

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Here you can implement logic to save the updated payment details
        // For now, let's just toggle back to view mode
        setEditMode(false);
        message.success('Payment details saved!');
    };

    const handleFileUpload = (info) => {
        let newFileList = [...info.fileList];
        if (newFileList.length < fileList.length) {
            console.log(newFileList);
            setFileList(newFileList);
        } else {
            newFileList = newFileList.map(file => {
                if (file.response) {
                    file.url = file.response.url; // Assuming API responds with URL
                }
                return { id: fileList.length, imageUrl: file };
            });
            console.log(newFileList);
            setFileList(newFileList);
        }

    };

    const handleRemoveImage = (id) => {
        setFileList(fileList.filter(image => image.id !== id));
    };

    useEffect(() => {
        // Fetch payment details from API or state
        // For now, just set the payment data
        setPayment({ ...payment, artworks: fileList });
    }, [fileList, payment]);

    return (
        <div style={{ padding: '20px' }} className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb
                    items={[
                        { title: (<Link to="/"><HomeOutlined /></Link>) },
                        { title: (<Link to="/admin"><span>Admin</span></Link>) },
                        { title: (<Link to="/admin/payments"><span>Payments</span></Link>) },
                        { title: (<span>Payment ({id})</span>) },
                    ]}
                />
                <EditOutlined onClick={handleEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24} lg={24}>
                    <Card title={editMode ? 'Edit Payment' : `Payment #${id}`} style={{ borderRadius: '2px', borderColor: colors.primary }}>
                        {editMode ? (
                            <Form layout="vertical">
                                <Form.Item label="Payer" name="payer" initialValue={payment.payer}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Reason" name="reason" initialValue={payment.reason}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Event" name="event" initialValue={payment.event}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Artwork" name="artwork" initialValue={payment.artwork}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Amount" name="amount" initialValue={payment.amount}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Date" name="date" initialValue={payment.date}>
                                    <Input />
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
                                <p><strong>Payer:</strong> {payment.payer}</p>
                                <p><strong>Reason:</strong> {payment.reason}</p>
                                <p><strong>Event:</strong> {payment.event}</p>
                                <p><strong>Artwork:</strong> {payment.artwork}</p>
                                <p><strong>Amount:</strong> {payment.amount}</p>
                                <p><strong>Date:</strong> {payment.date}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {payment.artworks.map(artwork => (
                                        <div key={artwork.id} style={{ position: 'relative', marginRight: '8px', marginBottom: '8px' }}>
                                            <Image src={artwork.imageUrl} width={150} />
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

export default PaymentDetail;
