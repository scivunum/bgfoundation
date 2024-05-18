import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Radio, Modal, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, CalendarOutlined, NumberOutlined, UserOutlined, CreditCardOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';

const AddPaymentForm = () => {
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
        // For example, send the data to your backend API

        // Navigate back to payments list or show a success message
        navigate('/admin/payments');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2" style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/"><HomeOutlined /></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/admin">Admin</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/admin/payments">Payments</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Add</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: '0 auto', padding: '24px', backgroundColor: colors.primarybackground, borderRadius: '2px' }}
            >
                
                <Form.Item
                    name="paymentMethod"
                    label="Payment Method"
                    rules={[{ required: true, message: 'Please select a payment method' }]}
                >
                    <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                        <Radio value="creditCard" className={paymentMethod === 'creditCard' ? 'ant-radio-checked' : ''}>Credit Card</Radio>
                        <Radio value="crypto" className={paymentMethod === 'crypto' ? 'ant-radio-checked' : ''}>Crypto</Radio>
                    </Radio.Group>

                </Form.Item>

                {paymentMethod === 'creditCard' && (
                    <>
                        <Form.Item
                            name="creditCardNumber"
                            label="Credit Card Number"
                            rules={[{ required: true, message: 'Please enter your credit card number' }]}
                        >
                            <Input prefix={<CreditCardOutlined />} placeholder="Card Number" />
                        </Form.Item>
                        <Form.Item
                            name="creditCardExpiry"
                            label="Expiry Date"
                            rules={[{ required: true, message: 'Please enter your credit card expiry date' }]}
                        >
                            <Input prefix={<CalendarOutlined />} placeholder="Expiry Date"  />
                        </Form.Item>
                        <Form.Item
                            name="creditCardCVC"
                            label="CVC"
                            rules={[{ required: true, message: 'Please enter your credit card CVC' }]}
                        >
                            <Input prefix={<NumberOutlined />} placeholder="CVC" />
                        </Form.Item>
                    </>
                )}

                {paymentMethod === 'crypto' && (
                    <Form.Item
                        name="cryptoWalletAddress"
                        label="Crypto Wallet Address"
                        rules={[{ required: true, message: 'Please enter your crypto wallet address' }]}
                    >
                        <Input prefix={<CreditCardOutlined />} placeholder="Address" />
                    </Form.Item>
                )}
                <Form.Item
                    name="payer"
                    label="Payer"
                    rules={[{ required: true, message: 'Please enter the payer name' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Cardholder Name" />
                </Form.Item>
                <Form.Item
                    name="reason"
                    label="Reason"
                    rules={[{ required: true, message: 'Please enter the reason for payment' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="event"
                    label="Event"
                    rules={[{ required: true, message: 'Please enter the associated event' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="artwork"
                    label="Artwork"
                    rules={[{ required: true, message: 'Please enter the associated artwork' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter the payment amount' }]}
                >
                    <Input prefix={<DollarCircleOutlined />} type="number" placeholder="Payment Amount" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: 'Please select the payment date' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={showModal}>Add Payment</Button>
                </Form.Item>
            </Form>

            <Modal
                title="Confirm Payment"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to add this payment?</p>
            </Modal>
        </div>
    );
};

export default AddPaymentForm;
