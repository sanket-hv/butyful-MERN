import React from 'react';
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { getUser, removeUserFromSession, getPermission } from '../utils/Common';
import { withRouter, NavLink } from "react-router-dom";


function NavbarHeader(props) {
    const user = getUser();
    const permission = JSON.parse(getPermission());
    const IsAdmin = sessionStorage.getItem('admin');
    const handleLogout = () => {
        removeUserFromSession();
        sessionStorage.removeItem('admin');
        props.history.push('/login');
    }
    let navbarItems;
    let homeItem;
    if(permission !== null){
        let arrayOfPermission = JSON.parse(permission);
        navbarItems = <Nav className="mr-auto">

            <NavLink exact to="/items" exact className="nav-link" style={arrayOfPermission[0].flgIsAccess === 0 ? {display: 'none'} : {} }>Item</NavLink>
            <NavLink exact to="/item-report" exact className="nav-link" style={arrayOfPermission[1].flgIsAccess === 0 ? {display: 'none'} : {} }>Item Report</NavLink>
            <NavLink exact to="/production" exact className="nav-link" style={arrayOfPermission[2].flgIsAccess === 0 ? {display: 'none'} : {} }>Production</NavLink>
            <NavLink exact to="/users" exact className="nav-link" style={arrayOfPermission[3].flgIsAccess === 0 ? {display: 'none'} : {} }>Users</NavLink>
            <NavDropdown title={user} id="collasible-nav-dropdown">
                    {/* <NavDropdown.Item href="#reset-password">Reset Password</NavDropdown.Item> */}
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
        </Nav>;
    }else{
        navbarItems = <Nav>
            <NavDropdown title={user} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#reset-password">Reset Password</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
        </Nav>;
    }

    if(IsAdmin !== null){
        if(IsAdmin === "1"){
           homeItem = <Nav className="mr-auto"> <NavLink exact to="/dashboard" exact className="nav-link" >Dashboard</NavLink> </Nav>
        }else{
            homeItem = <Nav className="mr-auto"> <NavLink exact to="/home" exact className="nav-link" >Home</NavLink> </Nav>
        }
    }else{
        homeItem =  <Nav className="mr-auto"> <NavLink exact to="/home" exact className="nav-link" >Home</NavLink> </Nav>
    }

    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Butyful</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {homeItem}
                {navbarItems}
            </Navbar.Collapse>
            </Navbar>
        </div>);
}

export default withRouter(NavbarHeader);