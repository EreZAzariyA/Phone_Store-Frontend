import { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import AuthMenu from "../../Auth-Area/AuthMenu/AuthMenu";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";
import Sidenav from "../Sidenav/Sidenav";

function MyNavbar(): JSX.Element {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      return (
            <>
                  <Navbar bg="primary" expand="lg">
                        <Container fluid>
                              <Navbar.Brand>
                                    <Button variant="primary" onClick={handleShow}>
                                          <FiShoppingCart size={"4vh"} color="secondary" />
                                    </Button>
                              </Navbar.Brand>
                              <div className="auth">
                                    <AuthMenu />
                              </div>
                              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                              <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                          <Nav.Link href="#home">Home</Nav.Link>
                                    </Nav>
                              </Navbar.Collapse>
                        </Container>
                  </Navbar>

                  <Offcanvas show={show} onHide={handleClose}>
                        <Sidenav />
                  </Offcanvas>
            </>
      )
}

export default MyNavbar;