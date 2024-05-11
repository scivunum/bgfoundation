import React, { useState } from 'react';
import AppLayout from "../layouts/AppLayout/AppLayout";
import LandingPage from "../pages/home";
import AboutPage from "../pages/about";
//import ContactPage from "../pages/contact";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import NotFoundPage from "../pages/404notfound";
import BlogPage from "../pages/blog";
import BlogPostPage from "../pages/blogpost";
import EventPage from "../pages/event";
import ArtworksPage from "../pages/artworks";
import ArtworkDetailPage from "../pages/artpage";
import ProfilePage from '../pages/auth/profile';

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
        <AppLayout isloggedIn={true} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <LandingPage isloggedIn={true} companyname={'BGF Auction'} />
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
        <AppLayout isloggedIn={true} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <AboutPage isloggedIn={true} companyname={'BGF Auction'} />
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
const Logout = () => {
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
        <AppLayout isloggedIn={true} handleOpen={handleOpen} handleClose={handleClose} visible={visible} handleSend={handleSend} message={message} handleChange={handleChange}>
            <LogoutPage/>
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
        route: '/logout',
        component: Logout
    },
    {
        route: '/signup',
        component: Signup
    },
    {
        route:'/blogs',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <BlogPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/blogs/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <BlogPostPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/artworks',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <ArtworksPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/artworks/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <ArtworkDetailPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/events',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <EventPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/events/:id',
        component:NotFoundPage
    },
    {
        route:'/profile/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <ProfilePage isloggedIn={true}/>
            </AppLayout>
        }
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