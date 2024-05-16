import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Image, Card, Pagination, Button } from 'antd';
import FilterComponent from '../components/Filter';
import { Link } from 'react-router-dom';
import blog1 from '../assets/blog1.jpeg';
import blog2 from '../assets/blog2.jpeg';
import blog3 from '../assets/blog3.jpeg';
import blog4 from '../assets/blog4.jpeg';
import blog5 from '../assets/blog5.jpeg';
import blog6 from '../assets/blog6.jpeg';

const { Title, Paragraph } = Typography;

const Event = () => {
    // Sample artwork data
    const eventtitle ='EVENT TEST 1';
    const eventstart = '2020-03-15';
    const eventend = '2024-04-30';
    const artworks = [
        { id:1, title: 'Artwork 1', imageUrl: blog4, date: '2022-01-01', author: 'Artist 1', hashtags: ['#abstract', '#modern', '#colorful'], price:'$500' },
        { id:2, title: 'Artwork 2', imageUrl: blog3, date: '2025-01-02', author: 'Artist 2', hashtags: ['#portrait', '#classic', '#monochrome'], price:'$500' },
        { id:3, title: 'Artwork 3', imageUrl: blog5, date: '2022-01-03', author: 'Artist 3', hashtags: ['#landscape', '#impressionist', '#scenic'], price:'$500' },
        { id:4, title: 'Artwork 4', imageUrl: blog6, date: '2026-01-04', author: 'Artist 4', hashtags: ['#abstract', '#surreal', '#dreamy'], price:'$500' },
        { id:5, title: 'Artwork 5', imageUrl: blog5, date: '2022-01-05', author: 'Artist 5', hashtags: ['#modern', '#geometric', '#vibrant'], price:'$500' },
        { id:6, title: 'Artwork 6', imageUrl: blog6, date: '2022-01-06', author: 'Artist 6', hashtags: ['#portrait', '#realism', '#expressive'], price:'$500' },
        { id:7, title: 'Artwork 7', imageUrl: blog4, date: '2022-01-07', author: 'Artist 7', hashtags: ['#landscape', '#naturalistic', '#serene'], price:'$500' },
        { id:8, title: 'Artwork 8', imageUrl: blog3, date: '2022-01-08', author: 'Artist 8', hashtags: ['#abstract', '#futuristic', '#dynamic'], price:'$500' },
        { id:9, title: 'Artwork 9', imageUrl: blog2, date: '2022-01-09', author: 'Artist 9', hashtags: ['#modern', '#minimalist', '#sophisticated'], price:'$500' },
        { id:10, title: 'Artwork 10', imageUrl: blog1, date: '2022-01-10', author: 'Artist 10', hashtags: ['#portrait', '#contemporary', '#provocative'], price:'$500' },
        { id:11, title: 'Artwork 11', imageUrl: blog2, date: '2022-01-11', author: 'Artist 11', hashtags: ['#landscape', '#abstracted', '#ethereal'], price:'$500' },
        { id:12, title: 'Artwork 12', imageUrl: blog3, date: '2022-01-12', author: 'Artist 12', hashtags: ['#abstract', '#organic', '#flowing'], price:'$500' },
        { id:13, title: 'Artwork 13', imageUrl: blog4, date: '2022-01-13', author: 'Artist 13', hashtags: ['#modern', '#digital', '#experimental'], price:'$500' },
        { id:14, title: 'Artwork 14', imageUrl: blog5, date: '2022-01-14', author: 'Artist 14', hashtags: ['#portrait', '#symbolic', '#introspective'], price:'$500' },
        { id:15, title: 'Artwork 15', imageUrl: blog6, date: '2022-01-15', author: 'Artist 15', hashtags: ['#landscape', '#realistic', '#detailed'], price:'$500' },
        { id:16, title: 'Artwork 16', imageUrl: blog2, date: '2022-01-16', author: 'Artist 16', hashtags: ['#abstract', '#fluid', '#energetic'], price:'$500' },
        { id:17, title: 'Artwork 17', imageUrl: blog4, date: '2022-01-17', author: 'Artist 17', hashtags: ['#modern', '#surrealist', '#intriguing'], price:'$500' },
        { id:18, title: 'Artwork 18', imageUrl: blog6, date: '2022-01-18', author: 'Artist 18', hashtags: ['#portrait', '#emotive', '#introspective'], price:'$500' },
        { id:19, title: 'Artwork 19', imageUrl: blog3, date: '2022-01-19', author: 'Artist 19', hashtags: ['#landscape', '#expressionist', '#bold'], price:'$500' },
        { id:20, title: 'Artwork 20', imageUrl: blog5, date: '2022-01-20', author: 'Artist 20', hashtags: ['#abstract', '#geometric', '#structured'], price:'$500' },
        { id:21, title: 'Artwork 21', imageUrl: blog1, date: '2022-01-21', author: 'Artist 21', hashtags: ['#modern', '#experimental', '#avant-garde'], price:'$500' },
        { id:22, title: 'Artwork 22', imageUrl: blog2, date: '2022-01-22', author: 'Artist 22', hashtags: ['#portrait', '#interpretive', '#personal'], price:'$500' },
        { id:23, title: 'Artwork 23', imageUrl: blog4, date: '2022-01-23', author: 'Artist 23', hashtags: ['#landscape', '#abstract', '#atmospheric'], price:'$500' },
        { id:24, title: 'Artwork 24', imageUrl: blog6, date: '2022-01-24', author: 'Artist 24', hashtags: ['#abstract', '#experimental', '#textured'], price:'$500' },
        { id:25, title: 'Artwork 25', imageUrl: blog1, date: '2022-01-25', author: 'Artist 25', hashtags: ['#modern', '#conceptual', '#provocative'], price:'$500' },
        { id:26, title: 'Artwork 26', imageUrl: blog2, date: '2022-01-26', author: 'Artist 26', hashtags: ['#portrait', '#stylized', '#sensitive'], price:'$500' },
        { id:27, title: 'Artwork 27', imageUrl: blog3, date: '2022-01-27', author: 'Artist 27', hashtags: ['#landscape', '#realistic', '#majestic'], price:'$500' },
        { id:28, title: 'Artwork 28', imageUrl: blog4, date: '2022-01-28', author: 'Artist 28', hashtags: ['#abstract', '#dynamic', '#kinetic'], price:'$500' },
        { id:29, title: 'Artwork 29', imageUrl: blog5, date: '2022-01-29', author: 'Artist 29', hashtags: ['#modern', '#experimental', '#bold'], price:'$500' },
        { id:30, title: 'Artwork 30', imageUrl: blog6, date: '2022-01-30', author: 'Artist 30', hashtags: ['#portrait', '#introspective', '#symbolic'], price:'$500' }
      ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Number of events per page

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Function to filter events based on criteria
    const [filteredArtworks, setFilteredArtworks] = useState(artworks); // Initialize filtered events with all events

    const filterArtworks = ({ itemName, dateRange, minPrice, maxPrice }) => {
        let filtered = artworks;

        // Filter by item name, organizer, price, and hashtags
        if (itemName || minPrice || maxPrice) {
            const lowerItemName = itemName ? itemName.toLowerCase() : '';

            filtered = filtered.filter(event => {
                const lowerTitle = event.title.toLowerCase();
                const lowerOrganizer = event.organizer.toLowerCase();
                const priceInt = parseInt(event.price.replace(/[^0-9]/g, ''), 10);
                const lowerTags = event.hashtags.map(tag => tag.toLowerCase());

                const matchesItemName = !itemName || lowerTitle.includes(lowerItemName) || lowerOrganizer.includes(lowerItemName) || lowerTags.some(tag => lowerItemName.includes(tag));

                // Check if the event matches the criteria
                return matchesItemName && (!minPrice || priceInt >= parseInt(minPrice)) && (!maxPrice || priceInt <= parseInt(maxPrice));
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
    const [timeleft, setTimeLeft] = useState([]);
    const now = new Date();
    const eventStart = new Date(eventstart);
    const eventEnd = new Date(eventend);
    const getTimeLeft = () => {
        if (eventStart > now) {
            const timeDiff = eventStart - now;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeLeft([`Upcoming - ${days}d ${hours}h ${minutes}m ${seconds}s left`, 'info']);
        } else if (eventEnd < now) {
            const timeDiff = now - eventEnd;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeLeft([`Ended - Ended ${days}d ${hours}h ${minutes}m ${seconds}s ago`, 'danger']);
        } else {
            const timeDiff = eventEnd - now;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeLeft([`Ongoing - ${days}d ${hours}h ${minutes}m ${seconds}s left`, 'success']);
        }
    };

    // Fetch the artwork details based on the ID
    // You can fetch the details from your data source or API
    useEffect(() => {
        getTimeLeft();
    }, [eventStart, eventEnd]);

    return (
        <div style={{ padding: '24px', paddingTop: "80px", backgroundColor: 'white' }}>
            <Title level={2} className='mt-4'>{eventtitle}</Title>
            <Paragraph>
                Find your next event here
            </Paragraph>
            <Paragraph className={`text-${timeleft[1]}`}>
                {timeleft[0]}
            </Paragraph>
            <FilterComponent onSearch={filterArtworks} name={true} date={true} price={true} />
            <Row gutter={[16, 16]}>
                {timeleft[1] === 'success'?
                    filteredArtworks.slice(startIndex, endIndex).map((artwork, index) => (
                        <Col key={index} xs={12} sm={6} lg={4}>
                            <Link to={`/artworks/${artwork.id}`} className='text-dark text-decoration-none'>
                                <Card
                                    hoverable
                                    style={{ borderRadius: '1px', height: '240px' }}
                                    cover={<Image src={artwork.imageUrl} style={{ borderRadius: '1px', height: '130px' }} alt="event" preview={false} />}
                                >
                                    <Card.Meta
                                        title={artwork.title}
                                        description={`By ${artwork.author}`}
                                    />
                                    <Link to={`/artworks/${artwork.id}`} className='mt-1 text-decoration-none'>
                                        <Button className={`text-success`}>
                                            Place Bid
                                        </Button>
                                    </Link>
                                </Card>
                            </Link>
                        </Col>
                    ))
                :
                <Paragraph className={`text-${timeleft[1]}`}>
                    {timeleft[0]}
                </Paragraph>
                }
                
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    current={currentPage}
                    total={filteredArtworks.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Event;
