import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Breadcrumb, Select, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { backendUrl } from '../../../utils/utils';
import { colors } from '../../../components/style';

const { Option } = Select;

const AddEventForm = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        console.log(values);
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/v1/events`, values);
            console.log('Event created:', response.data);
            //history('/admin/events');
        } catch (error) {
            console.error('Error creating event:', error);
        }
        setIsLoading(false);
    };

    const handleStartDateChange = (_, startDateString) => {
        const startDate = new Date(startDateString);
        const endDate = form.getFieldValue('close_date');
        if (endDate) {
            const durationInHours = Math.abs(endDate - startDate) / 36e5; // Calculating duration in hours
            form.setFieldsValue({ duration_in_hours: durationInHours });
        }
    };

    const handleEndDateChange = (_, endDateString) => {
        const endDate = new Date(endDateString);
        const startDate = form.getFieldValue('start_date');
        if (startDate) {
            const durationInHours = Math.abs(endDate - startDate) / 36e5; // Calculating duration in hours
            form.setFieldsValue({ duration_in_hours: durationInHours });
        }
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
                    name="name"
                    label="Event Name"
                    rules={[{ required: true, message: 'Please enter the event name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="start_date"
                    label="Start Date"
                    rules={[{ required: true, message: 'Please select the start date' }]}
                >
                    <DatePicker onChange={handleStartDateChange} />
                </Form.Item>
                <Form.Item
                    name="close_date"
                    label="Close Date"
                    rules={[{ required: true, message: 'Please select the close date' }]}
                >
                    <DatePicker onChange={handleEndDateChange} />
                </Form.Item>
                <Form.Item
                    name="duration_in_hours"
                    label="Duration (in hours)"
                    rules={[{ required: true, message: 'Please enter the duration in hours' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select the status' }]}
                >
                    <Select>
                        <Option value="upcoming">Upcoming</Option>
                        <Option value="ongoing">Ongoing</Option>
                        <Option value="ended">Ended</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the event description' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Add Event</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddEventForm;
