import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Card, Row, Col, Table,Breadcrumb, Button} from 'antd';
import { HomeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FilterComponent from '../../../components/Filter';
import { colors } from '../../../components/style';
import blog1 from '../../../assets/blog1.jpeg';
import blog2 from '../../../assets/blog2.jpeg';
import blog3 from '../../../assets/blog3.jpeg';
import blog4 from '../../../assets/blog4.jpeg';
import blog5 from '../../../assets/blog5.jpeg';
import blog6 from '../../../assets/blog6.jpeg';

const { Content } = Layout;

const AdminArtworks = () => {
    const navigate = useNavigate();
    const onEdit = () => {
        navigate('/admin/artworks/add');
    };
    const artworks = [
        { key:1, title: 'Artwork 1', imageUrl: blog4, date: '2022-01-01', author: 'Artist 1', hashtags: ['#abstract', '#modern', '#colorful'], price:'$500' },
        { key:2, title: 'Artwork 2', imageUrl: blog3, date: '2022-01-02', author: 'Artist 2', hashtags: ['#portrait', '#classic', '#monochrome'], price:'$500' },
        { key:3, title: 'Artwork 3', imageUrl: blog5, date: '2022-01-03', author: 'Artist 3', hashtags: ['#landscape', '#impressionist', '#scenic'], price:'$500' },
        { key:4, title: 'Artwork 4', imageUrl: blog6, date: '2022-01-04', author: 'Artist 4', hashtags: ['#abstract', '#surreal', '#dreamy'], price:'$500' },
        { key:5, title: 'Artwork 5', imageUrl: blog5, date: '2022-01-05', author: 'Artist 5', hashtags: ['#modern', '#geometric', '#vibrant'], price:'$500' },
        { key:6, title: 'Artwork 6', imageUrl: blog6, date: '2022-01-06', author: 'Artist 6', hashtags: ['#portrait', '#realism', '#expressive'], price:'$500' },
        { key:7, title: 'Artwork 7', imageUrl: blog4, date: '2022-01-07', author: 'Artist 7', hashtags: ['#landscape', '#naturalistic', '#serene'], price:'$500' },
        { key:8, title: 'Artwork 8', imageUrl: blog3, date: '2022-01-08', author: 'Artist 8', hashtags: ['#abstract', '#futuristic', '#dynamic'], price:'$500' },
        { key:9, title: 'Artwork 9', imageUrl: blog2, date: '2022-01-09', author: 'Artist 9', hashtags: ['#modern', '#minimalist', '#sophisticated'], price:'$500' },
        { key:10, title: 'Artwork 10', imageUrl: blog1, date: '2022-01-10', author: 'Artist 10', hashtags: ['#portrait', '#contemporary', '#provocative'], price:'$500' },
        { key:11, title: 'Artwork 11', imageUrl: blog2, date: '2022-01-11', author: 'Artist 11', hashtags: ['#landscape', '#abstracted', '#ethereal'], price:'$500' },
        { key:12, title: 'Artwork 12', imageUrl: blog3, date: '2022-01-12', author: 'Artist 12', hashtags: ['#abstract', '#organic', '#flowing'], price:'$500' },
        { key:13, title: 'Artwork 13', imageUrl: blog4, date: '2022-01-13', author: 'Artist 13', hashtags: ['#modern', '#digital', '#experimental'], price:'$500' },
        { key:14, title: 'Artwork 14', imageUrl: blog5, date: '2022-01-14', author: 'Artist 14', hashtags: ['#portrait', '#symbolic', '#introspective'], price:'$500' },
        { key:15, title: 'Artwork 15', imageUrl: blog6, date: '2022-01-15', author: 'Artist 15', hashtags: ['#landscape', '#realistic', '#detailed'], price:'$500' },
        { key:16, title: 'Artwork 16', imageUrl: blog2, date: '2022-01-16', author: 'Artist 16', hashtags: ['#abstract', '#fluid', '#energetic'], price:'$500' },
        { key:17, title: 'Artwork 17', imageUrl: blog4, date: '2022-01-17', author: 'Artist 17', hashtags: ['#modern', '#surrealist', '#intriguing'], price:'$500' },
        { key:18, title: 'Artwork 18', imageUrl: blog6, date: '2022-01-18', author: 'Artist 18', hashtags: ['#portrait', '#emotive', '#introspective'], price:'$500' },
        { key:19, title: 'Artwork 19', imageUrl: blog3, date: '2022-01-19', author: 'Artist 19', hashtags: ['#landscape', '#expressionist', '#bold'], price:'$500' },
        { key:20, title: 'Artwork 20', imageUrl: blog5, date: '2022-01-20', author: 'Artist 20', hashtags: ['#abstract', '#geometric', '#structured'], price:'$500' },
        { key:21, title: 'Artwork 21', imageUrl: blog1, date: '2022-01-21', author: 'Artist 21', hashtags: ['#modern', '#experimental', '#avant-garde'], price:'$500' },
        { key:22, title: 'Artwork 22', imageUrl: blog2, date: '2022-01-22', author: 'Artist 22', hashtags: ['#portrait', '#interpretive', '#personal'], price:'$500' },
        { key:23, title: 'Artwork 23', imageUrl: blog4, date: '2022-01-23', author: 'Artist 23', hashtags: ['#landscape', '#abstract', '#atmospheric'], price:'$500' },
        { key:24, title: 'Artwork 24', imageUrl: blog6, date: '2022-01-24', author: 'Artist 24', hashtags: ['#abstract', '#experimental', '#textured'], price:'$500' },
        { key:25, title: 'Artwork 25', imageUrl: blog1, date: '2022-01-25', author: 'Artist 25', hashtags: ['#modern', '#conceptual', '#provocative'], price:'$500' },
        { key:26, title: 'Artwork 26', imageUrl: blog2, date: '2022-01-26', author: 'Artist 26', hashtags: ['#portrait', '#stylized', '#sensitive'], price:'$500' },
        { key:27, title: 'Artwork 27', imageUrl: blog3, date: '2022-01-27', author: 'Artist 27', hashtags: ['#landscape', '#realistic', '#majestic'], price:'$500' },
        { key:28, title: 'Artwork 28', imageUrl: blog4, date: '2022-01-28', author: 'Artist 28', hashtags: ['#abstract', '#dynamic', '#kinetic'], price:'$500' },
        { key:29, title: 'Artwork 29', imageUrl: blog5, date: '2022-01-29', author: 'Artist 29', hashtags: ['#modern', '#experimental', '#bold'], price:'$500' },
        { key:30, title: 'Artwork 30', imageUrl: blog6, date: '2022-01-30', author: 'Artist 30', hashtags: ['#portrait', '#introspective', '#symbolic'], price:'$500' }
      ];
    
    const ArtworksColumns = [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Artist',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />}></Button>
                </div>
            ),
        },
    ];
    // Function to filter artworks based on criteria
    const [filteredArtworks, setFilteredArtworks] = useState(artworks); // Initialize filtered artworks with all artworks

    const filterArtworks = ({itemName, dateRange, minPrice, maxPrice}) => {
        let filtered = artworks;
    
        // Filter by item name, author, price, and hashtags
        if (itemName || minPrice || maxPrice) {
            const lowerItemName = (itemName && !(itemName==='')) ? itemName.toLowerCase() : '';
    
            filtered = filtered.filter(artwork => {
                const lowerTitle = artwork.title.toLowerCase();
                const lowerAuthor = artwork.author.toLowerCase();
                const priceInt = parseInt(artwork.price.replace(/[^0-9]/g, ''), 10);
                console.log(priceInt, minPrice, maxPrice);
                console.log(priceInt >= parseInt(minPrice) && priceInt <= parseInt(maxPrice));
                const lowerTags = artwork.hashtags.map(tag => tag.toLowerCase());
    
                const matchesItemName = !itemName || lowerTitle.includes(lowerItemName) || lowerAuthor.includes(lowerItemName) || lowerTags.some(tag => lowerItemName.includes(tag));
                
                // Check if the artwork matches the criteria
                return matchesItemName && (priceInt >= parseInt(minPrice) && priceInt <= parseInt(maxPrice));
            });
        }
    
        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(artwork => {
                const artworkDate = new Date(artwork.date);
                return artworkDate >= dateRange[0] && artworkDate <= dateRange[1];
            });
        }
    
        setFilteredArtworks(filtered);
    };

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
                            <Card title="Artworks" bordered={true} style={{ borderRadius: '2px'}}>
                                <Table
                                    dataSource={filteredArtworks}
                                    columns={ArtworksColumns}
                                    onRow={(record) => ({
                                        style: {
                                            cursor: 'pointer',
                                        },
                                        onClick: () => {
                                            navigate(`/admin/artworks/${record.key}`);
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

export default AdminArtworks;
