import React from 'react';
import { Row, Col } from 'antd';
import { Button} from "../../components/button";
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const LogoutPage = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Your logout logic here
        // For example, clearing local storage, redirecting to login page, etc.
        console.log('Logging out...');
        // Redirect to the login page after logout
        history.push('/login');
    };

    return (
        <Row justify="center" style={{ marginTop: '100px' }}>
            <Col span={8}>
                <h2>Logout</h2>
                <p>Are you sure you want to log out?</p>
                <Button text="Logout" icon={<LogoutOutlined />} onClick={handleLogout} classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
            </Col>
        </Row>
    );
};

export default LogoutPage;
