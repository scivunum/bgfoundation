import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Form, Input, message, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';
import axios from 'axios';
import { backendUrl } from '../../../utils/utils';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PaymentDetail = () => {
    const { id } = useParams();
    const [payment, setPayment] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/payments/${id}`)
            .then(response => {
                const fetchedPayment = response.data.data;
                setPayment(fetchedPayment);
                message.success('Payment details fetched successfully!');
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the payments!", error);
                message.error("Failed to fetch payment details.");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

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
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24} lg={24}>
                    <Card title={`Payment #${id}`} style={{ borderRadius: '2px', borderColor: colors.primary }}>
                        <Form layout="vertical">
                                <Form.Item label="Payer" name="payer" initialValue={payment.payer}>
                                    <Input placeholder={payment.payer} disabled/>
                                </Form.Item>
                                <Form.Item label="Reason" name="reason" initialValue={payment.reason}>
                                    <Input  placeholder={payment.reason} disabled/>
                                </Form.Item>
                                <Form.Item label="Event" name="event" initialValue={payment.event}>
                                    <Input  placeholder={payment.event} disabled/>
                                </Form.Item>
                                <Form.Item label="Artwork" name="artwork" initialValue={payment.artwork}>
                                    <Input  placeholder={payment.artwork} disabled/>
                                </Form.Item>
                                <Form.Item label="Amount" name="amount" initialValue={payment.amount}>
                                    <Input  placeholder={payment.amount} disabled/>
                                </Form.Item>
                                <Form.Item label="Date" name="date" initialValue={payment.date}>
                                    <Input  placeholder={payment.date} disabled/>
                                </Form.Item>
                                
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentDetail;
