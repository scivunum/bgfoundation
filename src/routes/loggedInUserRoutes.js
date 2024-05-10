import React, { useState } from 'react';
import AppLayout from "../layouts/AppLayout/AppLayout";
import LandingPage from "../pages/home";
import AboutPage from "../pages/about";
//import ContactPage from "../pages/contact";
import LoginPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import NotFoundPage from "../pages/404notfound";
import BlogPage from "../pages/blog";
import BlogPostPage from "../pages/blogpost";
import EventPage from "../pages/event";
import ArtworksPage from "../pages/artworks";

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
        <AppLayout isloggedIn={false} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <LandingPage isloggedIn={false} companyname={'BGF Auction'} />
        </AppLayout>
    );
};
const About = () => {
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
        <AppLayout isloggedIn={false} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <AboutPage isloggedIn={false} companyname={'BGF Auction'} />
        </AppLayout>
    );
};
const Login = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setVisible(true);
    };
    const handleClose = () => {
        setVisible(false);
    };

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
        <AppLayout isloggedIn={false} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <LoginPage/>
        </AppLayout>
    );
};
const Signup = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setVisible(true);
    };
    const handleClose = () => {
        setVisible(false);
    };

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
        <AppLayout isloggedIn={false} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <SignupPage/>
        </AppLayout>
    );
};
export const loggedInUserRoutes = [
    {
        route: '/',
        component: Main
    },
    {
        route: '/about',
        component: About
    },
    {
        route: '/login',
        component: Login
    },
    {
        route: '/signup',
        component: Signup
    },
    {
        route:'/blogs',
        component:() => {
            return <AppLayout>
                <BlogPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/blogs/:id',
        component:() => {
            return <AppLayout>
                <BlogPostPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/artworks',
        component:() => {
            return <AppLayout>
                <ArtworksPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/artworks/:id',
        component:() => {
            return <AppLayout>
                <ArtworksPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/events',
        component:() => {
            return <AppLayout>
                <EventPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/events/:id',
        component:NotFoundPage
    },
    //main
    //blog
    //logout
    //about
    //profile
    //contact
    //auction
    //artworks
    //resetpassword---
    //logout----
    //payment
    //payment/crypto
    //payment/card
    
    {
        route: '*',
        component: NotFoundPage
    },
]