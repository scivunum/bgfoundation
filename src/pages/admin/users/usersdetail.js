import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Form, Radio, Typography, Row, Col,Avatar,Input, message, Breadcrumb, Select,Button,DatePicker, Table, Card, Popconfirm} from 'antd';
import { HomeOutlined,EditOutlined, UserOutlined, CopyOutlined,CreditCardOutlined, NumberOutlined, CalendarOutlined,SaveOutlined, DeleteOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';
import { colors } from '../../../components/style';
import { countryCodes } from '../../../components/constants';
import dayjs from 'dayjs';
const { Text, Title } = Typography;
const { Option } = Select;

const UserDetails = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const navigate = useNavigate();
    
    const userid = id;
    const [picture, setPicture] = useState("https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png");
    const [name, setName] = React.useState('John Doe');
    const [status, setStatus] = React.useState('Active');
    const [role, setRole] = React.useState('Admin');
    const [dateJoined, setDateJoined] = React.useState(dayjs('2000-01-01'));
    const artworksSold = 5;
    const artworksBought= 3;
    const auctionsParticipated= 10 ;

    const [email, setEmail] = React.useState('john@email.com');
    const [password, setPassword] = React.useState('35t546546546');
    const [phonenumber,setPhonenumber] = React.useState('08012345678');
    const [address,setAddress] = React.useState('Lagos state');
    const [phonenumberpre,setPhonenumberpre] = React.useState('+234');
    const [facebook,setFacebook] = React.useState('facebook.com/john');
    const [instagram,setInstagram] = React.useState('instagram.com/john');
    const [twitter,setTwitter] = React.useState('twitter.com/john');
    const [linkedIn, setLinkedIn] = React.useState('linkedin.com/in/john');
    const [whatsapp,setWhatsapp] = React.useState('whatsapp.com/john');

    // Dummy user details (replace this with actual fetching from API or state)

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Here you can implement logic to save the updated user details
        // For now, let's just toggle back to view mode
        setEditMode(false);
        message.success('User details saved!');
    };
    const handleDateChange = (date) => {
        setDateJoined(date);
    };
    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        }else if (e.target.id === 'picture') {
            setPicture(e.target.value);
        } else if (e.target.id === 'status') {
          setStatus(e.target.value);
        } else if (e.target.id === 'email') {
          setEmail(e.target.value);
        } else if (e.target.id === 'password') {
            setPassword(e.target.value);
        }else if (e.target.id === 'role') {
            setRole(e.target.value);
        }else if (e.target.id === 'phonenumber') {
            const newValue = e.target.value;
            const lastChar = newValue.charAt(newValue.length - 1);
            if (!isNaN(lastChar)) {
                setPhonenumber(e.target.value); // Concatenate digits to the current phone number
                console.log(phonenumberpre+"("+e.target.value+")");
            } 
            
        } else if (e.target.id === 'address') {
            setAddress(e.target.value);
        } else if (e.target.id === 'facebook') {
            setFacebook(e.target.value);
        } else if (e.target.id === 'instagram') {
            setInstagram(e.target.value);
        } else if (e.target.id === 'twitter') {
          setTwitter(e.target.value);
        } else if (e.target.id === 'linkedIn') {
            setLinkedIn(e.target.value);
        } else if (e.target.id === 'whatsapp') {
            setWhatsapp(e.target.value);
        }
        handleSave();

    };
    
    const selectBefore = (
        <Select defaultValue={phonenumberpre} disabled={!editMode} onChange={(value) => setPhonenumberpre(value)} style={{minWidth: '80px'}}>
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                {country.code}
                </Option>
            ))}
        </Select>
    );
    const artworks = [
        { key:1, title: 'Artwork 1', imageUrl: 'blog4', date: '2022-01-01', sold:'true',bought:'false',auction:'12345',author: 'Artist 1', hashtags: ['#abstract', '#modern', '#colorful'], price:'$500' },
        { key:2, title: 'Artwork 2', imageUrl: 'blog3', date: '2022-01-02', sold:'true',bought:'false',auction:'12345',author: 'Artist 2', hashtags: ['#portrait', '#classic', '#monochrome'], price:'$500' },
        { key:3, title: 'Artwork 3', imageUrl: 'blog5', date: '2022-01-03', sold:'true',bought:'false',auction:'12345',author: 'Artist 3', hashtags: ['#landscape', '#impressionist', '#scenic'], price:'$500' },
        { key:4, title: 'Artwork 4', imageUrl: 'blog6', date: '2022-01-04', sold:'true',bought:'false',auction:'12345',author: 'Artist 4', hashtags: ['#abstract', '#surreal', '#dreamy'], price:'$500' },
        { key:5, title: 'Artwork 5', imageUrl: 'blog5', date: '2022-01-05', sold:'true',bought:'false',auction:'12345',author: 'Artist 5', hashtags: ['#modern', '#geometric', '#vibrant'], price:'$500' },
        { key:6, title: 'Artwork 6', imageUrl: 'blog6', date: '2022-01-06', sold:'true',bought:'false',auction:'12345',author: 'Artist 6', hashtags: ['#portrait', '#realism', '#expressive'], price:'$500' },
        { key:7, title: 'Artwork 7', imageUrl: 'blog4', date: '2022-01-07', sold:'true',bought:'false',auction:'12345',author: 'Artist 7', hashtags: ['#landscape', '#naturalistic', '#serene'], price:'$500' },
        { key:8, title: 'Artwork 8', imageUrl: 'blog3', date: '2022-01-08', sold:'true',bought:'false',auction:'12345',author: 'Artist 8', hashtags: ['#abstract', '#futuristic', '#dynamic'], price:'$500' },
        { key:9, title: 'Artwork 9', imageUrl: 'blog2', date: '2022-01-09', sold:'true',bought:'false',auction:'12345',author: 'Artist 9', hashtags: ['#modern', '#minimalist', '#sophisticated'], price:'$500' },
        { key:10, title: 'Artwork 10', imageUrl: 'blog1', date: '2022-01-10', sold:'true',bought:'false',auction:'12345',author: 'Artist 10', hashtags: ['#portrait', '#contemporary', '#provocative'], price:'$500' },
        { key:11, title: 'Artwork 11', imageUrl:' blog2', date: '2022-01-11', sold:'true',bought:'false',auction:'12345',author: 'Artist 11', hashtags: ['#landscape', '#abstracted', '#ethereal'], price:'$500' },
        { key:12, title: 'Artwork 12', imageUrl: 'blog3', date: '2022-01-12', sold:'true',bought:'false',auction:'12345',author: 'Artist 12', hashtags: ['#abstract', '#organic', '#flowing'], price:'$500' },
        { key:13, title: 'Artwork 13', imageUrl: 'blog4', date: '2022-01-13', sold:'true',bought:'false',auction:'12345',author: 'Artist 13', hashtags: ['#modern', '#digital', '#experimental'], price:'$500' },
        { key:14, title: 'Artwork 14', imageUrl: 'blog5', date: '2022-01-14', sold:'true',bought:'false',auction:'12345',author: 'Artist 14', hashtags: ['#portrait', '#symbolic', '#introspective'], price:'$500' },
        { key:15, title: 'Artwork 15', imageUrl: 'blog6', date: '2022-01-15', sold:'true',bought:'false',auction:'12345',author: 'Artist 15', hashtags: ['#landscape', '#realistic', '#detailed'], price:'$500' },
        { key:16, title: 'Artwork 16', imageUrl: 'blog2', date: '2022-01-16', sold:'true',bought:'false',auction:'12345',author: 'Artist 16', hashtags: ['#abstract', '#fluid', '#energetic'], price:'$500' },
        { key:17, title: 'Artwork 17', imageUrl: 'blog4', date: '2022-01-17', sold:'true',bought:'false',auction:'12345',author: 'Artist 17', hashtags: ['#modern', '#surrealist', '#intriguing'], price:'$500' },
        { key:18, title: 'Artwork 18', imageUrl: 'blog6', date: '2022-01-18', sold:'true',bought:'false',auction:'12345',author: 'Artist 18', hashtags: ['#portrait', '#emotive', '#introspective'], price:'$500' },
        { key:19, title: 'Artwork 19', imageUrl: 'blog3', date: '2022-01-19', sold:'true',bought:'false',auction:'12345',author: 'Artist 19', hashtags: ['#landscape', '#expressionist', '#bold'], price:'$500' },
        { key:20, title: 'Artwork 20', imageUrl: 'blog5', date: '2022-01-20', sold:'true',bought:'false',auction:'12345',author: 'Artist 20', hashtags: ['#abstract', '#geometric', '#structured'], price:'$500' },
        { key:21, title: 'Artwork 21', imageUrl: 'blog1', date: '2022-01-21', sold:'true',bought:'false',auction:'12345',author: 'Artist 21', hashtags: ['#modern', '#experimental', '#avant-garde'], price:'$500' },
        { key:22, title: 'Artwork 22', imageUrl: 'blog2', date: '2022-01-22', sold:'true',bought:'false',auction:'12345',author: 'Artist 22', hashtags: ['#portrait', '#interpretive', '#personal'], price:'$500' },
        { key:23, title: 'Artwork 23', imageUrl: 'blog4', date: '2022-01-23', sold:'true',bought:'false',auction:'12345',author: 'Artist 23', hashtags: ['#landscape', '#abstract', '#atmospheric'], price:'$500' },
        { key:24, title: 'Artwork 24', imageUrl: 'blog6', date: '2022-01-24', sold:'true',bought:'false',auction:'12345',author: 'Artist 24', hashtags: ['#abstract', '#experimental', '#textured'], price:'$500' },
        { key:25, title: 'Artwork 25', imageUrl: 'blog1', date: '2022-01-25', sold:'true',bought:'false',auction:'12345',author: 'Artist 25', hashtags: ['#modern', '#conceptual', '#provocative'], price:'$500' },
        { key:26, title: 'Artwork 26', imageUrl: 'blog2', date: '2022-01-26', sold:'true',bought:'false',auction:'12345',author: 'Artist 26', hashtags: ['#portrait', '#stylized', '#sensitive'], price:'$500' },
        { key:27, title: 'Artwork 27', imageUrl: 'blog3', date: '2022-01-27', sold:'true',bought:'false',auction:'12345',author: 'Artist 27', hashtags: ['#landscape', '#realistic', '#majestic'], price:'$500' },
        { key:28, title: 'Artwork 28', imageUrl: 'blog4', date: '2022-01-28',sold:'true',bought:'false',auction:'12345', author: 'Artist 28', hashtags: ['#abstract', '#dynamic', '#kinetic'], price:'$500' },
        { key:29, title: 'Artwork 29', imageUrl: 'blog5', date: '2022-01-29', sold:'true',bought:'false',auction:'12345',author: 'Artist 29', hashtags: ['#modern', '#experimental', '#bold'], price:'$500' },
        { key:30, title: 'Artwork 30', imageUrl: 'blog6', date: '2022-01-30',sold:'true',bought:'false',auction:'12345', author: 'Artist 30', hashtags: ['#portrait', '#introspective', '#symbolic'], price:'$500' }
      ];
    
    const ArtworksColumns = [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Artist',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Bought',
            dataIndex: 'bought',
            key: 'date',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'date',
        },
        {
            title: 'Auction',
            dataIndex: 'auction',
            key: 'date',
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />}></Button>
                </div>
            ),
        },
    ];
    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
        // For example, send the data to your backend API

    };
    
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success(text +' Copied to clipboard');
        }).catch(() => {
            message.error('Failed to copy ' +text);
        });
    };

    const payerName = "John Doe"; // Example payer name, replace with your data
    const creditcardcvc = "123"; // Example credit card CVC, replace with your data
    const creditcardexpirydate = "01/23"; // Example credit card expiry date, replace with your data
    const creditcardnumber = "1234123412341234"; // Example credit card number, replace with your data
    const walletAddress = "0x123...456"; // Example wallet address, replace with your data



    return (
        <div style={{ padding: '20px' }} className='py-5 mt-4 bg-white'>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4" style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb
                    items={[
                        { title: (<Link to="/"><HomeOutlined /></Link>) },
                        { title: (<Link to="/admin"><span>Admin</span></Link>) },
                        { title: (<Link to="/admin/users"><span>Users</span></Link>) },
                        { title: (<span>User ({id})</span>) },
                    ]}
                />
                <EditOutlined onClick={handleEdit} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Row justify="center" align="middle" style={{ marginBottom: '30px' }} >
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: colors.primarybackground}} >
                            <div className='d-flex flex-column justify-content-between align-items-center ms-2 p-2'>
                                <div style={{ position: 'relative', marginRight: '8px', marginBottom: '8px' }}>
                                    <Avatar size={150} src={picture} />
                                    <Popconfirm
                                        title="Are you sure you want to edit this image?"
                                        //onConfirm={() => handleRemoveImage(artwork.id)}
                                        okText="Yes"
                                        cancelText="No"
                                        placement="topRight"
                                    >
                                        <Button type="link" icon={<EditOutlined />} style={{ position: 'absolute', top: 0, right: 0 }} size="small" />
                                    </Popconfirm>
                                </div>
                                <div className='d-flex flex-column justify-content-left'>
                                    <Title level={3}>{name}</Title>
                                    <Text strong>Status: {status}</Text> 
                                    <Text strong>id: {userid}</Text> 
                                    <Text strong>Phone Number: {phonenumber}</Text> 
                                    <Text strong>Email: {email}</Text> 
                                    <Text strong>{address}</Text> 
                                </div>
                            </div>
                              
                        </Col>
                        
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} span={24} >
                            <div className='d-flex flex-column justify-content-left ms-2 p-2'>
                                <Text strong style={{alignSelf:'self-start'}}> 
                                        Password: 
                                </Text>
                                <input id="password" type="text" className="form-control" placeholder={password} value={password} onChange={handleInputChange} disabled />
                              
                                <Text strong style={{alignSelf:'self-start'}}> 
                                    Full Name: 
                                </Text>
                                <input id="name" type="text" className="form-control" placeholder={name} value={name} onChange={handleInputChange} disabled={!editMode} />
                                <Text strong style={{alignSelf:'self-start'}}>Status: </Text>
                                <input id="status" type="text" className="form-control" placeholder={status} value={status} disabled /> 
                                <Text strong style={{alignSelf:'self-start'}}>Role: </Text>
                                <input id="role" type="text" className="form-control" placeholder={role} value={role} disabled /> 
                                <Text strong style={{alignSelf:'self-start'}}>Phone Number: 
                                </Text> 
                                <Input id="phonenumber" type="text" addonBefore={editMode && selectBefore }  placeholder={phonenumber} onChange={handleInputChange} value={phonenumber} disabled={!editMode} />
                                <Text strong style={{alignSelf:'self-start'}}>Email: </Text>
                                <input id="email" type="text" className="form-control" placeholder={email} value={email} onChange={handleInputChange} disabled={!editMode} /> 
                                <Text strong style={{alignSelf:'self-start'}}>Date joined: </Text>
                                <DatePicker id="datejoined" className="form-control" placeholder={dateJoined} defaultValue={dateJoined} onChange={handleDateChange} disabled={!editMode} />
                                <Text strong style={{alignSelf:'self-start'}}>Address: </Text> 
                                <input id="address" type="text" className="form-control" placeholder={address} value={address} onChange={handleInputChange} disabled={!editMode} />
                            </div>  
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <div className={`d-flex ${window.innerWidth <= 768 ? 'flex-column' : 'flex-row'} justify-content-left py-2`} style={{width:'100%'}} >
                                <Text strong className='mb-2'>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Face Book <span></span>
                                    </a>
                                <FacebookOutlined style={{fontSize:16, color:'#1877F2'}} />: <input id="facebook" type="text" className="form-control" placeholder={facebook} value={facebook} onChange={handleInputChange} disabled={!editMode} /></Text>
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Twitter <span></span>
                                    </a>
                                    <TwitterOutlined style={{fontSize:16,color:'#1DA1F2'}} />: <input id="twitter" type="text" className="form-control" placeholder={twitter} value={twitter} onChange={handleInputChange} disabled={!editMode} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Instagram <span></span>
                                    </a>
                                    <InstagramOutlined style={{fontSize:16, color:'#E4405F'}} />: <input id="instagram" type="text" className="form-control" placeholder={instagram} value={instagram} onChange={handleInputChange} disabled={!editMode} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Whatsapp <span></span>
                                    </a>
                                <WhatsAppOutlined style={{fontSize:16, color:'#25D366'}} />: <input id="whatsapp" type="text" className="form-control" placeholder={whatsapp} value={whatsapp} onChange={handleInputChange} disabled={!editMode} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        LinkedIn <span></span>
                                    </a>
                                <LinkedinOutlined style={{fontSize:16, color:'#0077B5'}} />: <input id="linkedln" type="text" className="form-control" placeholder={linkedIn} value={linkedIn} onChange={handleInputChange} disabled={!editMode} /></Text> 
                                
                            </div>  
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <div className='py-1 mt-2 bg-white'>
                
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
                                                <Input prefix={<CreditCardOutlined />}  value={creditcardnumber} placeholder={creditcardnumber} disabled addonAfter={<CopyOutlined onClick={() => handleCopy(creditcardnumber)} style={{ cursor: 'pointer' }} />} />
                                            </Form.Item>
                                            <Form.Item
                                                name="creditCardExpiry"
                                                label="Expiry Date"
                                                rules={[{ required: true, message: 'Please enter your credit card expiry date' }]}
                                            >
                                                <Input prefix={<CalendarOutlined />}  value={creditcardexpirydate} placeholder={creditcardexpirydate} disabled addonAfter={<CopyOutlined onClick={() => handleCopy(creditcardexpirydate)} style={{ cursor: 'pointer' }} />}/>
                                            </Form.Item>
                                            <Form.Item
                                                name="creditCardCVC"
                                                label="CVC"
                                                rules={[{ required: true, message: 'Please enter your credit card CVC' }]}
                                            >
                                                <Input prefix={<NumberOutlined />}  value={creditcardcvc} placeholder={creditcardcvc} disabled addonAfter={<CopyOutlined onClick={() => handleCopy(creditcardcvc)} style={{ cursor: 'pointer' }} />}/>
                                            </Form.Item>
                                        </>
                                    )}

                                    {paymentMethod === 'crypto' && (
                                        <Form.Item
                                            name="cryptoWalletAddress"
                                            label="Crypto Wallet Address"
                                            rules={[{ required: true, message: 'Please enter your crypto wallet address' }]}
                                        >
                                            <Input prefix={<CreditCardOutlined />}  value={walletAddress} placeholder={walletAddress} disabled addonAfter={<CopyOutlined onClick={() => handleCopy(walletAddress)} style={{ cursor: 'pointer' }} />}/>
                                        </Form.Item>
                                    )}
                                    <Form.Item
                                        name="payer"
                                        label="Payer"
                                        rules={[{ required: true, message: 'Please enter the payer name' }]}
                                    >
                                        <Input prefix={<UserOutlined />} value={payerName} placeholder={payerName} disabled addonAfter={<CopyOutlined onClick={() => handleCopy(payerName)} style={{ cursor: 'pointer' }} />}/>
                                    </Form.Item>
                                    
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editMode ?
                        <Col>
                            <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={handleEdit} />
                        </Col>
                        :
                        <>
                        </>
                        }
                    </Row>
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Artworks" bordered={true} style={{ borderRadius: '2px'}}>
                                    
                                    <small className='fw-bold'>Artworks Bought: {artworksBought}</small> <br/>
                                    <small>Artworks Sold: {artworksSold}</small>
                                    <small>Auctions: {auctionsParticipated}</small>
                                    <Table
                                        dataSource={artworks}
                                        columns={ArtworksColumns}
                                        onRow={(record) => ({
                                            style: {
                                                cursor: 'pointer',
                                            },
                                            onClick: () => {
                                                navigate(`/admin/artworks/${record.key}`);
                                            },
                                        })}
                                        pagination={true}
                                        rowClassName="editable-row"
                                        scroll={{ x: 'max-content' }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
        </div>
    );
};

export default UserDetails;
