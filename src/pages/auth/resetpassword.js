import React, { useState } from 'react';
import { Form, Input, Row, Col, Alert } from 'antd';
import { Button} from "../../components/button";
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//import { colors } from '../../components/style';

const PasswordResetPage = () => {
    const [error, setError] = useState('');

    const onFinish = (values) => {
        console.log('Received values:', values);
        setError('Invalid email or password. Please try again.');
    };

    return (
        <Row justify="center" style={{ marginTop: '100px' }}>
            <Col span={18} className="d-flex flex-column justify-content-center align-self-center">
                <h2 style={{ textAlign: 'center', marginBottom: '24px', color:'black' }}>Login</h2>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '4px' }} />}
                <Form
                    name="normal_login"
                    className="d-flex flex-column justify-content-center align-self-center"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{width:'300px'}}
                    
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type='email' placeholder="Email address" />
                        
                    </Form.Item>
                    <Form.Item className='d-flex flex-column justify-content-center align-items-center' style={{width:'300px'}}>
                        <Button text="Send Mail" htmlType="submit" classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', color:'black'  }}>
                    <Link to="/signup" className='text-danger'>Forget about resetting your password</Link>
                </div>
            </Col>
        </Row>
    );
};

export default PasswordResetPage;
