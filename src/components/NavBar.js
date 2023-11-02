import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from "react-icons/bs";
import { useCart } from '../CartContext'; // Import the useCart hook

function NavBar() {
  const { items } = useCart(); // Access the cart items from the context

  return (
    <Navbar expand="lg" className="bg-white" style={{ marginTop: '50px' }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>SOKO</Navbar.Brand>
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

            <Nav.Link href="/cart" style={{ marginLeft: '2em' }}>
              <BsFillCartFill style={{ fontSize: "30px" }} /> Cart{' '}
              {items.length > 0 && (
                <span className="badge bg-primary">
                  {items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
