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

function NavBar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Get the current location
  const location = useLocation();

  // Define an array of route paths where you want to display the NavBar
  const showNavBarOnRoutes = ['/cart', '/payment', '/'];

  // Check if the current location is in the array
  const shouldShowNavBar = showNavBarOnRoutes.includes(location.pathname);

  if (!shouldShowNavBar) {
    return null; // Don't render the NavBar on certain routes
  }

  return (
    <Navbar expand="lg" className="bg-white" style={{ marginTop: '50px' }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>SOKO <img src={soko} style={{height:"10px"}}/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

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
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="#" style={{ marginLeft: '2em' }}>Help</Nav.Link>

            <Nav.Link href="/login" style={{ marginLeft: '2em'}}> 
              {<BsPersonFill style={{fontSize:"24px", marginRight:"6px"}} />}Account
            </Nav.Link>

            <Link to="/cart" style={{ marginLeft: '2em', position: "relative" }}>
              <div style={{ display: "inline-block", margin:"5px" }}>
                <BsFillCartFill style={{ fontSize: "30px", color: "black"}} />
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
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
