import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom';
import soko from '../assests/images/soko.png';
import Dropdown from 'react-bootstrap/Dropdown';
import { logoutUser } from '../redux/authActions';

function NavBar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const user = JSON.parse(localStorage.getItem('user'));
  const first_name = user ? user.first_name : null;

  const dispatch = useDispatch();
  const location = useLocation();

  //array of route paths where you want to display the NavBar
  const showNavBarOnRoutes = ['/cart', "/"];

  if (location.pathname.startsWith('/products/')) {
    showNavBarOnRoutes.push(location.pathname);
  }

  // Checks if the current location is in the array
  const shouldShowNavBar = showNavBarOnRoutes.includes(location.pathname);

  if (!shouldShowNavBar) {
    return null; 
  }

  function handleLogout(){
    localStorage.removeItem('user');

    dispatch(logoutUser());
    
    window.location.href = '/';

  }

  return (
    <Navbar expand="lg" className="bg-white" style={{ marginTop: '40px' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center" style={{marginLeft:"200px"}}>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>
            SOKO <img src={soko} style={{ height: "15px"}} />
          </Navbar.Brand>
        </div>
        <Form className="d-flex" style={{ flex: 4 }}>
          <Form.Control
            type="search"
            placeholder="Search products, categories and brands"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" style={{ background: 'orange' }}>
            SEARCH
          </Button>
        </Form>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/help">Help</Nav.Link>
            
            {first_name ? ( // Check if the user is logged in
              <Dropdown className='mt-1'>
                <Dropdown.Toggle variant="transparent" id="account-dropdown" className='text-muted'>
                 <BsPersonFill style={{ fontSize: "24px", marginRight: "3px", marginBottom:"4px" }} /> Hi, {first_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                  <Dropdown.Divider />
                  <Button
                    variant='transparent'
                    onClick={handleLogout}
                    style={{
                      fontSize:"14px",
                      fontWeight:"bold",
                      color:"orange",
                      width:"100%"
                    }}
                  >
                    LOGOUT
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link href="/login">
                <BsPersonFill style={{ fontSize: "24px", marginRight: "6px" }} />Account
              </Nav.Link>
            )}
            
            <Nav.Link href="/cart">
              <div style={{ position: "relative" }}>
                <BsFillCartFill style={{ fontSize: "24px" }} /> Cart
                {cartItemCount > 0 && (
                  <span
                    className="cart-notification"
                    style={{
                      backgroundColor: "orange",
                      borderRadius: "100%",
                      padding: "2px 6px",
                      fontSize: "10px",
                      bottom: "10px",
                      right: "34px",
                      fontWeight: "bold",
                      position: "absolute",
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
