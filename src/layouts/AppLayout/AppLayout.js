import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {MessageOutlined } from '@ant-design/icons';
import { Button} from "../../components/button";
import Header from '../../components/header';
import Footer from '../../components/footer';
import { colors } from '../../components/style';
import { Modal, Layout, List, Input, FloatButton  } from 'antd';
const { Content } = Layout;
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
  backgroundColor: colors.primarybackground,
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <Layout>
      <Layout.Header><span className='text-white'>How can we Help?</span></Layout.Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <List
            size="small"
            bordered
            dataSource={messages}
            renderItem={(message, index) => <List.Item>{message}</List.Item>}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handleSendMessage}
            placeholder="Type your message..."
            style={{ marginRight: '10px' }}
          />
          <Button text={'Send'} onClick={handleSendMessage} />
        </div>
      </Content>
    </Layout>
  );
};
const AppLayout = ({ children, handleOpen, handleClose, visible, message, handleChange, handleSend,isloggedIn }) => (
    <Layout style={layoutStyle}>
        <Header logo={logo} menuItems={[{url:"/",name:'Home'},{url:"/about",name:"About Us"},{url:"/artworks",name:"Artworks"},{url:"/events",name:"Event"} ,{url:"/blogs",name:"Blog"} ]} isloggedIn={isloggedIn} />
        
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
          style={{zIndex:99999}}
        >
          <ChatPage />
        </Modal>
    </Layout>
);
AppLayout.propTypes = {
    children: PropTypes.node,
}

export default AppLayout;