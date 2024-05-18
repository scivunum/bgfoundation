import React from 'react';
import { Layout, Card, Row, Col, Table,Breadcrumb} from 'antd';
import { colors } from '../../components/style';
import { HomeOutlined, UserOutlined, DollarOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const AdminDashboard = () => {
    // Dummy data for recent payments
    const recentPaymentsData = [
        { id: 1, user: 'User 1', amount: '$100',reason: 'unknown', date: '2024-05-01' },
        { id: 2, user: 'User 2', amount: '$50', reason: 'known',date: '2024-05-05' },
        // Add more recent payments data as needed
    ];

    // Dummy data for recent artworks
    const recentArtworksData = [
        { id: 1, artist: 'Artwork 1', price: '$200', date: '2024-05-01' },
        { id: 2, artist: 'Artwork 2', price: '$150', date: '2024-05-05' },
        // Add more recent artworks data as needed
    ];

    // Dummy data for recent users
    const recentUsersData = [
        { id: 1, name: 'User 1', location: 'Location 1', date: '2024-05-01' },
        { id: 2, name: 'User 2', location: 'Location 2', date: '2024-05-05' },
        // Add more recent users data as needed
    ];

    // Columns configuration for recent payments table
    const recentPaymentsColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'User', dataIndex: 'user', key: 'user' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Reason', dataIndex: 'reason', key: 'reason' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
    ];

    // Columns configuration for recent artworks table
    const recentArtworksColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Artists', dataIndex: 'artist', key: 'artist' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
    ];

    // Columns configuration for recent users table
    const recentUsersColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
    ];

    return (
        <div style={{ padding: '0px 12px', marginTop: "70px", backgroundColor: 'whitesmoke' }}>
            <Content style={{ padding: '0 2px'}} >
                <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            {title: (<Link to='/'><HomeOutlined /></Link>)},
                            {title: (<Link to='/admin'> <span>Admin</span></Link>)},
                            {title: (<><span>DashBoard</span></>)},]}
                            />
                </div>
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row gutter={8}>
                        <Col span={8} className='p-0'>
                            <Card title="Users" hoverable className='m-1' bordered={false} extra={<UserOutlined />} style={{ textAlign: 'center', borderRadius: '2px' }}>
                                1000
                            </Card>
                        </Col>
                        <Col span={8} className='p-0'>
                            <Card title="Payments" hoverable className='m-1' bordered={false} extra={<DollarOutlined />} style={{ textAlign: 'center', borderRadius: '2px' }}>
                                $5000
                            </Card>
                        </Col>
                        <Col span={8} className='p-0'>
                            <Card title="Artworks" hoverable className='m-1' bordered={false} extra={<ProfileOutlined />} style={{ textAlign: 'center', borderRadius: '2px' }}>
                                500
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Card title="Recent Payments" bordered={false} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={recentPaymentsData}
                                    columns={recentPaymentsColumns}
                                    pagination={true}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Card title="Recent Artworks" bordered={false} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={recentArtworksData}
                                    columns={recentArtworksColumns}
                                    pagination={true}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Card title="Recent Users" bordered={false} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={recentUsersData}
                                    columns={recentUsersColumns}
                                    pagination={true}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </div>
    );
};

export default AdminDashboard;
