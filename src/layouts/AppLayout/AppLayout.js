import React from 'react';
import PropTypes from 'prop-types';
import {Layout } from "antd";
import Header from '../../components/header';
import { colors } from '../../components/style';
const { Footer, Content } = Layout;
const logo = 'https://cdn.durable.co/blocks/1cgSWideq4sUHRAzrib9feRIIn3eEPdrb9UZwYFoNKcRu1AL3KgsrmP6V0KfqeZz.jpg';

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: colors.primarybackground,
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};
const AppLayout = ({ children }) => (
    <Layout style={layoutStyle}>
        <Header logo={logo} menuItems={[{url:"/",name:'Home'},{url:"/",name:"Artworks"} ,{url:"/",name:"About Us"},{url:"/",name:"Contact"} ]} isloggedIn={false} />
        
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>Footer</Footer>
    </Layout>
);
AppLayout.propTypes = {
    children: PropTypes.node,
}

export default AppLayout;