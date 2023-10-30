import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from "react-icons/bs";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{marginTop: '50px'}}>
      <Container>
        <Navbar.Brand href="#" style={{fontWeight: 'bold'}}>SOKO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Form className="d-flex pl-4" style={{width: '50em', marginLeft:'5em'}}>
            <Form.Control
              type="search"
              placeholder="Search products, categories and brands"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" style={{background:'yellow'}}>Search</Button>
          </Form>

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="#" style={{marginLeft: '2em'}}>Help</Nav.Link>

            <Nav.Link href="#" style={{marginLeft: '2em'}}>{<BsFillCartFill/>}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;