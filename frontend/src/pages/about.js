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
  const [about, setAbout] = useState(null);
  const [aboutfaqs, setAboutfaqs] = useState(null);

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Your message has been sent successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form fields and try again.');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/about`);
        const aboutData = response.data;
        if (aboutData.size < 1) {
          setAbout({
            companyName: companyname,
            info: `${companyname} is a leading provider of art auction services, dedicated to connecting artists and collectors worldwide.`,
            mission: `Our mission is to promote the appreciation and accessibility of art by offering a platform for artists to showcase their work and for collectors to discover unique pieces.`,
            terms_and_conditions: `Terms and Conditions for ${companyname} Auction.
                ...
                `
          });
          setAboutfaqs([
            {
              header: 'How to Auction',
              content: [
                '1. Register as a seller',
                '2. Create an auction',
                '3. Add your artwork',
                '4. Set your auction details',
                '5. Start bidding',
                '6. Collect your artwork'
              ],
              img: auctionimg
            },
            {
              header: 'How to Bid',
              content: [
                '1. Register as a buyer',
                '2. Search for an auction',
                '3. Bid on the auction',
                '4. Collect your artwork'
              ],
              img: biddingimg
            },
            {
              header: 'Register as an Auctioneer',
              content: [
                '1. Fill out the registration form',
                '2. Verify your email address',
                '3. Complete your profile information',
                '4. Agree to the terms and conditions'
              ],
              img: auctioneer
            },
            {
              header: 'Register as a Bidder',
              content: [
                '1. Fill out the registration form',
                '2. Verify your email address',
                '3. Complete your profile information',
                '4. Agree to the terms and conditions'
              ],
              img: bidder
            }
          ]);
        } else {
          setAbout(aboutData);
          setAboutfaqs([
            {
              header: 'How to Auction',
              content: aboutData.how_to_auction,
              img: auctionimg
            },
            {
              header: 'How to Bid',
              content: aboutData.how_to_bid,
              img: bidder
            },
            {
              header: 'Register as Bidder',
              content: aboutData.register_as_bidder,
              img: bidder
            },
            {
              header: 'Register as Auctioneer',
              content: aboutData.register_as_auctioneer,
              img: auctioneer
            }
          ]);
        }

       
      } catch (error) {
        console.error('Error fetching the about data:', error);
      }
    };

    fetchData();

    const hash = location.hash.substring(1);
    if (hash === 'termsandconditions' && termsConditionsRef.current) {
      termsConditionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (hash === 'contactus' && contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash, companyname]);

  if (!about || !aboutfaqs) {
    return <LoadingSpinner style={{ padding: '24px', marginTop: "70px", backgroundColor: 'white' }} />;
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
            {aboutfaqs.map((faq, index) => (
              <Panel header={faq.header} key={index} onClick={() => setCurrentFaqImg(faq.img)}>
                {faq.content.map((f, idx) => (<Paragraph key={idx}>{f}</Paragraph>))}
              </Panel>
            ))}
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
