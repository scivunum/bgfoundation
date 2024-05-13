import React from 'react';
import { Row, Col, Card,Breadcrumb} from 'antd';
import { HomeOutlined, UserOutlined} from '@ant-design/icons';
import { colors } from '../../components/style';
import { Link } from 'react-router-dom';

const AdminPage = ({isloggedin}) => {
    const pages =[
        {title:'Dashboard', url:'/admin/dashboard',icon:<UserOutlined/>},
        {title:'About', url:'/admin/about',icon:<UserOutlined/>},
        {title:'Artworks', url:'/admin/artworks',icon:<UserOutlined/>},
        {title:'Blogs', url:'/admin/blogs',icon:<UserOutlined/>},
        {title:'Events', url:'/admin/events',icon:<UserOutlined/>},
        {title:'Payments', url:'/admin/payments',icon:<UserOutlined/>},
        {title:'Profile', url:'/admin/profile',icon:<UserOutlined/>}
    ]

  return (
    <div style={{ padding: '24px', marginTop: "70px", backgroundColor: 'white' }}>
        <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
            <Breadcrumb
                items={[
                    {href: '/',title: <HomeOutlined />},
                    {title: (<><span>Admin</span></>)},]}
                    />
        </div>
        <Row gutter={[16, 16]} justify="center" align="middle" style={{ marginTop: '30px' }}>
            {pages.map((page, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                    <Link to={page.url} className='text-dark text-decoration-none'>
                        <Card
                            hoverable
                            style={{ borderRadius: '1px'}}
                            cover={page.icon}
                        >
                            <Card.Meta
                                title={<div className='float-end'>{page.title}</div>}
                                
                                description={<div className='float-end'>
                                    {page.title}</div>}
                            />
                            <small className="float-start">Date: {page.title}</small>
                        </Card>
                    </Link>
                </Col>
                
            ))}
        </Row>
    </div>
  );
};

export default AdminPage;