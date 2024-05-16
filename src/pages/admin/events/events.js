import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table, Breadcrumb, Button } from 'antd';
import { HomeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { colors } from '../../../components/style';
const { Content } = Layout;

const AdminEvents = () => {
    const navigate = useNavigate();
    const onEdit = () => {
        navigate('/admin/events/add');
    };

    const events = [
        { key: 1, title: 'Event 1', date: '2022-01-01', status: 'Upcoming', description: 'Description 1', artworks: 60 },
        { key: 2, title: 'Event 2', date: '2022-01-02', status: 'Completed', description: 'Description 2', artworks: 10 },
        { key: 3, title: 'Event 3', date: '2022-01-03', status: 'Cancelled', description: 'Description 3', artworks: 10 },
    ];

    const EventsColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Artworks',
            dataIndex: 'artworks',
            key: 'artworks',
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />}></Button>
                </div>
            ),
        },
    ];

    // Function to filter events based on criteria
    const [filteredEvents, setFilteredEvents] = useState(events);

    const filterEvents = ({ itemName, dateRange}) => {
        let filtered = events;

        // Filter by item name and status
        if (itemName) {
            const lowerItemName = (itemName && !(itemName === '')) ? itemName.toLowerCase() : '';

            filtered = filtered.filter(event => {
                const lowerTitle = event.title.toLowerCase();
                const matchesItemName = !itemName || lowerTitle.includes(lowerItemName) ||event.status.toLowerCase().includes(lowerItemName) || event.description.toLowerCase().includes(lowerItemName);
                
                // Check if the event matches the criteria
                return matchesItemName;
            });
        }

        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= dateRange[0] && eventDate <= dateRange[1];
            });
        }

        setFilteredEvents(filtered);
    };

    return (
        <div style={{ padding: '0 12px', marginTop: '70px', backgroundColor: 'white' }}>
            <Content style={{ padding: '0 2px' }}>
                <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<span>Events</span>) },
                        ]}
                    />
                    <PlusOutlined onClick={onEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <FilterComponent onSearch={filterEvents} name={true} date={true}/>
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title="Events" bordered={true} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={filteredEvents}
                                    columns={EventsColumns}
                                    onRow={(record) => ({
                                        style: {
                                            cursor: 'pointer',
                                        },
                                        onClick: () => {
                                            navigate(`/admin/events/${record.key}`);
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

export default AdminEvents;
