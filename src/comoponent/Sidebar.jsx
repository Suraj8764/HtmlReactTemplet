import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTruckMoving, FaUser, FaQuoteRight, FaSignOutAlt } from 'react-icons/fa';
import "./Sidebar.css"
const Sidebar = () => {
    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="#">
                    <FaTruckMoving /> My Moves
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#">
                    <FaUser /> My Profile
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#">
                    <FaQuoteRight /> Get Quote
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#">
                    <FaSignOutAlt /> Logout
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
