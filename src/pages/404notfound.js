import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../components/style';

const NotFoundPage = () => {
    return (
        <div className="container py-5" style={{backgroundColor: colors.primarylight, height: '100vh'}}>
            <div className="justify-content-center py-5" style={{backgroundColor: colors.primarylight, height: '100vh'}}>
                <h2 className="text-center mb-4">404 - Page Not Found</h2>
                <p className="text-center">Oops! The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
