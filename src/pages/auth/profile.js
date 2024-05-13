import React,{useState} from 'react';
import { Layout, Menu, Typography, Row, Col, Card, Table, Avatar,Input, Breadcrumb, Select, Form} from 'antd';
import { HomeOutlined, UserOutlined, UserDeleteOutlined, EditOutlined, SaveOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';
import { DollarCircleOutlined, HistoryOutlined, CloseCircleOutlined, LogoutOutlined,LockOutlined, CheckOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { Button} from '../../components/button';
import { colors } from '../../components/style';
import { countryCodes } from '../../components/constants';
const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;

const Activities = () => {
    const { userdetails } = useParams();
    console.log(userdetails + "==========");

    // Dummy data for activities
    const activitiesData = [
        { title: "Artworks Uploaded", count: 10 },
        { title: "Artworks Removed", count: 5 },
        { title: "Artworks Viewed", count: 20 },
        { title: "Artworks Liked", count: 15 },
        { title: "Artworks Disliked", count: 3 },
        { title: "Artworks Sold", count: 8 },
        { title: "Artworks Bought", count: 12 },
    ];

    // Dummy data for payments
    const paymentData = [
        { id: 1, reason: "Artwork Purchase", amount: "$50", item: "Artwork1", date: "2024-05-01" },
        { id: 2, reason: "Artwork Sale", amount: "$100", item: "Artwork2", date: "2024-05-05" },
        // Add more dummy payment data as needed
    ];

    // Columns configuration for payments table
    const paymentColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Reason', dataIndex: 'reason', key: 'reason' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Item', dataIndex: 'item', key: 'item' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
    ];

    return (
        <div style={{ padding: 8, minHeight: 360 }}>
            <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{ backgroundColor: colors.primarybackground }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><HistoryOutlined/><span>Activities</span></>), },
                    ]}
                />
            </div>
            <Row justify="center" align="middle">
                
                {activitiesData.map((activity, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} >
                    <Card key={index} hoverable title={activity.title} extra={<EditOutlined />} style={{ margin: '4px' }}>
                        <p>Total Count: {activity.count}</p>
                    </Card>
                  </Col>
                ))}
                
            </Row>
            {/* Table to show payment details */}
            <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Title level={4} >Payments</Title>
                    <Table
                        dataSource={paymentData} // Provide data source for the table
                        columns={paymentColumns} // Define columns for the table
                        pagination={true} // Disable pagination if not needed
                    />
                </Col>
            </Row>
        </div>
    );
};

const ChangePassword = () => {
    const [editpwd,setEditPwd] = React.useState(false);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Logic to save billing details
      };
    const onEdit = () => {
        // Implement edit functionality
        setEditPwd(!editpwd);
      }
    return (
      <div style={{ padding: 8, minHeight: 360 }}>
          <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
              <Breadcrumb
                  items={[
                      {href: '/',title: <HomeOutlined />,},
                      {title: (<><LockOutlined /><span>Reset Password</span></>),},
                  ]}
              />
              <EditOutlined onClick={() =>setEditPwd(!editpwd)} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
          </div>
          <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: colors.primarybackground, padding:'12px'}} >
                  <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                  >
                      <Form.Item label="New Password" name="newPassword">
                        <Input disabled={!editpwd} />
                      </Form.Item>
                      <Form.Item label="Confirm New Password" name="confirmNewPassword">
                        <Input.TextArea disabled={!editpwd} />
                      </Form.Item>
                  </Form>
              </Col>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
              {editpwd ?
              <Col>
                  <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={onEdit} />
              </Col>
              :
              <>
              </>
              }
          </Row>
      </div>
    )
  }

