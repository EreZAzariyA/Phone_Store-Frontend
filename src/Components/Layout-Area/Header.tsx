import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import AdminPanel from "./AdminPanel";
import UserModel from "../../Models/user-model";
import Role from "../../Models/role";
import { authServices } from "../../Services/AuthServices";
import { Badge, Button, Col, Container, Dropdown, Nav, Navbar, Offcanvas, Row } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { AiOutlineSetting } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import phonesServices from "../../Services/PhonesServices";
import brandsServices from "../../Services/BrandsServices";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import { message } from "antd";

export const logout = async () => {
  await authServices.logout();
  message.error("Your out...");
};

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [show, setShow] = useState(false);
  const orders = [];

  useEffect(() => {
    const getData = async () => {
      try {
        await phonesServices.getAllPhones();
        await brandsServices.getAllBrands();
        if (user && user.roleId !== Role.Admin) {
          await shoppingCartServices.getShoppingCartByUserId(user._id);
        }
      } catch (err: any) {
        message.error("Some error while trying to collect data. reason: ", err.message);
      }
    };

    getData();
  }, [user]);

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
              {NavItems(false, user)}
            </Container>
          </Navbar>
        </Col>

        <Col lg='1'>
          {(!user || user?.roleId === Role.User) && (
            <Nav.Link as={NavLink} to="/cart">
              <FiShoppingCart color="white" className="mt-2" size='25px' />
              {orders?.length > 0 &&
                <Badge bg="danger" className="m-1">{orders?.length}</Badge>
              }
            </Nav.Link>
          )}
          {user?.roleId === Role.Admin && (
            <Button variant="link" onClick={handleShow} style={{ color: 'white' }}>
              <AiOutlineSetting size='25px' />
            </Button>
          )}
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

            {(!user || user?.roleId === Role.User) && (
              <Nav.Link as={NavLink} to="/cart" className="m-1">
                <FiShoppingCart color="white" size='25px' />
                {orders?.length > 0 &&
                  <Badge bg="danger" className="m-1">{orders?.length}</Badge>
                }
              </Nav.Link>
            )}
            {user?.roleId === Role.Admin &&
              <Button variant="link" onClick={handleShow} style={{ color: 'white' }}>
                <AiOutlineSetting size='25px' />
              </Button>
            }

            <Navbar.Collapse className="mt-3">
              {NavItems(true, user)}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>

      <Offcanvas show={show} placement='end' onHide={handleClose}>
        <AdminPanel handleClose={handleClose} />
      </Offcanvas>
    </Container>
  );
};

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
        <Nav.Link eventKey={2} as={NavLink} to='/phones'>
          Phones
        </Nav.Link>
      </Nav.Item>
      {isMd && <hr />}

      <Nav.Item>
        <Nav.Link eventKey={3} as={NavLink} to='/brands'>
          Brands
        </Nav.Link>
      </Nav.Item>
      {isMd && <hr />}

      <Nav.Item>
        <Nav.Link eventKey={4} as={NavLink} to='/accessories'>
          Accessories
        </Nav.Link>
      </Nav.Item>
      {isMd && <hr />}

      <Nav.Item>
        <Nav.Link eventKey={5} as={NavLink} to='/about'>
          About
        </Nav.Link>
      </Nav.Item>

      {/* LG nav items */}
      {!isMd && (
        <Nav.Item style={{ position: 'absolute', right: '0' }}>
          {!user && (
            <Nav.Link as={NavLink} to="/auth/login">
              <BiUser size='25px' />
            </Nav.Link>
          )}

          {user?.roleId === Role.User && (
            <Dropdown align={{ lg: 'end' }}>
              <DropdownToggle as={Nav.Link} >
                <BiUser size='25px' />
              </DropdownToggle>

              <DropdownMenu>
                <Dropdown.Header>
                  Hello {user.first_name + " " + user.last_name}
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
          )}
        </Nav.Item>
      )}

      {/* MD nav items */}
      {isMd && (
        <>
          <hr />
          {!user && (
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
          )}

          {user?.roleId === Role.Admin && (
            <Button size='sm' variant="danger" onClick={logout}>
              Logout
            </Button>
          )}

          {user?.roleId === Role.User && (
            <Nav.Item>
              <Row className="w-50 m-auto">
                <Col sm='6' xs='6'>
                  <Navbar.Text>
                    Hello {user?.first_name + " " + user?.last_name}
                  </Navbar.Text>
                </Col>
                <Col sm='6' xs='6'>
                  <Button size='sm' variant="danger" onClick={logout}>
                    Logout
                  </Button>
                </Col>
              </Row>
            </Nav.Item>
          )}
        </>
      )}
    </>
  );
};
