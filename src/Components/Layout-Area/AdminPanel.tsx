import { Button, Container, Nav, Offcanvas } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { logout } from "./Header";

const AdminPanel = () => {
      return (
            <Container >
                  <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                              Admin Panel
                        </Offcanvas.Title>
                        <Button size='sm' onClick={logout} variant='danger'>
                              Logout
                        </Button>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                        <Nav className="flex-column">

                              <Nav.Link className="mt-2">
                                    All Phones
                              </Nav.Link>
                              
                              <Nav.Link className="mt-2">
                                    All Brands
                              </Nav.Link>

                              <Nav.Link className="mt-2" as={NavLink} to="/products/new" eventKey={0.3}>
                                    New Phone
                              </Nav.Link>

                              <Nav.Link className="mt-2">
                                    New Brand
                              </Nav.Link>

                              <Nav.Link className="mt-2">
                                    Update Top Products
                              </Nav.Link>

                              <Nav.Link className="mt-2">
                                    Update Top brands
                              </Nav.Link>
                        </Nav>
                  </Offcanvas.Body>
            </Container>
      )
}

export default AdminPanel;