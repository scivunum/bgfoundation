import React, { useState } from 'react';
import { Form, Input, Button, Upload, InputNumber, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined, HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { backendUrl } from '../../../utils/utils';
import { colors } from '../../../components/style';
import { getBase64 } from '../../../utils/imageconverter';

const AddArtworkForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        const file = fileList[0].originFileObj;

        // Convert image file to Base64 string

        const imageBase64 = await getBase64(file);

        const artworkData = {
            name: values.name,
            artist_id: values.artist_id,
            price: values.price,
            description: values.description,
            image: imageBase64, // Use the Base64 string of the image
        };

        try {
            await axios.post(`${backendUrl}/api/v1/artworks`, artworkData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/admin/artworks');
            setIsLoading(false);
        } catch (error) {
            console.error('There was an error uploading the artwork!', error);
        }
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
                    name="artist_id"
                    label="Artist ID"
                    rules={[{ required: true, message: 'Please enter the artist ID' }]}
                >
                    <Input />
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
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                >
                    <Input.TextArea rows={4} />
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
                    <Button type="primary" htmlType="submit">{isLoading?<div className='spinner' style={{fontSize:'4px'}}></div>:'Add Artwork'}</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddArtworkForm;
