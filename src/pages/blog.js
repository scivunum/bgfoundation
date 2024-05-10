import React, { useState} from 'react';
import { Row, Col, Card, Typography,Image, Pagination,Avatar } from 'antd';
import FilterComponent from '../components/Filter';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import blog1 from '../assets/blog1.jpeg';
import blog2 from '../assets/blog2.jpeg';
import blog3 from '../assets/blog3.jpeg';
import blog4 from '../assets/blog4.jpeg';
import blog5 from '../assets/blog5.jpeg';
import blog6 from '../assets/blog6.jpeg';

import { Link } from 'react-router-dom';
const { Title} = Typography;

const BlogPage = ({isloggedIn}) => {
    // Dummy blog data
    const blogs = [
        {
            id: 1,
            title: 'How to Start a Blog',
            author: 'Jane Doe',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
            date:'2022-01-01',
            image:blog1
        },
        {
            id: 2,
            title: 'Top 10 Blogging Tips for Beginners',
            author: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
            date:'2024-01-01',
            image:blog2
        },
        {
            id: 3,
            title: 'Top 10 Blogging Tips for Beginners 4',
            author: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
            date:'2023-01-01',
            image:blog3
        },
        {
            id: 4,
            title: 'Top 10 Blogging Tips for Beginners 2',
            author: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
            date:'2022-01-01',
            image:blog4
        },
        {
            id: 5,
            title: 'Top 10 Blogging Tips for Beginners 6',
            author: 'John Doewer',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
            date:'2021-01-01',
            image:blog5
        },
        {
            id: 6,
            title: 'Top 10 Blogging Tips for Beginners 24',
            author: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
            date:'2024-01-01',
            image:blog6
        },
        // Add more blog entries as needed
    ];
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const likes =20;
    const dislikes = 90;
    const pageSize = 12; // Number of artworks per page

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Function to filter artworks based on criteria
    const [filteredBlogs, setFilteredBlogs] = useState(blogs); // Initialize filtered artworks with all artworks

    const filterBlogs = ({itemName, dateRange}) => {
        let filtered = blogs;
    
        // Filter by item name, author, price, and hashtags
        if (itemName ) {
            console.log(itemName, dateRange);
            const lowerItemName = (itemName && !(itemName==='')) ? itemName.toLowerCase() : '';
    
            filtered = filtered.filter(blog => {
                const lowerTitle = blog.title.toLowerCase();
                const lowerAuthor = blog.author.toLowerCase();
    
                const matchesItemName = !itemName || lowerTitle.includes(lowerItemName) || lowerAuthor.includes(lowerItemName);
                
                // Check if the artwork matches the criteria
                return matchesItemName;
            });
        }
    
        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(blog => {
                const blogDate = new Date(blog.date);
                return blogDate >= dateRange[0] && blogDate <= dateRange[1];
            });
        }
    
        setFilteredBlogs(filtered);
    };
    

    return (
        <Row justify="center" style={{ marginTop: '80px'}}>
            <Col span={22}>
                <Title level={2} style={{ textAlign: 'center' }}>Welcome to Our Blog</Title>
                <FilterComponent onSearch={filterBlogs} name={true} date={true} />
                <Row gutter={[16, 16]} className='mt-4'>
                    {filteredBlogs.slice(startIndex, endIndex).map(blog => (
                        <Col key={blog.id} xs={24} sm={12} md={8}>
                            <Link to={`/blogs/${blog.id}`} className='text-dark text-decoration-none'>
                            <Card
                                hoverable
                                style={{ borderRadius: '1px' }}
                                cover={<Image src={blog.image} style={{ borderRadius: '1px', height: '240px' }} />}
                            >
                                <Card.Meta
                                    title={<div className='float-end'>{(window.innerWidth<=768)?blog.title.slice(0, 20)+'...':blog.title}</div>}
                                    avatar={<div className='d-flex  flex-column jusify-content-between align-items-left'>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <small className='fw-bold text-black'> By: {blog.author}</small>
                                    </div>}
                                    description={<div className='float-end'>
                                        <LikeFilled className='fw-bold text-success' style={{ marginRight: '5px' }} />
                                        {likes}
                                        <DislikeFilled className='fw-bold text-danger' style={{ marginLeft: '10px', marginRight: '5px' }} />
                                        {dislikes}
                                        
                                    </div>}
                                />
                                <small className="float-start">Date: {blog.date}</small>
                            </Card>
                        </Link>
                        </Col>
                        
                    ))}
                </Row>
                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        current={currentPage}
                        total={filteredBlogs.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default BlogPage;
