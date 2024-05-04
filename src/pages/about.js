import React,{useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Divider, Collapse, Row, Col, Image } from 'antd';
import biddingimg from '../assets/bidding.jpg';
import auctionimg from '../assets/auctioningmace.jpg';
import auctioneer from '../assets/auctioning.jpg';
import bidder from '../assets/bidding.jpg';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutPage = ({companyname,IsloggedIn}) => {
  const [currentFaqImg, setCurrentFaqImg] = useState('');
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
    termsandconditions: `By registering as a seller or buyer on ${companyname}, you agree to the following terms and conditions.`
  }
  

  // Scroll to the target div when the hash changes
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the "#" from the hash
    if (hash === 'termsandconditions' && termsConditionsRef.current) {
      termsConditionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentFaqImg(about.faqs[0].img);
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
      <Title level={3}>Gallery</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Image src="https://via.placeholder.com/150" />
        </Col>
        {/* Add more images for the gallery */}
      </Row>
      <Divider />
      <Title level={3} ref={termsConditionsRef}>Terms and Conditions</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          
        </Col>
        {/* Add more images for the gallery */}
      </Row>
    </div>
  );
};

export default AboutPage;
