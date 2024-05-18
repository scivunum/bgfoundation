import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table, Breadcrumb, Avatar, Button } from 'antd';
import { HomeOutlined, PlusOutlined,DeleteOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { colors } from '../../../components/style';

const { Content } = Layout;

const AdminUsers = () => {
    const navigate = useNavigate();

    const onAddUser = () => {
        // Redirect to add user page
        navigate('/admin/users/add');
    };

    // Dummy data for users (replace with actual data)
    const users = [
        { 
            key: 1, 
            name: 'John Doe', 
            email: 'john@example.com', 
            role: 'Admin', 
            status: 'Active', 
            profilePic: 'https://via.placeholder.com/150', 
            dateJoined: '2022-01-01', 
            auctionsParticipated: '10', 
            artworksUploaded: '5', 
            artworksBought: '3', 
            phoneNumber: '1234567890', 
            address: '123 Main St, City, Country' 
        },
        { 
            key: 2, 
            name: 'Johnny Dvdvdvoe', 
            email: 'john@exavddvmple.com', 
            role: 'Artist', 
            status: 'Active', 
            profilePic: 'https://via.placeholder.com/150', 
            dateJoined: '2022-01-02', 
            auctionsParticipated: '10', 
            artworksUploaded: '5', 
            artworksBought: '3', 
            phoneNumber: '1234567890', 
            address: '123 Main St, City, Country' 
        },
        // Add more user data as needed...
    ];

    // Columns configuration for the user table
    const columns = [
        {
            title: 'Profile Pic',
            dataIndex: 'profilePic',
            key: 'profilePic',
            render: (profilePic) => <Avatar src={profilePic} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date Joined',
            dataIndex: 'dateJoined',
            key: 'dateJoined',
        },
        {
            title: 'Auctions Participated',
            dataIndex: 'auctionsParticipated',
            key: 'auctionsParticipated',
        },
        {
            title: 'Artworks Uploaded',
            dataIndex: 'artworksUploaded',
            key: 'artworksUploaded',
        },
        {
            title: 'Artworks Bought',
            dataIndex: 'artworksBought',
            key: 'artworksBought',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />}></Button>
                </div>
            ),
        },
    ];

    // State to hold filtered users
    const [filteredUsers, setFilteredUsers] = useState(users);
    // Function to filter users based on criteria
    const filterUsers = ({ itemName, dateRange }) => {
        let filtered = users;
    
        if (itemName || dateRange) {
            filtered = filtered.filter(user => {
                const lowerName = user.name.toLowerCase();
                const lowerEmail = user.email.toLowerCase();
                const lowerRole = user.role.toLowerCase();
                const lowerStatus = user.status.toLowerCase();
                const artworksUploaded = user.artworksUploaded;
                const artworksBought = user.artworksBought;
                const auctionsParticipated = user.auctionsParticipated;
                const address = user.address.toLowerCase();
                const phoneNumber = user.phoneNumber;
    
                const matchesName = !itemName || lowerName.includes(itemName.toLowerCase());
                const matchesEmail = !itemName || lowerEmail.includes(itemName.toLowerCase());
                const matchesRole = !itemName || lowerRole.includes(itemName.toLowerCase());
                const matchesStatus = !itemName || lowerStatus.includes(itemName.toLowerCase());
                const matchesAddress = !itemName || address.includes(itemName.toLowerCase());
                const matchesPhoneNumber = !itemName || phoneNumber.includes(itemName.toLowerCase());
                const matchesartworksUploaded = !itemName || artworksUploaded.includes(itemName.toLowerCase());
                const matchesartworksBought = !itemName || artworksBought.includes(itemName.toLowerCase());
                const matchesauctionsParticipated = !itemName || auctionsParticipated.includes(itemName.toLowerCase());
                const matchesDate = !dateRange || (new Date(user.dateJoined) >= dateRange[0] && new Date(user.dateJoined) <= dateRange[1]);
    
                return matchesName || matchesEmail || matchesRole || matchesStatus || matchesAddress || matchesPhoneNumber ||matchesartworksBought ||matchesartworksUploaded ||matchesauctionsParticipated || matchesDate;
            });
        }
    
        setFilteredUsers(filtered);
    };
    


    return (
        <div style={{ padding: '0 12px', marginTop: '70px', backgroundColor: 'white' }}>
            <Content style={{ padding: '0 2px' }}>
                <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<span>Users</span>) },
                        ]}
                    />
                    <PlusOutlined onClick={onAddUser} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <FilterComponent onSearch={filterUsers} name={true} date={true} />
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title="Users" bordered={true} style={{ borderRadius: '2px'}}>
                                <Table
                                    dataSource={filteredUsers}
                                    columns={columns}
                                    onRow={(record) => ({
                                        style: {
                                            cursor: 'pointer',
                                        },
                                        onClick: () => {
                                            navigate(`/admin/users/${record.key}`);
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

export default AdminUsers;
