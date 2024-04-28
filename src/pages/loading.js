import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { colors, fontsizes } from '../components/style';

function Loading(){
    const loadingContainerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent background
        zIndex: 9999, // ensure it's above other elements
      };
    return (
        <Spin style={loadingContainerStyle}
            indicator={
            <LoadingOutlined
                style={{
                fontSize: fontsizes.medium,
                color:colors.primary 
                }}
                spin
            />
            }
        />
    )
}
export default Loading;