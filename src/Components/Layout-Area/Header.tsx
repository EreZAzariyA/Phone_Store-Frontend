import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import UserModel from "../../Models/user-model";
import { authStore } from "../../Redux/Store";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Role from "../../Models/role";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";

export const logout = async () => {
      await authServices.logout();
      notifyService.error("Your out...");
};
const Header = () => {
      const [user, setUser] = useState<UserModel>();

      useEffect(() => {
            const user = authStore.getState().user;
            setUser(user);

            const authSubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });

            return () => authSubscribe();
      }, []);



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
                                          {NavItems(false, user)}
                                    </Container>
                              </Navbar>
                        </Col>
                        <Col lg='1'>
                              <Nav.Link as={NavLink} to='/cart' className="mt-1">
                                    <FiShoppingCart color="white" size='25px' />
                              </Nav.Link>
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

                                    <Nav.Link as={NavLink} to="/cart">
                                          <FiShoppingCart color="white" size='25px' />
                                    </Nav.Link>

                                    <Navbar.Collapse className="mt-3">
                                          {NavItems(true, user)}
                                    </Navbar.Collapse>
                              </Container>
                        </Navbar>
                  </Row>
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

                  {!isMd &&
                        <Nav.Item style={{ position: 'absolute', right: '0' }}>
                              {!user &&
                                    <Nav.Link as={NavLink} to="/auth/login">
                                          <BiUser size='25px' />
                                    </Nav.Link>
                              }
                              {user &&
                                    <Dropdown>
                                          <DropdownToggle as={Nav.Link} >
                                                <BiUser size='25px' />
                                          </DropdownToggle>

                                          <DropdownMenu variant="dark" align={{ lg: 'end' }}>
                                                {user?.roleId === Role.Admin &&
                                                      <>
                                                            <Dropdown.Header>
                                                                  Hello Admin
                                                            </Dropdown.Header>
                                                            <Dropdown.Divider />

                                                            <DropdownItem>
                                                                  new
                                                            </DropdownItem>


                                                      </>
                                                }
                                                {user?.roleId === Role.User &&
                                                      <>
                                                            <Dropdown.Header>
                                                                  Hello {user.firstName + " " + user.lastName}
                                                            </Dropdown.Header>

                                                            <DropdownItem>
                                                                  new
                                                            </DropdownItem>


                                                      </>
                                                }

                                                <Dropdown.Divider />

                                                <Button size='sm' className="w-100" variant="danger" onClick={logout}>
                                                      Logout
                                                </Button>
                                          </DropdownMenu>
                                    </Dropdown>
                              }
                        </Nav.Item>
                  }

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
                                    <Dropdown>
                                          <DropdownToggle as={Nav.Link} >
                                                <BiUser size='25px' />
                                          </DropdownToggle>

                                          <DropdownMenu variant="dark">
                                                <Dropdown.Header>
                                                      Hello Admin
                                                </Dropdown.Header>
                                                <Dropdown.Divider />

                                                <DropdownItem>
                                                      new
                                                </DropdownItem>


                                                <Dropdown.Divider />

                                                <DropdownItem className="w-50 m-auto">
                                                      <Button size='sm' variant="danger" onClick={logout}>
                                                            Logout
                                                      </Button>
                                                </DropdownItem>
                                          </DropdownMenu>
                                    </Dropdown>
                              }
                              {user?.roleId === Role.User &&
                                    <Nav.Item>
                                          <Button size='sm' variant="danger" onClick={logout}>
                                                Logout
                                          </Button>
                                    </Nav.Item>
                              }
                        </>
                  }
            </>
      )
}
