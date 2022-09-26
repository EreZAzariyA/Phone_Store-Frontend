import { useState, useEffect } from "react";
import { Badge, Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import AuthMenu from "../../Auth-Area/AuthMenu/AuthMenu";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";
import Sidenav from "../Sidenav/Sidenav";
import UserModel from "../../../Models/user-model";
import { authStore, shoppingCartStore } from "../../../Redux/Store";
import Role from "../../../Models/role";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs"
import ItemInCartModel from "../../../Models/item-in-cart model";

function MyNavbar(): JSX.Element {

      const [user, setUser] = useState<UserModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      useEffect(() => {
            setUser(authStore.getState().user);
            setItemsInCart(shoppingCartStore.getState().itemsInCart)

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });
            const unsubscribeMeTo = shoppingCartStore.subscribe(() => {
                  setItemsInCart(shoppingCartStore.getState().itemsInCart)

            })

            return () => {
                  unsubscribe();
                  unsubscribeMeTo();
            }
      });


      return (
            <>
                  <Navbar bg="primary" expand="lg">
                        <Container fluid>
                              <Navbar.Brand>
                                    <Button variant="primary" onClick={handleShow}>
                                          <FiShoppingCart size={"25px"} color="secondary" />
                                          {itemsInCart?.length !== 0 &&
                                                <Badge bg="danger" style={{ margin: "5px" }}>{itemsInCart?.length}</Badge>
                                          }
                                    </Button>
                              </Navbar.Brand>
                              <div className="auth">
                                    <AuthMenu />
                              </div>
                              <Navbar.Toggle aria-controls="navbar-nav">
                                    <BsThreeDotsVertical className="myBtn" color="white" size={"25px"} />
                              </Navbar.Toggle>
                              <Navbar.Collapse id="navbar-nav">
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

                  <Offcanvas show={show} onHide={handleClose} >
                        <Sidenav />
                  </Offcanvas>
            </>
      )
}

export default MyNavbar;