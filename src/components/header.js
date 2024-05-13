import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button, NavLink, IconButton } from './button';
import { Link } from 'react-router-dom';
import { CloseOutlined, MenuOutlined,UserOutlined } from '@ant-design/icons';
import { Drawer,Avatar,Dropdown, Menu } from 'antd';
import Logo from '../assets/logo.jpg';
import { colors } from './style';


const Header = ({ Companyname,isloggedIn, logo, menuItems }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentactive, setCurrentActive] = useState(null);
    //const [isAdmin, SetAdmin] = useState(false);
    const isAdmin = true;
    const showDrawer = () => {
        setIsMenuOpen(true);
    };
    const onClose = () => {
        setIsMenuOpen(false);
    };
    const userid="54656768234bf"
    const profileMenu=(
        <Menu>
            {/* Your mail dropdown menu items */}
            {isloggedIn?<Menu.Item key="1"><Link to={`/profile/${userid}`} style={{textDecoration:'none'}}>View Profile</Link></Menu.Item>:<Menu.Item key="1"><Link to={`/login`} style={{textDecoration:'none'}}>Login</Link></Menu.Item>}
            {isAdmin && isloggedIn?<Menu.Item key="2"><Link to='/admin' style={{textDecoration:'none'}}>View Admin</Link></Menu.Item>:<></>}
            {isloggedIn?<Menu.Item key="3"><Link to={`/logout`} style={{textDecoration:'none'}}>Sign Out</Link></Menu.Item>:<></>}
            {/* Add more menu items as needed */}
        </Menu>
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Navbar bg="white" expand="lg" fixed="top" className="m-0 p-0" style={{backgroundColor:colors.primarybackground}}>
                {isMobile ? (
                    <Container>
                        <Navbar.Brand href="/" className="">
                            <img src={Logo || 'https://cdn.durable.co/blocks/1cgSWideq4sUHRAzrib9feRIIn3eEPdrb9UZwYFoNKcRu1AL3KgsrmP6V0KfqeZz.jpg'} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                            <span className="navbar-title"> {Companyname}</span>
                        </Navbar.Brand>
                        <div className="d-flex justify-content-between align-items-center m-1" style={{marginLeft: 'auto'}}>
                            <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                                <Avatar size={30} icon={<UserOutlined />} className="me-3" style={{ fontSize: '20px', cursor:'pointer' }} />
                            </Dropdown>
                            {isMenuOpen ? (
                                <IconButton hover={false} onClick={onClose} className="close-menu ms-0" icon={<CloseOutlined />} />
                            ) : (
                                <IconButton hover={false} onClick={showDrawer} className="open-menu ms-0" icon={<MenuOutlined />} />
                            )}
                        </div>
                        <Drawer
                            title="Basic Drawer"
                            placement={'left'}
                            closable={false}
                            onClose={onClose}
                            open={isMenuOpen}
                            key={'left'}
                            width={'70%'}
                        >
                            {menuItems.map((item, index) => (
                                <NavLink key={index + 1} to={item.url} text={item.name} className={`m-2 ${currentactive === item.name? 'active' : ''}`} onClick={() => setCurrentActive(item.name)} />
                            ))}
                            
                            {isloggedIn?
                            <NavLink to="/logout" text="Logout" className="m-2" />
                            :
                            <NavLink to="/login" text="Login" className="m-2" />}
                            
                            <Button to="/contribute" text="Bid"  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}/>
                        </Drawer>

                        
                    </Container>
                ) : (
                    <Container>
                        <Navbar.Brand href="#home" className="">
                            <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                            <span className="navbar-title"> {Companyname}</span>
                        </Navbar.Brand>
                        
                        <Nav className="ms-auto navbar-nav-links d-flex justify-content-between align-items-center" activeKey="/home">
                            {menuItems.map((item, index) => (
                                <NavLink key={index + 1} to={item.url} text={item.name} className={`m-2 ${currentactive === item.name? 'active' : ''}`} onClick={() => setCurrentActive(item.name)} />
                            ))}    
                        </Nav>
                            
                        {isloggedIn?
                            <NavLink to="/logout" text="Logout" className="m-2" />
                            :
                            <NavLink to="/login" text="Login" className="m-2" />}
                        
                        <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                            
                            <Avatar size={30} icon={<UserOutlined />} className="me-3" style={{ fontSize: '20px', cursor:'pointer' }} />
                        </Dropdown>
                        <Button to="/contribute" text="Bid"  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}/>
                    </Container>
                )}
        </Navbar>
    );
};

export default Header;
