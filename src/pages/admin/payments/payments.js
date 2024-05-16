import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table, Breadcrumb, Button } from 'antd';
import { HomeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { colors } from '../../../components/style';
const { Content } = Layout;

const AdminPayments = () => {
    const navigate = useNavigate();
    const onEdit = () => {
        navigate('/admin/payments/add');
    };

    // Sample data for payments
    const payments = [
        { key: 1, payer: 'John Doe', reason: 'Ticket Purchase', event: 'Event 1', artwork: 'Artwork 1', amount: '$500000', date: '2022-01-01' },
        { key: 2, payer: 'Jane Smith', reason: 'Merchandise Purchase', event: 'Event 2', artwork: 'Artwork 2', amount: '$5000', date: '2022-01-02' },
    ];

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
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Artwork',
            dataIndex: 'artwork',
            key: 'artwork',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />} ></Button>
                </div>
            ),
        },
    ];

    // Function to filter payments based on criteria
    const [filteredPayments, setFilteredPayments] = useState(payments);

    const filterPayments = ({ itemName, dateRange, minPrice, maxPrice }) => {
        let filtered = payments;
    
        // Filter by item name, author, price, and hashtags
        if (itemName || minPrice || maxPrice) {
            const lowerItemName = (itemName && !(itemName === '')) ? itemName.toLowerCase() : '';
    
            filtered = filtered.filter(payment => {
                const lowerReason = payment.reason.toLowerCase();
                const lowerPayer = payment.payer.toLowerCase();
                const lowerEvent = payment.event.toLowerCase();
                const priceInt = parseInt(payment.amount.replace(/[^0-9]/g, ''), 10);
                const lowerArtwork = payment.artwork.toLowerCase();
    
                const matchesItemName = !itemName || lowerReason.includes(lowerItemName) || lowerPayer.includes(lowerItemName) || lowerEvent.includes(lowerItemName) || lowerArtwork.includes(lowerItemName);
                const matchesPrice = (!minPrice || priceInt >= parseInt(minPrice)) && (!maxPrice || priceInt <= parseInt(maxPrice));
    
                // Check if the payment matches the criteria
                return matchesItemName && matchesPrice;
            });
        }
    
        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate >= dateRange[0] && paymentDate <= dateRange[1];
            });
        }
    
        setFilteredPayments(filtered);
    };
    

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
                    <PlusOutlined onClick={onEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <FilterComponent onSearch={filterPayments} name={true} date={true} price={true}/>
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title="Payments" bordered={true} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={filteredPayments}
                                    columns={PaymentsColumns}
                                    onRow={(record) => ({
                                        style: {
                                            cursor: 'pointer',
                                        },
                                        onClick: () => {
                                            navigate(`/admin/payments/${record.key}`);
                                        },
                                    })}
                                    pagination={true}
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
