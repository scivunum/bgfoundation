import React from 'react';
import { Row, Col, Typography, Form, Input, message } from 'antd';
import { CreditCardOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Button} from "../../components/button";

const { Title } = Typography;

const PaymentPage = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Here you can implement your logic to handle the form submission
        // For example, send the form data to your backend server
        // Display a success message to the user
        message.success('Payment successful!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // Display an error message to the user if form validation fails
        message.error('Please check the form fields and try again.');
    };

    return (
        <Row justify="center" style={{ marginTop: '50px' }}>
            <Col span={12}>
                <Title level={2}>Make a Payment</Title>
                <Form
                    name="payment-form"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="cardNumber"
                        rules={[{ required: true, message: 'Please enter your card number!' }]}
                    >
                        <Input prefix={<CreditCardOutlined />} placeholder="Card Number" />
                    </Form.Item>
                    <Form.Item
                        name="cardHolder"
                        rules={[{ required: true, message: 'Please enter the cardholder name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Cardholder Name" />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        rules={[{ required: true, message: 'Please enter the payment amount!' }]}
                    >
                        <Input prefix={<DollarCircleOutlined />} type="number" placeholder="Payment Amount" />
                    </Form.Item>
                    <Form.Item>
                        <Button text="Pay Now" htmlType="submit" classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default PaymentPage;
