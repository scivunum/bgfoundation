import React, { useState } from 'react';
import { Breadcrumb, Typography, Input, Button, DatePicker, Form, Select, Col, Row } from 'antd';
import { HomeOutlined, EditOutlined, SaveOutlined, LinkedinOutlined, FacebookOutlined, WhatsAppOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { countryCodes } from '../../components/constants';
import logo from '../../assets/logo.jpg';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

const AdminAboutPage = () => {
    const [editAbout, setEditAbout] = useState(false);
    const [form] = Form.useForm();
    const lastUpdatedDate = dayjs(new Date().toISOString()); // Today's date as initial value
    const adminFullName = "John Doe";
    const [logoUrl, setLogoUrl] = useState(logo);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@email.com');
    const [phonenumber, setPhonenumber] = useState('08012345678');
    const [address, setAddress] = useState('Lagos state');
    const [phonenumberpre, setPhonenumberpre] = useState('+234');
    const [description, setDescription] = useState('');
    const [howToBid, setHowToBid] = useState('');
    const [howToAuction, setHowToAuction] = useState('');
    const [howToRegister, setHowToRegister] = useState('');
    const [facebook, setFacebook] = useState('facebook.com/john');
    const [instagram, setInstagram] = useState('instagram.com/john');
    const [twitter, setTwitter] = useState('twitter.com/john');
    const [linkedIn, setLinkedIn] = useState('linkedin.com/in/john');
    const [whatsapp, setWhatsapp] = useState('whatsapp.com/john');
    const [termsAndConditions, setTermsAndConditions] = useState('Terms and Conditions text');

    const saveEdit = () => {
        setEditAbout(false);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'logo': 
                setLogoUrl(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phonenumber':
                const newValue = value;
                const lastChar = newValue.charAt(newValue.length - 1);
                if (!isNaN(lastChar)) {
                    setPhonenumber(value); // Concatenate digits to the current phone number
                    console.log(phonenumberpre + "(" + value + ")");
                }
                break;
            case 'address':
                setAddress(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'howToBid':
                setHowToBid(value);
                break;
            case 'howToAuction':
                setHowToAuction(value);
                break;
            case 'howToRegister':
                setHowToRegister(value);
                break;
            case 'facebook':
                setFacebook(value);
                break;
            case 'instagram':
                setInstagram(value);
                break;
            case 'twitter':
                setTwitter(value);
                break;
            case 'linkedIn':
                setLinkedIn(value);
                break;
            case 'whatsapp':
                setWhatsapp(value);
                break;
            case 'termsAndConditions':
                setTermsAndConditions(value);
                break;
            default:
                break;
        }
    };

    const selectBefore = (
        <Select defaultValue="+234" disabled={!editAbout} onChange={(value) => setPhonenumberpre(value)} style={{ minWidth: '80px' }}>
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                    {country.code}
                </Option>
            ))}
        </Select>
    );

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Logic to save about page details
    };

    const onEdit = () => {
        setEditAbout(true);
    };

    return (
        <div style={{ padding: '24px', marginTop: "70px", backgroundColor: 'white' }}>
            <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{ backgroundColor: 'lightgrey' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<Link to='/admin'> <span>Admin</span></Link>) },
                        { title: (<><span>About</span></>) },
                    ]}
                />
                <EditOutlined onClick={onEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <div style={{ padding: '24px' }} className='container-fluid'>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        logo: logoUrl,
                        name: name,
                        email: email,
                        phonenumber: phonenumber,
                        address: address,
                        description: description,
                        howToBid: howToBid,
                        howToAuction: howToAuction,
                        howToRegister: howToRegister,
                        lastUpdatedDate: lastUpdatedDate,
                        facebook: facebook,
                        instagram: instagram,
                        twitter: twitter,
                        linkedIn: linkedIn,
                        whatsapp: whatsapp,
                        termsandconditions: termsAndConditions,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item label="Logo" name="logo">
                        <Input placeholder="Enter Logo" defaultValue={logo} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Enter Name" defaultValue={name} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Enter Email" defaultValue={email} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phonenumber">
                        <Input addonBefore={editAbout && selectBefore} defaultValue={phonenumber} placeholder="Enter Phone Number" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input placeholder="Enter Address" defaultValue={address} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} placeholder="Enter Description" defaultValue={description} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="How to Bid" name="howToBid">
                        <Input.TextArea rows={4} placeholder="Enter How to Bid instructions" defaultValue={howToBid} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="How to Auction" name="howToAuction">
                        <Input.TextArea rows={4} placeholder="Enter How to Auction instructions" defaultValue={howToAuction} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="How to Register" name="howToRegister">
                        <Input.TextArea rows={4} placeholder="Enter How to Register instructions" defaultValue={howToRegister} disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Last Updated Date" name="lastUpdatedDate">
                        <DatePicker defaultValue={lastUpdatedDate} disabled />
                    </Form.Item>
                    <Form.Item label="Updated By" name="updatedBy">
                        <Input placeholder="Updated By" defaultValue={adminFullName} disabled />
                    </Form.Item>
                    <Form.Item label="termsAndConditions" name="termsAndConditions">
                        <Input.TextArea rows={20} placeholder="Set the Terms adn Conditions" defaultValue={termsAndConditions} disabled={!editAbout} />
                    </Form.Item>
                    <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <div className={`d-flex ${window.innerWidth <= 768 ? 'flex-column' : 'flex-row'} justify-content-left py-2`} style={{width:'100%'}} >
                                <Text strong className='mb-2'>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Face Book <span></span>
                                    </a>
                                <FacebookOutlined style={{fontSize:16, color:'#1877F2'}} />: <input id="facebook" type="text" className="form-control" placeholder={facebook} value={facebook} onChange={handleInputChange} disabled={!editAbout} /></Text>
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Twitter <span></span>
                                    </a>
                                    <TwitterOutlined style={{fontSize:16,color:'#1DA1F2'}} />: <input id="twitter" type="text" className="form-control" placeholder={twitter} value={twitter} onChange={handleInputChange} disabled={!editAbout} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Instagram <span></span>
                                    </a>
                                    <InstagramOutlined style={{fontSize:16, color:'#E4405F'}} />: <input id="instagram" type="text" className="form-control" placeholder={instagram} value={instagram} onChange={handleInputChange} disabled={!editAbout} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Whatsapp <span></span>
                                    </a>
                                <WhatsAppOutlined style={{fontSize:16, color:'#25D366'}} />: <input id="whatsapp" type="text" className="form-control" placeholder={whatsapp} value={whatsapp} onChange={handleInputChange} disabled={!editAbout} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        LinkedIn <span></span>
                                    </a>
                                <LinkedinOutlined style={{fontSize:16, color:'#0077B5'}} />: <input id="linkedln" type="text" className="form-control" placeholder={linkedIn} value={linkedIn} onChange={handleInputChange} disabled={!editAbout} /></Text> 
                                
                            </div>  
                        </Col>
                    </Row>
                    {editAbout && (
                        <Form.Item style={{ marginTop: '30px' }}>
                            <Button type="primary" htmlType="submit" onClick={saveEdit} icon={<SaveOutlined />} style={{ marginRight: '10px' }}>Save Changes</Button>
                        </Form.Item>
                        
                    )}
                </Form>
            </div>
        </div>
    );
}

export default AdminAboutPage;
