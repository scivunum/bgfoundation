import React, { useState } from 'react';
import { Pagination, Typography} from 'antd';
import Timeline from '../components/timeline';
import FilterComponent from '../components/Filter';

import blog1 from '../assets/blog1.jpeg';
import blog2 from '../assets/blog2.jpeg';
import blog3 from '../assets/blog3.jpeg';
import blog4 from '../assets/blog4.jpeg';
import blog5 from '../assets/blog5.jpeg';
import blog6 from '../assets/blog6.jpeg';
const { Title } = Typography;

const EventPage = ({isloggedIn}) => {
    
    
    // Example timeline data (replace with actual data)
    const events = [
        {
            id: 1,
            date: '2023-01-01',
            title: 'Event Title 1',
            description: 'Description for Event 1',
            status:'ongoing',
            media: [
                { type: 'image', src: blog1, alt: 'Image 2' },
                { type: 'image', src: blog4, alt: 'Image 2' },
                { type: 'image', src: blog5, alt: 'Image 2' },
            ]
        },
        {
            id: 2,
            date: '2023-02-01',
            title: 'Event Title 2',
            description: 'Description for Event 2',
            status:'ended',
            media: [
                { type: 'image', src: blog3, alt: 'Image 2' },
                { type: 'image', src: blog2, alt: 'Image 2' },
                { type: 'image', src: blog6, alt: 'Image 2' },
            ]
        }
        ,
        {
            id: 2,
            date: '2023-02-01',
            title: 'Event Title 2',
            description: 'Description for Event 2',
            status:'coming soon',
            media: [
                { type: 'image', src: blog3, alt: 'Image 2' },
                { type: 'image', src: blog2, alt: 'Image 2' },
                { type: 'image', src: blog6, alt: 'Image 2' },
            ]
        }
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Number of artworks per page

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Function to filter artworks based on criteria
    const [filteredEvents, setFilteredEvents] = useState(events); // Initialize filtered artworks with all artworks

    const filterEvents = ({itemName, dateRange}) => {
        let filtered = events;
    
        // Filter by item name, author, price, and hashtags
        if (itemName ) {
            console.log(itemName, dateRange);
            const lowerItemName = (itemName && !(itemName==='')) ? itemName.toLowerCase() : '';
    
            filtered = filtered.filter(event => {
                const lowerTitle = event.title.toLowerCase();
    
                const matchesItemName = !itemName || lowerTitle.includes(lowerItemName) ||event.description.toLowerCase().includes(lowerItemName) || event.media.some((media) => media.alt.toLowerCase().includes(lowerItemName));
                
                // Check if the artwork matches the criteria
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
        <div className="container py-5 mt-4">
                <Title level={2} style={{ textAlign: 'center' }}>Events</Title>
                <FilterComponent onSearch={filterEvents} name={true} date={true} />
                {/* Timeline with filtered data */}
                <Timeline data={filteredEvents} startindex={startIndex} endIndex={endIndex} />
                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        current={currentPage}
                        total={filteredEvents.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </div>
                
            </div>
    );
};

export default EventPage;
