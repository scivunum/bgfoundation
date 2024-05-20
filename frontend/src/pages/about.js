import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Divider, Collapse, Row, Col, Image, Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { colors } from '../components/style';
import biddingimg from '../assets/bidding.jpg';
import auctionimg from '../assets/auctioningmace.jpg';
import auctioneer from '../assets/auctioning.jpg';
import bidder from '../assets/bidding.jpg';
import axios from 'axios';
import { backendUrl } from '../layouts/AppLayout/utils';
import LoadingSpinner from '../components/LoadingSpinner';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutPage = ({ companyname, IsloggedIn }) => {
  const [currentFaqImg, setCurrentFaqImg] = useState(biddingimg);
  const termsConditionsRef = useRef(null);
  const contactUsRef = useRef(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
    const [about, setAbout] = useState({
        _id: 'dummy-id',
        logo: 'http://dummy-logo-url.com/logo.png',
        info: 'Dummy company info',
        mission: 'Dummy mission statement',
        name: 'Dummy Company Name',
        email: 'dummy-email@company.com',
        phonenumber: '08012345678',
        phonenumberpre: '+234',
        address: 'Dummy address, City, Country',
        how_to_bid: 'Step 1: Do this\nStep 2: Do that',
        register_as_bidder: 'Step 1: Register here\nStep 2: Verification process',
        register_as_auctioneer: 'Step 1: Apply here\nStep 2: Verification process',
        how_to_register: 'Step 1: Fill the form\nStep 2: Submit documents',
        updated_by: 'Admin Name',
        last_updated: new Date().toISOString(),
        terms_and_conditions: 'Dummy terms and conditions.',
        fb: 'http://facebook.com/dummy',
        twitter: 'http://twitter.com/dummy',
        ig: 'http://instagram.com/dummy',
        linkedin: 'http://linkedin.com/in/dummy',
        telegram: 'http://telegram.com/dummy',
    });
  

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Your message has been sent successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form fields and try again.');
  };
  const fetchAboutData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get(`${backendUrl}/api/v1/about`);
          if (response.data.size > 0) {
              
              setAbout(response.data.data[0]); // Assuming the first item in the response array is what you want
              console.log('response.data.data[0]:', response.data.data[0]);
          }
      } catch (error) {
          console.error('Error fetching the about data:', error);
      }
      setIsLoading(false);
  };

  useEffect(() => {
    fetchAboutData();

    const hash = location.hash.substring(1);
    if (hash === 'termsandconditions' && termsConditionsRef.current) {
      termsConditionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (hash === 'contactus' && contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash, companyname]);

  if (isLoading) {
    return <LoadingSpinner />
}

  return (
    <div style={{ padding: '24px', marginTop: "70px", backgroundColor: 'white' }}>
      <Title level={2}>About Us</Title>
      <Divider />
      <Paragraph>{about.info}</Paragraph>
      <Paragraph>{about.mission}</Paragraph>
      <Divider />
      <Title level={3}>FAQs</Title>
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={24} lg={12} xl={12} className='py-5 mt-3'>
          <Collapse accordion>
            <Panel header='How to Bid' onClick={() => setCurrentFaqImg(biddingimg)}>
              <Paragraph>{about.how_to_bid}</Paragraph>
            </Panel>
            <Panel header='How to Register' onClick={() => setCurrentFaqImg(auctionimg)}>
              <Paragraph>{about.how_to_register}</Paragraph>
            </Panel>
            <Panel header='Register as Auctioneer' onClick={() => setCurrentFaqImg(auctioneer)}>
              <Paragraph>{about.register_as_auctioneer}</Paragraph>
            </Panel>
            <Panel header='Register as Bidder' onClick={() => setCurrentFaqImg(bidder)}>
              <Paragraph>{about.register_as_bidder}</Paragraph>
            </Panel>
          </Collapse>
        </Col>
        <Col xs={24} sm={24} lg={12} xl={12}>
          <Image src={currentFaqImg} width={'100%'} style={{ transition: "1.5s ease-in-out" }} />
        </Col>
      </Row>
      <Divider />
      <div ref={contactUsRef}></div>
      <Row justify="center" style={{ backgroundColor: colors.primarybackground }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="d-flex flex-column justify-content-center align-self-center">
          <Title level={3} className='mt-4'>Contact Us</Title>
          <Form
            name="contact-form"
            className="d-flex flex-column justify-content-center align-self-center"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: '100%', padding: '10px' }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Your Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input prefix={<MailOutlined />} type="email" placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[{ required: true, message: 'Please enter your message!' }]}
            >
              <Input.TextArea prefix={<MessageOutlined />} rows={4} placeholder="Your Message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Divider />
      <div ref={termsConditionsRef}>
        <Title level={3}>Terms and Conditions</Title>
        <Paragraph>{about.terms_and_conditions}</Paragraph>
      </div>
    </div>
  );
};

export default AboutPage;
