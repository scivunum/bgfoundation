import AppLayout from "../layouts/AppLayout/AppLayout";
import LandingPage from "../pages/home";
import React, { useState } from 'react';

const Main = () => {
    const [visible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        // Add your logic to send the message
        console.log('Sending message:', message);
        // Clear the input field after sending the message
        setMessage('');
    };

    return (
        <AppLayout handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <LandingPage companyname={'BGF Auction'} />
        </AppLayout>
    );
};

export const publicUserRoutes = [
    {
        route: '/',
        component: Main
    },
    {
        route: '*',
        component: () => {
            return <>Page not found</>
        }
    },
];
