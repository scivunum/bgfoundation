import React, { useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import { MessageOutlined } from '@ant-design/icons';
import { Button } from "../../components/button";
import Header from '../../components/header';
import Footer from '../../components/footer';
import { colors } from '../../components/style';
import { Modal, Layout, List, Input, FloatButton, notification } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

const { Content } = Layout;
const logo = 'https://cdn.durable.co/blocks/1cgSWideq4sUHRAzrib9feRIIn3eEPdrb9UZwYFoNKcRu1AL3KgsrmP6V0KfqeZz.jpg';

const contentStyle = {
  textAlign: 'center',
  minHeight: '120px',
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
      <Layout.Header>
        <span className='text-white'>How can we help?</span>
      </Layout.Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <List
            size="small"
            bordered
            dataSource={messages}
            renderItem={(message, index) => <List.Item key={index}>{message}</List.Item>}
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

const Context = React.createContext({
  name: 'Default',
});

const AppLayout = ({ children, isloggedIn }) => {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const [api, contextHolder] = notification.useNotification();
  
  const contextValue = useMemo(() => ({
    name: 'unknown',
  }), []);
  const getRandomInterval = () => Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
  

  const openNotification = (possibleNotifications, api) => {
    const randomNotification = possibleNotifications[Math.floor(Math.random() * possibleNotifications.length)];
    api.success({
      message: randomNotification.message,
      description: <Context.Consumer>{({ name }) => <Paragraph>{randomNotification.description}</Paragraph>}</Context.Consumer>,
      placement: 'bottomLeft',
      
    });
  };

  useEffect(() => {
    const possibleNotifications = [
      { message: 'User joined', description: 'John Doe just joined!' },
      { message: 'New Bid', description: `Emma Watson just bid on "Starry Night" for $12,000` },
      { message: 'New Bid', description: `Robert Brown just bid on "The Persistence of Memory" for $9,000` },
      { message: 'User joined', description: 'Alice Johnson just joined!' },
      { message: 'User joined', description: 'Michael Smith just joined!' },
      { message: 'New Bid', description: `Olivia Williams just bid on "The Last Supper" for $35,000` },
      { message: 'New Bid', description: `James Miller just bid on "Guernica" for $28,000` },
      { message: 'User joined', description: 'Sophia Davis just joined!' },
      { message: 'New Bid', description: `Isabella Martinez just bid on "The Scream" for $15,000` },
      { message: 'User joined', description: 'Mia Rodriguez just joined!' },
      { message: 'New Bid', description: `Benjamin Wilson just bid on "The Kiss" for $42,000` },
      { message: 'User joined', description: 'William Moore just joined!' },
      { message: 'New Bid', description: `Elijah Taylor just bid on "Girl with a Pearl Earring" for $19,000` },
      { message: 'User joined', description: 'Lucas Anderson just joined!' },
      { message: 'New Bid', description: `Charlotte Thomas just bid on "The Creation of Adam" for $30,000` },
      { message: 'New Bid', description: `Henry White just bid on "American Gothic" for $25,000` },
      { message: 'User joined', description: 'Amelia Harris just joined!' },
      { message: 'New Bid', description: `Daniel Clark just bid on "The Birth of Venus" for $40,000` },
      { message: 'User joined', description: 'Jackson Lewis just joined!' },
      { message: 'New Bid', description: `Lily King just bid on "Mona Lisa" for $50,000` },
      { message: 'New Bid', description: `Sebastian Walker just bid on "The Night Watch" for $21,000` },
      { message: 'User joined', description: 'Grace Hall just joined!' },
      { message: 'New Bid', description: `Zoe Allen just bid on "The Thinker" for $16,000` },
      { message: 'User joined', description: 'Jack Young just joined!' },
      { message: 'New Bid', description: `Madison Hernandez just bid on "The Arnolfini Portrait" for $27,000` },
      { message: 'New Bid', description: `Alexander Wright just bid on "Las Meninas" for $32,000` },
      { message: 'User joined', description: 'Ella Lopez just joined!' },
      { message: 'New Bid', description: `Logan Hill just bid on "The Hay Wain" for $18,000` },
      { message: 'User joined', description: 'Harper Scott just joined!' },
      { message: 'New Bid', description: `Mason Green just bid on "The Fighting Temeraire" for $26,000` },
      { message: 'New Bid', description: `Aiden Adams just bid on "The Garden of Earthly Delights" for $37,000` },
      { message: 'User joined', description: 'Aria Baker just joined!' },
      { message: 'New Bid', description: `Lucas Gonzalez just bid on "The Persistence of Memory" for $9,000` },
      { message: 'User joined', description: 'Leah Nelson just joined!' },
      { message: 'New Bid', description: `Charlotte Carter just bid on "The Last Supper" for $35,000` },
      { message: 'User joined', description: 'Owen Mitchell just joined!' },
      { message: 'New Bid', description: `Henry Perez just bid on "Guernica" for $28,000` },
      { message: 'User joined', description: 'Luna Roberts just joined!' },
      { message: 'New Bid', description: `Samuel Turner just bid on "The Scream" for $15,000` },
      { message: 'User joined', description: 'Sophie Phillips just joined!' },
      { message: 'New Bid', description: `Isaac Campbell just bid on "The Kiss" for $42,000` },
      { message: 'User joined', description: 'Ava Parker just joined!' },
      { message: 'New Bid', description: `Nathan Evans just bid on "Girl with a Pearl Earring" for $19,000` },
      { message: 'User joined', description: 'Emma Edwards just joined!' },
      { message: 'New Bid', description: `Levi Collins just bid on "The Creation of Adam" for $30,000` },
      { message: 'User joined', description: 'Ella Stewart just joined!' },
      { message: 'New Bid', description: `Liam Sanchez just bid on "American Gothic" for $25,000` },
      { message: 'User joined', description: 'Harper Morris just joined!' },
      { message: 'New Bid', description: `Daniel Bell just bid on "The Birth of Venus" for $40,000` },
      { message: 'User joined', description: 'James Rivera just joined!' },
      { message: 'New Bid', description: `Jackson Murphy just bid on "Mona Lisa" for $50,000` },
      { message: 'User joined', description: 'Grace Cook just joined!' },
      { message: 'New Bid', description: `Elijah Rogers just bid on "The Night Watch" for $21,000` },
      { message: 'User joined', description: 'Aiden Reed just joined!' },
      { message: 'New Bid', description: `Logan Cooper just bid on "The Thinker" for $16,000` },
      { message: 'User joined', description: 'Madison Bailey just joined!' },
      { message: 'New Bid', description: `Benjamin Morgan just bid on "The Arnolfini Portrait" for $27,000` },
      { message: 'User joined', description: 'Mason Kelly just joined!' },
      { message: 'New Bid', description: `Zoe Howard just bid on "Las Meninas" for $32,000` },
      { message: 'User joined', description: 'Jack Hughes just joined!' },
      { message: 'New Bid', description: `Isabella Diaz just bid on "The Hay Wain" for $18,000` }
    ];
    const scheduleNextNotification = () => {
      setTimeout(() => {
        openNotification(possibleNotifications, api);
        scheduleNextNotification();
      }, getRandomInterval());
    };

    scheduleNextNotification();

    return () => clearTimeout(scheduleNextNotification);
  }, [api]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Layout style={layoutStyle}>
        <Header
          logo={logo}
          menuItems={[
            { url: "/", name: 'Home' },
            { url: "/about", name: "About Us" },
            { url: "/artworks", name: "Artworks" },
            { url: "/events", name: "Event" }
          ]}
          isloggedIn={isloggedIn}
        />
        <Content style={contentStyle}>
          <div>
            {children}
            <FloatButton
              icon={<MessageOutlined style={{ color: colors.primary }} />}
              size="large"
              style={{
                right: 14,
                backgroundColor: colors.primarybackground
              }}
              onClick={handleOpen}
            />
            <Modal
              title="Customer Service"
              visible={visible}
              onCancel={handleClose}
              footer={null}
              style={{ zIndex: 99999 }}
            >
              <ChatPage />
            </Modal>
            
          </div>
        </Content>
        <Footer style={footerStyle} />
      </Layout>
    </Context.Provider>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
  isloggedIn: PropTypes.bool,
};

export default AppLayout;
