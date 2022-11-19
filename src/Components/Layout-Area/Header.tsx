import { useState } from "react";
import { Button, Col, Container, Dropdown, Nav, Navbar, Offcanvas, Row } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import UserModel from "../../Models/user-model";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Role from "../../Models/role";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";
import AdminPanel from "./AdminPanel";
import { AiOutlineSetting } from "react-icons/ai";

export const logout = async () => {
      await authServices.logout();
      notifyService.error("Your out...");
};

interface HeaderProps {
      user: UserModel;
}
const Header = (props: HeaderProps) => {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      return (
            <Container className="pt-2 pb-1" style={{ backgroundColor: 'black', color: 'white' }}>

                  {/* LG size */}
                  <Row className="d-none d-lg-flex mt-1">
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
                                          {NavItems(false, props.user)}
                                    </Container>
                              </Navbar>
                        </Col>

                        <Col lg='1'>
                              {(!props.user || props.user?.roleId === Role.User)
                                    &&
                                    <Nav.Link as={NavLink} to="/cart">
                                          <FiShoppingCart color="white" className="mt-2" size='25px' />
                                    </Nav.Link>
                              }
                              {props.user?.roleId === Role.Admin &&
                                    <Button variant="link" onClick={handleShow} style={{ color: 'white' }}>
                                          <AiOutlineSetting size='25px' />
                                    </Button>
                              }
                        </Col>
                  </Row>

                  {/* MD size */}
                  <Row className="d-lg-none d-block">
                        <Navbar expand='lg' variant="dark" collapseOnSelect>
                              <Container fluid>
                                    <Navbar.Toggle />

                                    <Nav.Link as={NavLink} to='/' active>
                                          <h1>
                                                Phone-Store
                                          </h1>
                                    </Nav.Link>

                                    {(!props.user || props.user?.roleId === Role.User)
                                          &&
                                          <Nav.Link as={NavLink} to="/cart" className="m-1">
                                                <FiShoppingCart color="white" size='25px' />
                                          </Nav.Link>
                                    }
                                    {props.user?.roleId === Role.Admin &&
                                          <Button variant="link" onClick={handleShow} style={{ color: 'white' }}>
                                                <AiOutlineSetting size='25px' />
                                          </Button>
                                    }

                                    <Navbar.Collapse className="mt-3">
                                          {NavItems(true, props.user)}
                                    </Navbar.Collapse>
                              </Container>
                        </Navbar>
                  </Row>

                  <Offcanvas show={show} placement='end' onHide={handleClose}>
                        <AdminPanel />
                  </Offcanvas>
            </Container>
      )
}
export default Header;


const NavItems = (isMd: boolean, user: UserModel) => {
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

                  {/* LG nav items */}
                  {!isMd &&
                        <Nav.Item style={{ position: 'absolute', right: '0' }}>
                              {!user &&
                                    <Nav.Link as={NavLink} to="/auth/login">
                                          <BiUser size='25px' />
                                    </Nav.Link>
                              }

                              {user?.roleId === Role.User &&
                                    <Dropdown align={{ lg: 'end' }}>
                                          <DropdownToggle as={Nav.Link} >
                                                <BiUser size='25px' />
                                          </DropdownToggle>

                                          <DropdownMenu>

                                                <Dropdown.Header>
                                                      Hello {user.firstName + " " + user.lastName}
                                                </Dropdown.Header>

                                                <DropdownItem>
                                                      new
                                                </DropdownItem>

                                                <Dropdown.Divider />

                                                <Button size='sm' className="w-100" variant="danger" onClick={logout}>
                                                      Logout
                                                </Button>
                                          </DropdownMenu>
                                    </Dropdown>
                              }

                        </Nav.Item>
                  }

                  {/* MD nav items */}
                  {isMd &&
                        <>
                              <hr />
                              {!user &&
                                    <Nav.Item>

                                          <Row>
                                                <Col>
                                                      <Nav.Link as={NavLink} eventKey={5} to="/auth/login">
                                                            Login
                                                      </Nav.Link>
                                                </Col>
                                                <Col>
                                                      <Nav.Link as={NavLink} eventKey={6} to="/auth/register">
                                                            Register
                                                      </Nav.Link>
                                                </Col>
                                          </Row>
                                    </Nav.Item>
                              }

                              {user?.roleId === Role.Admin &&
                                    <Button size='sm' variant="danger" onClick={logout}>
                                          Logout
                                    </Button>
                              }
                              {user?.roleId === Role.User &&
                                    <Nav.Item>
                                          <Row className="w-50 m-auto">
                                                <Col sm='6' xs='6'>
                                                      <Navbar.Text>
                                                            Hello {user?.firstName + " " + user?.lastName}
                                                      </Navbar.Text>
                                                </Col>
                                                <Col sm='6' xs='6'>

                                                      <Button size='sm' variant="danger" onClick={logout}>
                                                            Logout
                                                      </Button>
                                                </Col>
                                          </Row>
                                    </Nav.Item>
                              }
                        </>
                  }
            </>
      )
}
