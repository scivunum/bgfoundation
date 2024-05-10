import React from 'react';
import { Row, Col, Typography} from 'antd';
import { CreditCardOutlined, BitcoinOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button} from "../../components/button";

const { Title } = Typography;

const PaymentSelectionPage = () => {
    return (
        <Row justify="center" style={{ marginTop: '50px' }}>
            <Col span={12}>
                <Title level={2}>Select Payment Method</Title>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Button to="/payment/card" text="Credit Card" icon={<CreditCardOutlined />} classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
                    </Col>
                    <Col span={12}>
                        <Button to="/payment/crypto" text="Crypto" icon={<BitcoinOutlined />} classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default PaymentSelectionPage;
