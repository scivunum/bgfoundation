import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table, Breadcrumb, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { colors } from '../../../components/style';
import { backendUrl } from '../../../utils/utils';
import LoadingSpinner from '../../../components/LoadingSpinner';

const { Content } = Layout;

const AdminPayments = () => {
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/payments/`)
            .then(response => {
                const fetchedPayments = response.data.data;
                setPayments(fetchedPayments);
                setFilteredPayments(fetchedPayments);
                message.success("Payments fetched!");
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the payments!", error);
                message.error("There was an error fetching the payments!");
                setIsLoading(false);
            });
    }, []);
    const deletePayment = (id) => {
        axios.delete(`${backendUrl}/api/v1/payments/harddelete/${id}`)
            .then(response => {
                console.log(response);
                const newPayments = payments.filter(payment => payment._id !== id);
                setPayments(newPayments);
                setFilteredPayments(newPayments);
                message.success("Payment deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the payment!", error);
                message.error("There was an error deleting the payment!", 5);
            });
    }

    const PaymentsColumns = [
        {
            title: 'Payer',
            dataIndex: 'payer',
            key: 'payer',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Event',
            dataIndex: 'event_id',
            key: 'event_id',
        },
        {
            title: 'Artwork',
            dataIndex: 'artwork_id',
            key: 'artwork_id',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />} onClick={() => deletePayment(record._id)} />
                </div>
            ),
        },
    ];

    const filterPayments = ({ itemName, dateRange, minPrice, maxPrice }) => {
        let filtered = payments;

        if (itemName) {
            filtered = filtered.filter(payment => 
                payment.payer.toLowerCase().includes(itemName.toLowerCase()) ||
                payment.reason.toLowerCase().includes(itemName.toLowerCase()) ||
                payment.event.toLowerCase().includes(itemName.toLowerCase()) ||
                payment.artwork.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate >= startDate && paymentDate <= endDate;
            });
        }

        if (minPrice !== undefined && minPrice !== null) {
            filtered = filtered.filter(payment => payment.amount >= minPrice);
        }

        if (maxPrice !== undefined && maxPrice !== null) {
            filtered = filtered.filter(payment => payment.amount <= maxPrice);
        }

        setFilteredPayments(filtered);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div style={{ padding: '0 12px', marginTop: '70px', backgroundColor: 'white' }}>
            <Content style={{ padding: '0 2px' }}>
                <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<span>Payments</span>) },
                        ]}
                    />
                </div>
                <FilterComponent onSearch={filterPayments} name={true} date={true} price={true} />
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title="Payments" bordered={true} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={filteredPayments}
                                    columns={PaymentsColumns}
                                    pagination={true}
                                    onRow={(record) => {
                                        return {
                                            onClick: event => {
                                                navigate(`/admin/payments/${record._id}`);
                                            },
                                        };
                                    }}
                                    rowClassName="editable-row"
                                    scroll={{ x: 'max-content' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </div>
    );
};

export default AdminPayments;
