import React,{useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Divider, Collapse, Row, Col, Image, Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { colors } from '../components/style';
import biddingimg from '../assets/bidding.jpg';
import auctionimg from '../assets/auctioningmace.jpg';
import auctioneer from '../assets/auctioning.jpg';
import bidder from '../assets/bidding.jpg';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutPage = ({companyname,IsloggedIn}) => {
  const [currentFaqImg, setCurrentFaqImg] = useState(biddingimg);
  // Create a ref for the target div
  const termsConditionsRef = useRef(null);
  
  // Use location to get the hash from the URL
  const location = useLocation();
  const about = {
    companyName: companyname,
    info: `${companyname} is a leading provider of art auction services, dedicated to connecting artists and collectors worldwide.`,
    mission :`Our mission is to promote the appreciation and accessibility of art by offering a platform for artists to showcase their work and for collectors to discover unique pieces.`,
    faqs : [
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
        icon: 'heart',
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
        icon: 'heart',
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
        icon: 'heart',
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
        icon: 'heart',
        img: bidder
      }
    ],
    termsandconditions: `Terms and Conditions for Bill and Melinda Gates Foundation Auction.
    Introduction
    Welcome to the Bill and Melinda Gates Foundation Auction. By participating in this auction, you agree to comply with these Terms and Conditions. These Terms and Conditions govern your use of the Bill and Melinda Gates Foundation Auction website and any purchases or bids made through the website. The auction is being conducted by the Bill and Melinda Gates Foundation and all proceeds will be used towards charitable causes.
    
    Intellectual Property Rights 
    All content on the Bill and Melinda Gates Foundation Auction website, including but not limited to logos, trademarks, designs, images, and text, are the property of the Bill and Melinda Gates Foundation and are protected by intellectual property laws. You are not allowed to use, copy, or reproduce any of the content without the prior written consent of the Bill and Melinda Gates Foundation. 
    Restrictions
    By participating in the auction, you agree to the following restrictions:

    - You must be 18 years or older to bid or make a purchase.
    - You must provide accurate and complete information when registering for the auction.
    - You are prohibited from using the auction website for any illegal or unauthorized purposes.
    - You are not allowed to interfere with or disrupt the functioning of the auction website.
    - You must not engage in any behavior that may harm or damage the reputation of the Bill and Melinda Gates Foundation.

    User Consent
    By participating in the Bill and Melinda Gates Foundation Auction, you give your consent for the collection and use of your personal information in accordance with our Privacy Policy. Your information will only be used for the purpose of the auction and will not be shared with any third parties without your consent.

    No Warranties
    The Bill and Melinda Gates Foundation Auction website is provided on an "as is" and "as available" basis. We do not make any warranties, express or implied, regarding the accuracy, reliability, or accessibility of the website. We reserve the right to modify or discontinue the website at any time without notice.
    Limitation of Liability
    The Bill and Melinda Gates Foundation and its directors, officers, employees, and agents will not be liable for any loss or damages, whether direct, indirect, incidental, or consequential, arising from your participation in the auction or the use of the auction website.

    Indemnification
    By participating in the auction, you agree to indemnify and hold the Bill and Melinda Gates Foundation harmless from any claims, damages, or losses arising from your actions or use of the auction website.

    Severability
    If any provision of these Terms and Conditions is found to be invalid or unenforceable, it will not affect the validity or enforceability of the remaining provisions.

    Variation of Terms
    The Bill and Melinda Gates Foundation reserves the right to amend or modify these Terms and Conditions at any time without notice. Your continued use of the auction website after any changes indicates your acceptance of the modified Terms and Conditions.

    Entire Agreement
    These Terms and Conditions constitute the entire agreement between you and the Bill and Melinda Gates Foundation regarding the auction and supersede any prior agreements or understandings, whether written or verbal.
    Governing Law and Jurisdiction.

    The laws of the state of Washington will govern these Terms and Conditions, and any disputes arising from or related to these Terms and Conditions will be subject to the exclusive jurisdiction of the courts located in King County, Washington.

    By participating in the Bill and Melinda Gates Foundation Auction, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. Thank you for supporting our charitable efforts.
    `
  }
  //setCurrentFaqImg(about.faqs[0].img);
  
  const onFinish = (values) => {
      console.log('Received values:', values);
      // Here you can implement your logic to handle the form submission
      // For example, send the form data to your backend server
      // Display a success message to the user
      message.success('Your message has been sent successfully!');
  };

  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
      // Display an error message to the user if form validation fails
      message.error('Please check the form fields and try again.');
  };
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the "#" from the hash
    if (hash === 'termsandconditions' && termsConditionsRef.current) {
      termsConditionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
  }, [location.hash]);
  
  
  return (
    <div style={{ padding: '24px', marginTop: "70px", backgroundColor: 'white' }}>
      <Title level={2}>About Us</Title>
      <Divider />
          <Paragraph>
              {about.info}
          </Paragraph>
          <Paragraph>
              {about.mission}
          </Paragraph>
      <Divider />
      <Title level={3}>FAQs</Title>
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={24} lg={12} xl={12} className=' py-5 mt-3'>
          <Collapse accordion>
            {about.faqs.map((faq, index) => (
              <Panel header={faq.header} key={index} onClick={() => setCurrentFaqImg(faq.img)}>
                {faq.content.map((f, index) => (<Paragraph>{f}</Paragraph>))}
              </Panel>
            ))}
            {/* Add more FAQ panels as needed */}
          </Collapse>
          </Col>
        <Col xs={24} sm={24} lg={12} xl={12}>
          <Image src={currentFaqImg} width={'100%'} style={{transition: "1.5s ease-in-out" }} />
        </Col>
      </Row>

      <Divider />
      
      
        <Row justify="center"  style={{backgroundColor:colors.primarybackground}}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="d-flex flex-column justify-content-center align-self-center">
                <Title level={3} className='mt-4'>Contact Us</Title>
                <Form
                    name="contact-form"
                    className="d-flex flex-column justify-content-center align-self-center"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{width:'100%', padding:'10px'}}
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
    </div>
  );
};

export default AboutPage;
