import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table, Breadcrumb, Button, message } from 'antd';
import { HomeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { backendUrl } from '../../../utils/utils'; // Import backendUrl for the API endpoint
import { colors } from '../../../components/style';
import LoadingSpinner from '../../../components/LoadingSpinner';

const { Content } = Layout;

const AdminArtworks = () => {
    const navigate = useNavigate();
    const [artworks, setArtworks] = useState([]);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] = useState(1);

    useEffect(() => {
        const dummyArtworks = [
            { key: 1, name: 'Artwork 1', createdAt: '2022-01-01', artist_id: 'Artist 1', price: 500, current_bid: 450, bought: false, event_id: null },
            { key: 2, name: 'Artwork 2', createdAt: '2022-01-02', artist_id: 'Artist 2', price: 700, current_bid: 650, bought: true, event_id: null },
            // ... (other dummy artworks)
        ];
        axios.get(`${backendUrl}/api/v1/artworks`)
            .then(response => {
                const fetchedArtworks = response.data.data;
                if (fetchedArtworks.length === 0) {
                    setArtworks(dummyArtworks);
                    setFilteredArtworks(dummyArtworks);
                    setDisplay(0);
                } else {
                    setArtworks(fetchedArtworks);
                    setFilteredArtworks(fetchedArtworks);
                    setDisplay(1);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the artworks!", error);
                setArtworks(dummyArtworks);
                setFilteredArtworks(dummyArtworks);
                setIsLoading(false);
                setDisplay(0);
            });
    }, []);

    const onEdit = () => {
        navigate('/admin/artworks/add');
    };

    const deleteArtwork = (id) => {
        axios.delete(`${backendUrl}/api/v1/artworks/harddelete/${id}`)
            .then(response => {
                console.log(response);
                const newArtworks = artworks.filter(artwork => artwork._id !== id);
                setArtworks(newArtworks);
                setFilteredArtworks(newArtworks);
                message.success("Artwork deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the artwork!", error);
                message.error("There was an error deleting the artwork!", 5);
            });
    }

    const ArtworksColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={() => navigate(`/admin/artworks/${record._id}`)}>{record.name} </Button>
                </div>
            ),
        },
        {
            title: 'Artist',
            dataIndex: 'artist_id',
            key: 'artist_id',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Current Bid',
            dataIndex: 'current_bid',
            key: 'current_bid',
        },
        {
            title: 'Bought',
            dataIndex: 'bought',
            key: 'bought',
            render: bought => (bought ? 'Yes' : 'No')
        },
        {
            title: 'Event ID',
            dataIndex: 'event_id',
            key: 'event_id',
            render: event_id => (event_id ? event_id : 'N/A')
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />} onClick={() => deleteArtwork(record._id)} />
                </div>
            ),
        },
    ];

    const filterArtworks = ({ itemName, dateRange, minPrice, maxPrice }) => {
        let filtered = artworks;

        // Filter by item name, artist, and price
        if (itemName || minPrice || maxPrice) {
            const lowerItemName = itemName ? itemName.toLowerCase() : '';
            filtered = filtered.filter(artwork => {
                const lowerName = artwork.name.toLowerCase();
                const lowerArtistId = artwork.artist_id.toLowerCase();
                const priceInt = parseInt(artwork.price, 10);

                const matchesItemName = !itemName || lowerName.includes(lowerItemName) || lowerArtistId.includes(lowerItemName);
                const matchesPrice = (!minPrice || priceInt >= parseInt(minPrice, 10)) && (!maxPrice || priceInt <= parseInt(maxPrice, 10));

                return matchesItemName && matchesPrice;
            });
        }

        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(artwork => {
                const artworkDate = new Date(artwork.createdAt);
                return artworkDate >= dateRange[0] && artworkDate <= dateRange[1];
            });
        }

        setFilteredArtworks(filtered);
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
                <FilterComponent onSearch={filterArtworks} name={true} date={true} price={true} />
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title={`Artworks - ${filteredArtworks.length}`} bordered={true} style={{ borderRadius: '2px'}}>
                                Add an artwork.
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
                            { title: (<span>Artworks</span>) },
                        ]}
                    />
                    <PlusOutlined onClick={onEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <FilterComponent onSearch={filterArtworks} name={true} date={true} price={true} />
                <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title={`Artworks - ${filteredArtworks.length}`} bordered={true} style={{ borderRadius: '2px'}}>
                                <Table
                                    dataSource={filteredArtworks}
                                    columns={ArtworksColumns}
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

export default AdminArtworks;
