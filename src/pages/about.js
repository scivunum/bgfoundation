import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div style={{ padding: '24px',marginTop: "70px",backgroundColor:'white' }}>
        <Title level={2}>About Us</Title>
        <Divider />
        <Paragraph>
          [Company Name] is a leading provider of art auction services, dedicated to connecting artists and collectors worldwide.
        </Paragraph>
        <Paragraph>
          Our mission is to promote the appreciation and accessibility of art by offering a platform for artists to showcase their work and for collectors to discover unique pieces.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit, velit in ultrices luctus, arcu elit elementum lorem, vel venenatis risus lorem at dolor.
        </Paragraph>
      </div>
  );
};

export default AboutPage;
