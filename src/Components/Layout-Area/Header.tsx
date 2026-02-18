import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

import Role from "../../Models/role";
import { authServices } from "../../Services/AuthServices";
import { Badge, Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import phonesServices from "../../Services/PhonesServices";
import brandsServices from "../../Services/BrandsServices";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import notifyService from "../../Services/NotifyService";
import { isAdmin } from "../../Utils/helpers";
import { AiOutlineSetting } from "react-icons/ai";
import UserModel from "../../Models/user-model";

export const logout = async () => {
  await authServices.logout();
  notifyService.success("Logged out successfully");
};

const navItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Phones',
    path: '/phones'
  },
  {
    name: 'Brands',
    path: '/brands'
  },
  {
    name: 'About',
    path: '/about'
  }
];

const adminNavItems = [
  {
    name: 'Update Top Products',
    path: '/admin/top-phones'
  },
  {
    name: 'Update Top brands',
    path: '/admin/top-brands'
  },
  {
    name: 'All Orders',
    path: '/admin/orders'
  },
];

const adminDropdown = (user: UserModel) => (
  <Dropdown align="end">
    <DropdownToggle as={Nav.Link} className="ps-header-icon">
      <AiOutlineSetting size={22} />
    </DropdownToggle>
    <DropdownMenu>
      <Dropdown.Header>
        Admin: {user.first_name + " " + user.last_name}
      </Dropdown.Header>
      <Dropdown.Divider />
      {adminNavItems.map((item) => (
        <DropdownItem key={item.name} as={NavLink} className="mt-2" to={item.path}>
          {item.name}
        </DropdownItem>
      ))}
      <Dropdown.Divider />
      <DropdownItem>
        <Button size="sm" className="w-100" variant="outline-danger" onClick={logout}>
          Logout
        </Button>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
)

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const itemsInCart = useSelector((state: RootState) => (state.shoppingCart?.products || []));
  const admin = isAdmin(user);

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all([
          phonesServices.getAllPhones(),
          brandsServices.getAllBrands(),
        ]);
        if (user && !admin) {
          await shoppingCartServices.getShoppingCartByUserId(user._id);
        }
      } catch (err: any) {
        notifyService.error(err.message || "Some error while trying to collect data.");
      }
    };

    getData();
  }, [admin, user]);

  return (
    <header className="ps-header">
      <Navbar expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Phone-Store
          </Navbar.Brand>

          {/* Right side icons for mobile */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            {(!user || user?.roleId === Role.User) && (
              <Nav.Link as={NavLink} to="/cart" className="ps-header-icon position-relative p-0">
                <FiShoppingCart size={20} />
                  <Badge bg="warning" text="dark"
                    style={{ position: 'absolute', top: 0, right: -10, fontSize: '0.65rem' }}>
                    {itemsInCart.length}
                  </Badge>
              </Nav.Link>
            )}
            {user?.roleId === Role.Admin && adminDropdown(user)}

            <Navbar.Toggle aria-controls="main-navbar" />
          </div>

          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto">
              {navItems.map((item) => (
                <Nav.Link key={item.name} eventKey={item.name} as={NavLink} to={item.path}>
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>

            {/* Right side for desktop */}
            <Nav className="d-none d-lg-flex align-items-center gap-2">
              {(!user || user?.roleId === Role.User) && (
                <Nav.Link as={NavLink} to="/cart" className="ps-header-icon position-relative">
                  <FiShoppingCart size={20} />
                  <Badge pill bg="warning" text="dark"
                    style={{ position: 'absolute', top: 0, right: -6, fontSize: '0.65rem' }}>
                    {itemsInCart.length}
                  </Badge>
                </Nav.Link>
              )}

              {!user && (
                <Nav.Link as={NavLink} to="/auth/login" className="ps-header-icon">
                  <BiUser size={22} />
                </Nav.Link>
              )}

              {user?.roleId === Role.User && (
                <Dropdown align="end">
                  <DropdownToggle as={Nav.Link} className="ps-header-icon">
                    <BiUser size={22} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <Dropdown.Header>
                      Hello {user.first_name + " " + user.last_name}
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <DropdownItem as={NavLink} to="/my-orders">
                      My Orders
                    </DropdownItem>
                    <Dropdown.Divider />
                    <DropdownItem>
                      <Button size="sm" className="w-100" variant="outline-danger" onClick={logout}>
                        Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}

              {user?.roleId === Role.Admin && adminDropdown(user)}

            </Nav>

            {/* Mobile-only auth/user section */}
            <div className="d-lg-none mt-2 mb-2">
              <hr />
              {!user && (
                <div className="d-flex gap-2">
                  <Nav.Link as={NavLink} eventKey={5} to="/auth/login" className="flex-grow-1 text-center">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} eventKey={6} to="/auth/register" className="flex-grow-1 text-center">
                    Register
                  </Nav.Link>
                </div>
              )}

              {user?.roleId === Role.User && (
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Navbar.Text style={{ color: 'var(--ps-text-secondary)' }}>
                      Hello {user?.first_name + " " + user?.last_name}
                    </Navbar.Text>
                    <Button size="sm" variant="outline-danger" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                  <Nav.Link as={NavLink} eventKey={7} to="/my-orders">
                    My Orders
                  </Nav.Link>
                </div>
              )}

              {user?.roleId === Role.Admin && (
                <Button size="sm" variant="outline-danger" className="w-100" onClick={logout}>
                  Logout
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
