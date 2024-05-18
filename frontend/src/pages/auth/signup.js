import React, { useState } from 'react';
import { Form, Input, Row, Col, Checkbox, message, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//import { colors } from '../../components/style';

const SignupPage = () => {
    
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Here you can implement your logic to handle the form submission
        // For example, send the form data to your backend server
        // Display a success message to the user
        message.success('Successfully Signed Up!');
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // Display an error message to the user if form validation fails
        message.error('Please check the form fields and try again.');
    };

    const [checked, setChecked] = useState(false);
    const toggleChecked = () => {
        setChecked(!checked);
    };

    return (
        <Row justify="center" style={{ marginTop: '100px' , marginBottom: '10px' }}>
            <Col span={18} className="d-flex flex-column justify-content-center align-self-center">
                <h2 style={{ textAlign: 'center', marginBottom: '24px', color:'black' }}>Sign Up</h2>
                <Form
                    name="normal_signup"
                    className="d-flex flex-column justify-content-center align-self-center"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{width:'300px'}}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Input your email!' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} type='email' placeholder="Email address" />
                        
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Input your username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type='email' placeholder="Username" />
                        
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Enter your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm-password"
                        rules={[{ required: true, message: 'Confirm your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    <Form.Item className='d-flex flex-column justify-content-center align-items-center' style={{width:'300px'}}>
                        <Checkbox checked={checked} onChange={toggleChecked}>
                            Do you agree to our <Link to="/about#termsandconditions" className='text-primary'>Terms and Conditions ? </Link>
                        </Checkbox>
                        <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
                            {checked ? <Button type="primary" htmlType="submit">Sign Up</Button>
                                : 
                                <></>}
                        </div>
                            
                        
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', color:'black'  }}>
                    Already have an account? <Link to="/login" className='text-danger'>Log In</Link>
                </div>
            </Col>
        </Row>
    );
};

export default SignupPage;
