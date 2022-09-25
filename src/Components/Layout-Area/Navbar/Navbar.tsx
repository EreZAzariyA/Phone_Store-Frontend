import { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import AuthMenu from "../../Auth-Area/AuthMenu/AuthMenu";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";
import Sidenav from "../Sidenav/Sidenav";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/Store";
import Role from "../../../Models/role";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs"

function MyNavbar(): JSX.Element {

      const [user, setUser] = useState<UserModel>();
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      useEffect(() => {
            setUser(authStore.getState().user);

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });

            return () => unsubscribe();
      }, []);


      return (
            <>
                  <Navbar bg="primary" expand="lg">
                        <Container fluid>
                              <Navbar.Brand>
                                    <Button variant="primary" onClick={handleShow}>
                                          <FiShoppingCart size={"3vh"} color="secondary" />
                                    </Button>
                              </Navbar.Brand>
                              <div className="auth">
                                    <AuthMenu />
                              </div>
                              <Navbar.Toggle aria-controls="basic-navbar-nav">
                                    <BsThreeDotsVertical className="myBtn" color="white" size={"3vh"}/>
                              </Navbar.Toggle>
                              <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                          <NavLink to="/" className="nav-link">
                                                Home
                                          </NavLink>
                                          {user?.roleId === Role.Admin &&
                                                <>
                                                      <NavLink to="/add-new-phone" className="nav-link">
                                                            Add Phone
                                                      </NavLink>

                                                      <NavLink to="/add-new-brand" className="nav-link">
                                                            Add Brand
                                                      </NavLink>
                                                </>
                                          }
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