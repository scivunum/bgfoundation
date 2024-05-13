import React from 'react';
import { Row, Col, Card,Breadcrumb} from 'antd';
import { HomeOutlined, UserOutlined,DashboardOutlined,InfoCircleOutlined,CalendarOutlined, DollarOutlined, ProfileOutlined,FormatPainterOutlined } from '@ant-design/icons';
import { colors } from '../../components/style';
import { Link } from 'react-router-dom';

const AdminPage = ({isloggedin}) => {
    const pages =[
        {title:'Dashboard', url:'/admin/dashboard',icon:<DashboardOutlined style={{color:colors.primary, fontSize:24}}/>,},
        {title:'About', url:'/admin/about',icon:<InfoCircleOutlined style={{color:colors.primary, fontSize:24}}/>},
        {title:'Artworks', url:'/admin/artworks',icon:<FormatPainterOutlined style={{color:colors.primary, fontSize:24}}/>},
        {title:'Blogs', url:'/admin/blogs',icon:<ProfileOutlined style={{color:colors.primary, fontSize:24}}/>},
        {title:'Events', url:'/admin/events',icon:<CalendarOutlined style={{color:colors.primary, fontSize:24}}/>},
        {title:'Payments', url:'/admin/payments',icon:<DollarOutlined style={{color:colors.primary, fontSize:24}}/>},
        {title:'Profile', url:'/admin/profile',icon:<UserOutlined style={{color:colors.primary, fontSize:24}}/>}
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
                            style={{ borderRadius: '1px', padding: '10px', cursor: 'pointer', backgroundColor: 'white' }}
                        >
                            <Card.Meta
                                title={<div className='float-center fs-50'>{page.icon}<span className='mx-2'>{page.title}</span></div>}
                                
                            />
                        </Card>
                    </Link>
                </Col>
                
            ))}
        </Row>
    </div>
  );
};

export default AdminPage;