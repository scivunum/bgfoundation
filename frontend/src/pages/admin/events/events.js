import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table, Breadcrumb, Button } from 'antd';
import { HomeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { colors } from '../../../components/style';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { backendUrl } from '../../../utils/utils'; // Import backendUrl for the API endpoint

const { Content } = Layout;

const AdminEvents = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [display, setDisplay] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${backendUrl}/api/v1/events`)
            .then(response => {
                console.log("Events fetched:", response.data.data);
                if (response.data.data.length === 0) {
                    setDisplay(0);
                } else {
                    setEvents(response.data.data);
                    setFilteredEvents(response.data.data);
                    setDisplay(1);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setIsLoading(false);
                setDisplay(0);
            });
    }, []);

    const onEdit = () => {
        navigate('/admin/events/add');
    };

    const deleteEvent = (id) => {
        axios.delete(`${backendUrl}/api/v1/events/${id}`)
            .then(response => {
                console.log(response);
                const newEvents = events.filter(event => event._id !== id);
                setEvents(newEvents);
                setFilteredEvents(newEvents);
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    };

    const EventsColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
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
                    <Button type="primary" icon={<DeleteOutlined />} onClick={() => deleteEvent(record._id)} />
                </div>
            ),
        },
    ];

    const filterEvents = ({ itemName, dateRange }) => {
        let filtered = events;

        if (itemName) {
            const lowerItemName = itemName.toLowerCase();
            filtered = filtered.filter(event => {
                const lowerName = event.name.toLowerCase();
                const matchesItemName = lowerName.includes(lowerItemName);
                return matchesItemName;
            });
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.start_date);
                return eventDate >= dateRange[0] && eventDate <= dateRange[1];
            });
        }

        setFilteredEvents(filtered);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (display === 0) {
        return (
            <div style={{ padding: '0 12px', marginTop: '70px', backgroundColor: 'white' }}>
            <Content style={{ padding: '0 2px' }}>
                <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<span>Artworks</span>) },
                        ]}
                    />
                    <PlusOutlined onClick={onEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <FilterComponent onSearch={filterEvents} name={true} date={true} price={true} />
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title={`Events - ${filteredEvents.length}`} bordered={true} style={{ borderRadius: '2px'}}>
                                Add an Event.
                                <PlusOutlined onClick={onEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </div>
        );
    }

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
                <FilterComponent onSearch={filterEvents} name={true} date={true} />
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title="Events" bordered={true} style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={filteredEvents}
                                    columns={EventsColumns}
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
