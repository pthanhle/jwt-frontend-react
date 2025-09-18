import { useContext, useEffect, useState } from "react";
import './Nav.scss';
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.png'

const NavHeader = (props) => {

    const { user } = useContext(UserContext)
    const location = useLocation()

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className="nav-header">
                    <Navbar expand="lg" className="bg-header">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    style={{ backgroundColor: 'transparent' }} // Loại bỏ màu nền
                                // alt="React Bootstrap logo"
                                />
                                &nbsp;
                                <span className="brand-name">React JS</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link' exact>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/projects" className='nav-link'>Projects</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>
                                </Nav>
                                <Nav >
                                    <Nav.Item className="nav-link">
                                        WelCome
                                    </Nav.Item>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>
    }
}

export default NavHeader;