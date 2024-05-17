import React,{useState} from 'react';
import {Nav,Container,Row , Col} from 'react-bootstrap';
import { colors} from './style';
import {Button, NavLink} from './button';
import { Form, Input, Alert, message  } from 'antd';
import {MailOutlined,TwitterOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons'; // Import social icons from Ant Design

const Footer = ({Companyname}) => {
    const style ={
        backgroundColor: colors.primarybackground,
        color: 'white',
        padding: '10px',
        width: '100%',
        
        justifyContent:'space-between',
        alignItems: 'center'
    }
    const [error, setError] = useState('');

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Here you can implement your logic to handle the form submission
        // For example, send the form data to your backend server
        // Display a success message to the user
        message.success('Successfully Logged In!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // Display an error message to the user if form validation fails
        message.error('Invalid email or password. Please check the form fields and try again.');
        setError('Invalid email or password. Please check the form fields and try again.');
    };
    return(
        <Container fluid  style={style}>
            <footer className="py-5">
                <Row className='m-0'>
                    <Col className="col-6 col-md-2 mb-3">
                        <h4 className='text-dark'>Contact Info</h4>
                        <Nav className='flex-column'>
                            <NavLink to="/" text="Home" className='text-dark' style={{margin: '0px', padding:'0px'}} />
                            <NavLink to="/about" text="About" className='text-dark m-0'/>
                            <NavLink to="/about#contactus" text="Contact Us" className='text-dark m-0'/>
                            <NavLink to="/about#termsandconditions" text="T & C" className='text-dark m-0'/>
                        </Nav>
                    </Col>

                    <div className="col-6 col-md-2 mb-3">
                        <h4 className='text-dark'>Contents</h4>
                        <Nav className='flex-column p-0'>
                            <NavLink to="/artworks" text="Artworks" className='text-dark m-0'/>
                            <NavLink to="/events" text="Events" className='text-dark m-0' />
                        </Nav>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <div>
                        <h5 className='text-dark'>Subscribe to our newsletter</h5>
                        <p className='text-dark'> Monthly digest of what's new and exciting from us.</p>
                        <div className="d-flex flex-column w-100 gap-2">
                        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '4px' }} />}
                        <Form
                            name="normal_login"
                            className="d-flex flex-column justify-content-center align-self-center"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width:'300px'}}
                            
                        >
                            <Form.Item
                                name="email"

                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <label htmlFor="newsletter1" className="visually-hidden text-dark">Email address</label>
                                <Input id="newsletter1" type="text" className="form-control" style={{borderColor:`${colors.primarylight}`}} placeholder="Email address" />
                                
                            </Form.Item>
                            <Form.Item className='d-flex flex-column justify-content-center align-items-center' style={{width:'300px'}}>
                                <Button htmlType="submit" text="Subscribe" className='text-dark border justify-content-center' style={{border:`1px dotted ${colors.primary}`, width:'155px', alignSelf:'center'}} icon={<MailOutlined style={{ color: '#ec3237' }} />} />
                            </Form.Item>
                        </Form>
                            
                             <p className="d-flex flex-row m-auto mt-4" style={{alignItems:'center', margin:'20px' }}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <TwitterOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#1DA1F2' }} />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <InstagramOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#E4405F' }} />
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FacebookOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#1877F2' }} />
                                </a>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                    <WhatsAppOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#25D366' }} />
                                </a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                    <LinkedinOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#0077B5' }} />
                                </a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16" style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px'}}>
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                    </svg>
                                </a>
                            </p>
                        </div>
                        </div>
                        

                    </div>
                </Row>

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center border-top">
                    <p className='text-dark'>© 2022 {Companyname}, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex ">
                        <li className="ms-3"><a className="link-dark" href="/"><svg className="bi" width="24" height="24"></svg></a></li>
                        <li className="ms-3"><a className="link-dark" href="/"><svg className="bi" width="24" height="24"></svg></a></li>
                        <li className="ms-3"><a className="link-dark" href="/"><svg className="bi" width="24" height="24"></svg></a></li>
                    </ul>
                </div>
            </footer>
        </Container>
    )
}
export default Footer;