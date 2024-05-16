import React from 'react';
import { Form, Input, Row, Col, message, Button  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//import { colors } from '../../components/style';

const LoginPage = () => {
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
    };

    return (
        <Row justify="center" style={{ marginTop: '100px' }}>
            <Col span={18} className="d-flex flex-column justify-content-center align-self-center">
                <h2 style={{ textAlign: 'center', marginBottom: '24px', color:'black' }}>Login</h2>
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type='email' placeholder="Email address" />
                        
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className='d-flex flex-column justify-content-center align-items-center' style={{width:'300px'}}>
                        <Button type="primary" htmlType="submit">Log In</Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', color:'black'  }}>
                    Not yet joined? <Link to="/signup" className='text-danger'>Sign up</Link>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
