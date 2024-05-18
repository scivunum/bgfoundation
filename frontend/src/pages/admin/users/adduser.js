import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker,  Breadcrumb, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined, HomeOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';
import { countryCodes } from '../../../components/constants';

const { Option } = Select;

const AddUserForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState('+234');

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
        // For example, send the data to your backend API

        // Navigate back to users list or show a success message
        navigate('/admin/users');
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <div className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2" style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb
                    items={[
                        { title: (<Link to="/"><HomeOutlined /></Link>) },
                        { title: (<Link to="/admin"><span>Admin</span></Link>) },
                        { title: (<Link to="/admin/users"><span>Users</span></Link>) },
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
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter the full name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please enter the email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="dateJoined"
                    label="Date Joined"
                    rules={[{ required: true, message: 'Please select the date joined' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter the phone number' }]}
                >
                    <Input addonBefore={
                        <Select defaultValue={phoneNumberPrefix} onChange={value => setPhoneNumberPrefix(value)} style={{ minWidth: '80px' }}>
                            {countryCodes.map((country, index) => (
                                <Option key={index} value={country.code}>
                                    {country.code}
                                </Option>
                            ))}
                        </Select>
                    } />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please enter the address' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select the status' }]}
                >
                    <Select>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select the role' }]}
                >
                    <Select>
                        <Option value="Admin">Admin</Option>
                        <Option value="User">User</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Profile Picture"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    rules={[{ required: true, message: 'Please upload a profile picture' }]}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleUploadChange}
                        fileList={fileList}
                    >
                        <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add User</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddUserForm;
