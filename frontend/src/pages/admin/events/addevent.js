import React from 'react';
import { Form, Input, Button, DatePicker, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';

const AddEventForm = () => {
    const [form] = Form.useForm();
    const history = useNavigate();

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
        // For example, send the data to your backend API

        // Navigate back to events list or show a success message
        history('/admin/events');
    };

    return (
        <div className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<Link to="/admin/events"><span>Events</span></Link>) },
                            { title: (<span>Add</span>) },
                        ]}
                    />
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: '0 auto', padding: '24px', backgroundColor: colors.primarybackground, borderRadius: '2px' }}
            >
                <Form.Item
                    name="title"
                    label="Event Title"
                    rules={[{ required: true, message: 'Please enter the event title' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Event Date"
                    rules={[{ required: true, message: 'Please select the event date' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Event Status"
                    rules={[{ required: true, message: 'Please enter the event status' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the event description' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Event</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddEventForm;
