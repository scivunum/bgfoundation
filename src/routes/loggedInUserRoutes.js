import React, { useState } from 'react';
import AppLayout from "../layouts/AppLayout/AppLayout";
import LandingPage from "../pages/home";
import AboutPage from "../pages/about";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import NotFoundPage from "../pages/404notfound";
import EventPage from "../pages/event";
import ArtworksPage from "../pages/artworks";
import ArtworkDetailPage from "../pages/artpage";
import ProfilePage from '../pages/auth/profile';
import AdminPage from '../pages/admin/main';
import AdminDashboard from '../pages/admin/dashboard';
import AdminAboutPage from '../pages/admin/about';
import AdminArtworks from '../pages/admin/artwork/artworks';
import AddArtworkForm from '../pages/admin/artwork/addartwork';
import ArtworkDetail from '../pages/admin/artwork/artworkdetail';
import AdminEvents from '../pages/admin/events/events';
import AddEventForm from '../pages/admin/events/addevent';
import EventDetail from '../pages/admin/events/eventdetails';
import AdminPayments from '../pages/admin/payments/payments';
import AddPaymentForm from '../pages/admin/payments/addpayment';
import PaymentDetail from '../pages/admin/payments/paymentdetails';
import AdminUsers from '../pages/admin/users/users';
import UserDetails from '../pages/admin/users/usersdetail';
import AddUserForm from '../pages/admin/users/adduser';

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
    {
        route:'/admin',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/dashboard',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminDashboard isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/about',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminAboutPage isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/users',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminUsers isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/users/add',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AddUserForm isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/users/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <UserDetails isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/profile/:id/payments/add',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AddPaymentForm isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/profile/:id/payments/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <PaymentDetail isloggedIn={true}/>
            </AppLayout>
        }
    },
    
    {
        route:'/admin/artworks',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminArtworks isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/artworks/add',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AddArtworkForm isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/artworks/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <ArtworkDetail isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/events',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminEvents isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/events/add',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AddEventForm isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/events/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <EventDetail isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/payments',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AdminPayments isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/payments/add',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <AddPaymentForm isloggedIn={true}/>
            </AppLayout>
        }
    },
    {
        route:'/admin/payments/:id',
        component:() => {
            return <AppLayout isloggedIn={true}>
                <PaymentDetail isloggedIn={true}/>
            </AppLayout>
        }
    },

    //auction
    
    {
        route: '*',
        component: NotFoundPage
    },
]