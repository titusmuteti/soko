import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux'; 
import { Link, useLocation } from 'react-router-dom';
import soko from '../assests/images/soko.png';
import Dropdown from 'react-bootstrap/Dropdown';

function NavBar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const first_name = localStorage.getItem('first_name'); // Retrieve the stored first name

  // Get the current location
  const location = useLocation();

  // Define an array of route paths where you want to display the NavBar
  const showNavBarOnRoutes = ['/cart', '/payment', "/"];

  // Include product detail routes like 'products/1', 'products/2', etc.
  if (location.pathname.startsWith('/products/')) {
    showNavBarOnRoutes.push(location.pathname);
  }

  // Check if the current location is in the array
  const shouldShowNavBar = showNavBarOnRoutes.includes(location.pathname);

  if (!shouldShowNavBar) {
    return null; // Don't render the NavBar on certain routes
  }

  function handleLogout(){
    localStorage.removeItem('first_name');
    
    window.location.href = '/';

  }

  return (
    <Navbar expand="lg" className="bg-white" style={{ marginTop: '50px' }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>SOKO <img src={soko} style={{ height: "10px" }} /> </Navbar.Brand>
        <Form className="d-flex pl-4" style={{ width: '50em', marginLeft: '5em' }}>
          <Form.Control
            type="search"
            placeholder="Search products, categories and brands"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" style={{ background: 'orange' }}>SEARCH</Button>
        </Form>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            <Nav.Link href="/help" style={{ marginLeft: '2em' }}>Help</Nav.Link>
            
            {first_name ? ( // Check if the user is logged in
              <Dropdown className='mt-1'>
                <Dropdown.Toggle variant="transparent" id="account-dropdown" className='text-muted'>
                 <BsPersonFill style={{ fontSize: "24px", marginRight: "3px", marginBottom:"4px" }}/> Hi, {first_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                  <br/>
                  <Button variant='transparent' onClick={handleLogout} style={{ fontSize:"14px", fontWeight:"bold", color:"orange", width:"100%"}}>LOGOUT</Button>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link href="/login" style={{ marginLeft: '2em' }}>
                <BsPersonFill style={{ fontSize: "24px", marginRight: "6px" }} />Account
              </Nav.Link>
            )}
            
            <Nav.Link to="/cart" style={{ marginLeft: '2em', }}>
              <div>
                <BsFillCartFill style={{ fontSize: "30px"}} />
                {cartItemCount > 0 && (
                  <span
                    className="cart-notification"
                    style={{
                      backgroundColor: "orange",
                      color: "white",
                      borderRadius: "30%",
                      padding: "4px",
                      fontSize: "12px",
                      position: "absolute",
                      top: "-5px",
                      right: "0px",
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
