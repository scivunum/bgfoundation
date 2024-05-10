import React from 'react';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ContactUsPage = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Here you can implement your logic to handle the form submission
        // For example, send the form data to your backend server
        // Display a success message to the user
        message.success('Your message has been sent successfully!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // Display an error message to the user if form validation fails
        message.error('Please check the form fields and try again.');
    };

    return (
        <Row justify="center" style={{ marginTop: '80px' }}>
            <Col span={12}>
                <Title level={2}>Contact Us</Title>
                <Form
                    name="contact-form"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Your Name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input prefix={<MailOutlined />} type="email" placeholder="Your Email" />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'Please enter your message!' }]}
                    >
                        <Input.TextArea prefix={<MessageOutlined />} rows={4} placeholder="Your Message" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default ContactUsPage;
