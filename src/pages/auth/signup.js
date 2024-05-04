import React, { useState } from 'react';
import { Form, Input, Row, Col, Alert,Checkbox } from 'antd';
import { Button} from "../../components/button";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { colors } from '../../components/style';

const SignupPage = () => {
    const [error, setError] = useState('');

    const onFinish = (values) => {
        console.log('Received values:', values);
        setError('Invalid email or password. Please try again.');
    };
    const [checked, setChecked] = useState(false);
    const toggleChecked = () => {
        setChecked(!checked);
    };

    return (
        <Row justify="center" style={{ marginTop: '100px' , marginBottom: '10px' }}>
            <Col span={18} className="d-flex flex-column justify-content-center align-self-center">
                <h2 style={{ textAlign: 'center', marginBottom: '24px', color:'black' }}>Sign Up</h2>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '4px' }} />}
                <Form
                    name="normal_signup"
                    className="d-flex flex-column justify-content-center align-self-center"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    
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
                            {checked ? <Button text="Sign Up" htmlType="submit" classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
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
