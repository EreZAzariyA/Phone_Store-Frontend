import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";

interface HeaderProps {
      sideNavTrigger: Function;
}

const NavItems = (isMd: boolean) => {
      return (
            <>
                  <Nav.Item>
                        <Nav.Link eventKey={1} as={NavLink} to='/'>
                              Home-Page
                        </Nav.Link>
                  </Nav.Item>
                  {isMd && <hr />}
                  <Nav.Item>
                        <Nav.Link eventKey={2} as={NavLink} to='/brands'>
                              Brands
                        </Nav.Link>
                  </Nav.Item>
                  {isMd && <hr />}
                  <Nav.Item>
                        <Nav.Link eventKey={3} as={NavLink} to='/accessories'>
                              Accessories
                        </Nav.Link>
                  </Nav.Item>
                  {isMd && <hr />}
                  <Nav.Item>
                        <Nav.Link eventKey={4} as={NavLink} to='/about'>
                              About
                        </Nav.Link>
                  </Nav.Item>
            </>
      )
}

const Header = (props: HeaderProps) => {

      const handleShow = () => {
            props.sideNavTrigger()
      };

      return (
            <Container className="pt-2 pb-1" style={{ backgroundColor: 'black', color: 'white' }}>

                  {/* LG size */}
                  <Row className="d-none d-lg-flex">
                        <Col lg='3'>
                              <Nav.Link as={NavLink} to="/">
                                    <h1>
                                          Phone-Store
                                    </h1>
                              </Nav.Link>
                        </Col>
                        <Col lg='8'>
                              <Navbar>
                                    <Container className="w-75 d-flex flex-row justify-content-around">
                                          {NavItems(false)}
                                    </Container>
                              </Navbar>
                        </Col>
                        <Col lg='1'>
                              <Button variant="link" onClick={handleShow}>
                                    <FiShoppingCart color="white" size='25px' />
                              </Button>
                        </Col>
                  </Row>

                  {/* MD size */}
                  <Row className="d-lg-none d-block">
                        <Navbar expand='lg' variant="dark" collapseOnSelect>
                              <Container fluid>
                                    <Navbar.Toggle />

                                    <Nav.Link as={NavLink} to='/'>
                                          <h1>
                                                Phone-Store
                                          </h1>
                                    </Nav.Link>

                                    <Button variant="link" onClick={handleShow}>
                                          <FiShoppingCart color="white" size='25px' />
                                    </Button>

                                    <Navbar.Collapse>
                                          {NavItems(true)}
                                    </Navbar.Collapse>
                              </Container>
                        </Navbar>
                  </Row>
            </Container>
      )
}
export default Header;