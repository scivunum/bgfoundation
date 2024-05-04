import React from 'react';
import PropTypes from 'prop-types';
import {MessageOutlined } from '@ant-design/icons';
import { Button} from "../../components/button";
import Header from '../../components/header';
import Footer from '../../components/footer';
import { colors } from '../../components/style';
import { Modal, Input, Layout,FloatButton  } from 'antd';
const {Content } = Layout;
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

const AppLayout = ({ children, handleOpen, handleClose, visible, message, handleChange, handleSend,isloggedIn }) => (
    <Layout style={layoutStyle}>
        <Header logo={logo} menuItems={[{url:"/",name:'Home'},{url:"/aution",name:"Artworks"} ,{url:"/about",name:"About Us"},{url:"/blog",name:"Blog"},{url:"/contact",name:"Contact"} ]} isloggedIn={isloggedIn} />
        
        <Content style={contentStyle}>{children}</Content>
        <FloatButton
          icon={<MessageOutlined style={{ color: colors.primary }}/>}
          size="large"
          style={{
            right: 14,
            backgroundColor: colors.primarybackground
          }}
          onClick={handleOpen}
        />
        <Footer style={footerStyle} />
          <Modal
          title="Customer Service"
          visible={visible}
          onCancel={handleClose}
          footer={null}
        >
          {/* Your chat content goes here */}
          <div style={{ marginBottom: 16 }}>
                <Input value={message} onChange={handleChange} placeholder="Type your message" />
            </div>
            <Button to="/chat" text="Send" classname={'text-center'} onClick={handleSend}  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100px'}}/>
                
        </Modal>
    </Layout>
);
AppLayout.propTypes = {
    children: PropTypes.node,
}

export default AppLayout;