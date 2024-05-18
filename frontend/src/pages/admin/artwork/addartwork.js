import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker, InputNumber, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined, HomeOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';

const AddArtworkForm = () => {
    const [form] = Form.useForm();
    const history = useNavigate();
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
        // For example, send the data to your backend API

        // Navigate back to artworks list or show a success message
        history('/admin/artworks');
    };

    const handleUploadChange = ({ fileList }) => {
        console.log(fileList[0]);
        setFileList(fileList);
    };

    return (
        <div className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2" style={{ backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            { title: (<Link to="/"><HomeOutlined /></Link>) },
                            { title: (<Link to="/admin"><span>Admin</span></Link>) },
                            { title: (<Link to="/admin/artworks"><span>Art Works</span></Link>) },
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
                    label="Artwork Name"
                    rules={[{ required: true, message: 'Please enter the artwork name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="artist"
                    label="Artist"
                    rules={[{ required: true, message: 'Please enter the artist name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Creation Date"
                    rules={[{ required: true, message: 'Please select the creation date' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please enter the price' }]}
                >
                    <InputNumber
                        formatter={value => `$ ${value}`}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    rules={[{ required: true, message: 'Please upload an image' }]}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleUploadChange}
                        fileList={fileList}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Artwork</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddArtworkForm;
