import { Button, Container, Nav, Offcanvas } from "react-bootstrap"
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
                                    Add New Phone
                              </Nav.Link>

                              <Nav.Link className="mt-2">
                                    Add New Brand
                              </Nav.Link>
                        </Nav>
                  </Offcanvas.Body>
            </Container>
      )
}

export default AdminPanel;