const CloseAccount = () => {
  return (
    <div style={{ padding: 8, minHeight: 360 }}>
        <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
            <Breadcrumb
                items={[
                    {href: '/',title: <HomeOutlined />,},
                    {title: (<><UserDeleteOutlined /><span>Close Account</span></>),},]}
                    />
        </div>
        <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: colors.primarybackground, padding:'12px'}} >
            <p>Are you sure you want to close your account?</p>
            <Button text="Yes" icon={<CheckOutlined style={{ color: '#25D366' }} />} />
          </Col>
        </Row>
      </div>
  )
}
const SignOut = () => {
  return (
    <div style={{ padding: 8, minHeight: 360 }}>
        <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
            <Breadcrumb
                items={[
                    {href: '/',title: <HomeOutlined />,},
                    {title: (<><LogoutOutlined /><span>SignOut</span></>),},]}
                    />
        </div>
        <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: colors.primarybackground, padding:'12px'}} >
            <p>Are you sure you want to log out of your Account?</p>
            <Button text="Yes" icon={<CheckOutlined style={{ color: '#25D366' }} />} />
          </Col>
        </Row>
      </div>
  )
}
const ProfilePage = () => {
    const {userdetails} = useParams();
    console.log(userdetails+"==========");
    
    const [editprofile,setEditProfile] = React.useState(false);
    
    const [name, setName] = React.useState('John Doe');
    const [status, setStatus] = React.useState('Active');
    const [email, setEmail] = React.useState('john@email.com');
    const [phonenumber,setPhonenumber] = React.useState('08012345678');
    const [address,setAddress] = React.useState('Lagos state');
    const [phonenumberpre,setPhonenumberpre] = React.useState('+234');
    const [facebook,setFacebook] = React.useState('facebook.com/john');
    const [instagram,setInstagram] = React.useState('instagram.com/john');
    const [twitter,setTwitter] = React.useState('twitter.com/john');
    const [linkedIn, setLinkedIn] = React.useState('linkedin.com/in/john');
    const [whatsapp,setWhatsapp] = React.useState('whatsapp.com/john');

    const saveEdit = () => {
        setEditProfile(false);
    }
    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'status') {
          setStatus(e.target.value);
        } else if (e.target.id === 'email') {
          setEmail(e.target.value);
        } else if (e.target.id === 'phonenumber') {
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

    };
    
    const selectBefore = (
        <Select defaultValue={phonenumberpre} disabled={!editprofile} onChange={(value) => setPhonenumberpre(value)} style={{minWidth: '80px'}}>
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                {country.code}
                </Option>
            ))}
        </Select>
    );
    const pages =[
        {title:'Profile Dashboard'},
        {title:'Billing Details'},
        {title:'Activities'},
        {title:'Change Password'},
        {title:'Terminate Account'},
        {title:'Sign Out'}
    ]
    const [currentpage, setCurrentPage] = React.useState(pages[0]);

    const handlescreen = (index)=> {
        setCurrentPage(pages[index]);
    };
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Logic to save billing details
      };
    
      const onEdit = () => {
        setEditMode(true);
      };
    
  return (
    <Layout style={{ minHeight: '100vh', marginTop: '70px' }}>
      <Sider collapsible style={{ minHeight: '100vh', overflow: 'auto' }}> 
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => handlescreen(0)}>
                Personal Details
            </Menu.Item>
            <Menu.Item key="2" icon={<DollarCircleOutlined />} onClick={() => handlescreen(1)}>
                Billing Details
            </Menu.Item>
            <Menu.Item key="3" icon={<HistoryOutlined/>} onClick={() => handlescreen(2)}>
                Activities
            </Menu.Item>
            <Menu.Item key="4" icon={<LockOutlined />} onClick={() => handlescreen(3)}>
                Change Password
            </Menu.Item>
            <Menu.Item key="5" icon={<CloseCircleOutlined/>} onClick={() => handlescreen(4)}>
                Terminate Account
            </Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined/>} onClick={() => handlescreen(5)}>
                Sign Out
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 14px', height:'50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Title level={3} style={{ margin: 0, color:'white',marginTop:'6px' }}>{currentpage.title}</Title>
                {/* Add any other header content here */}
            </div>
        </Header>
        <Content style={{ margin: '0 0px' }}>
            {currentpage.title === 'Profile Dashboard' && 
                <div style={{ padding: 8, minHeight: 360 }}>
                    <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
                    <Breadcrumb
                        items={[
                            {href: '/',title: <HomeOutlined />,},
                            {title: (<><UserOutlined /><span>{userdetails}dfsvdff</span></>),},
                        ]}
                    />
                    <EditOutlined onClick={() =>setEditProfile(true)} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </div>
                    <Row justify="center" align="middle" style={{ marginBottom: '30px' }} >
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: colors.primarybackground}} >
                            <div className='d-flex flex-column justify-content-between align-items-center ms-2 p-2'>
                                <Avatar size={150} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <div className='d-flex flex-column justify-content-left'>
                                    <Title level={3}>Mr. John Doe</Title>
                                    <Text strong>Status: {userdetails}</Text> 
                                    <Text strong>Phone Number: {userdetails}</Text> 
                                    <Text strong>Email: {userdetails}</Text> 
                                    <Text strong>Location: New York, USA</Text> 
                                </div>
                            </div>
                        </Col>
                        
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} span={24} >
                            <div className='d-flex flex-column justify-content-left ms-2 p-2'>
                                <Text strong style={{alignSelf:'self-start'}}> 
                                    Full Name: 
                                </Text>
                                <input id="name" type="text" className="form-control" placeholder={name} value={name} onChange={handleInputChange} disabled={!editprofile} />
                                <Text strong style={{alignSelf:'self-start'}}>Status: </Text>
                                <input id="status" type="text" className="form-control" placeholder={status} value={status} disabled /> 
                                <Text strong style={{alignSelf:'self-start'}}>Phone Number: 
                                </Text> 
                                <Input id="phonenumber" type="text" addonBefore={editprofile && selectBefore }  placeholder={phonenumber} onChange={handleInputChange} value={phonenumber} disabled={!editprofile} />
                                <Text strong style={{alignSelf:'self-start'}}>Email: </Text>
                                <input id="email" type="text" className="form-control" placeholder={email} value={email} onChange={handleInputChange} disabled={!editprofile} /> 
                                <Text strong style={{alignSelf:'self-start'}}>Address: </Text> 
                                <input id="address" type="text" className="form-control" placeholder={address} value={address} onChange={handleInputChange} disabled={!editprofile} />
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
                                <FacebookOutlined style={{fontSize:16, color:'#1877F2'}} />: <input id="facebook" type="text" className="form-control" placeholder={facebook} value={facebook} onChange={handleInputChange} disabled={!editprofile} /></Text>
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Twitter <span></span>
                                    </a>
                                    <TwitterOutlined style={{fontSize:16,color:'#1DA1F2'}} />: <input id="twitter" type="text" className="form-control" placeholder={twitter} value={twitter} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Instagram <span></span>
                                    </a>
                                    <InstagramOutlined style={{fontSize:16, color:'#E4405F'}} />: <input id="instagram" type="text" className="form-control" placeholder={instagram} value={instagram} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        Whatsapp <span></span>
                                    </a>
                                <WhatsAppOutlined style={{fontSize:16, color:'#25D366'}} />: <input id="whatsapp" type="text" className="form-control" placeholder={whatsapp} value={whatsapp} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                                
                                <Text strong className='mb-2'>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                        LinkedIn <span></span>
                                    </a>
                                <LinkedinOutlined style={{fontSize:16, color:'#0077B5'}} />: <input id="linkedln" type="text" className="form-control" placeholder={linkedIn} value={linkedIn} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                                
                            </div>  
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editprofile ?
                        <Col>
                            <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                        </Col>
                        :
                        <>
                        </>
                        }
                    </Row>
                </div>
            }
            {currentpage.title === 'Billing Details' && 
                <div style={{ padding: 8, minHeight: 360 }}>
                    <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: colors.primarybackground }}>
                        <Breadcrumb
                            items={[
                                {href: '/',title: <HomeOutlined />,},
                                {title: (<><UserOutlined /><span>{userdetails}dfsvdff</span></>),},
                            ]}
                        />
                        <EditOutlined onClick={() =>onEdit()} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </div>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: colors.primarybackground, padding:'12px'}} >
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                fullName: 'John Doe',
                                address: '123 Main St, New York, NY 10001',
                                accountNumber: '123456789',
                                cardNumber: '**** **** **** 1234',
                                cardType: 'Visa',
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item label="Full Name" name="fullName">
                                <Input disabled={!editMode} />
                                </Form.Item>
                                <Form.Item label="Address" name="address">
                                <Input.TextArea disabled={!editMode} />
                                </Form.Item>
                                <Form.Item label="Account Number" name="accountNumber">
                                <Input disabled={!editMode} />
                                </Form.Item>
                                <Form.Item label="Card Number" name="cardNumber">
                                <Input disabled={!editMode} />
                                </Form.Item>
                                <Form.Item label="Card Type" name="cardType">
                                <Input disabled={!editMode} />
                                </Form.Item>
                                
                            </Form>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editMode ?
                        <Col>
                            <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={onEdit} />
                        </Col>
                        :
                        <>
                        </>
                        }
                    </Row>
                </div>
            }
            {currentpage.title === 'Activities' && 
                <Activities />
            }
            {currentpage.title === 'Change Password' && 
                <ChangePassword />
            }
            {currentpage.title === 'Terminate Account' &&
              <CloseAccount />
            }
            {currentpage.title === 'Sign Out'  && <SignOut/>}
        </Content>
    </Layout>

    </Layout>
  );
};

export default ProfilePage;
