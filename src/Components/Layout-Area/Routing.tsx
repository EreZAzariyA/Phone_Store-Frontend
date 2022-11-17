import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "../Auth-Area/Login/Login";
import Logout from "../Auth-Area/Logout/Logout";
import Register from "../Auth-Area/Register/Register";
import AddPhonePage from "../Phones-Area/AddPhonePage/AddPhonePage";
import AddBrandPage from "../Phones-Area/AddBrandPage/AddBrandPage";
import HomePage from "../Pages/HomePage";
import PhoneDetails from "../Phones-Area/PhoneDetails/PhoneDetails";
import OrderPage from "../Pages/OrderPage/OrderPage";
import { useEffect, useState } from "react";
import UserModel from "../../Models/user-model";
import { authStore } from "../../Redux/Store";
import Role from "../../Models/role";
import Page404 from "./Page404/Page404";

function Routing(): JSX.Element {

      const [user, setUser] = useState<UserModel>();
      const navigate = useNavigate();

      useEffect(() => {
            setUser(authStore.getState().user);

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });
            return () => unsubscribe();
      });

      return (
            <>
                  <Routes>
                        {/* Main Routes */}
                        {/* <Route path="/" element={<HomePage />} /> */}
                        <Route path="/phone-details/:phoneId" element={<PhoneDetails />} />

                        {user &&
                              <Route path="/order" element={<OrderPage />} />
                        }
                        {user?.roleId === Role?.Admin &&
                              <>
                                    <Route path="/add-new-phone" element={<AddPhonePage />} />
                                    <Route path="/add-new-brand" element={<AddBrandPage />} />
                              </>
                        }

                        {/* Auth Routes */}
                        <Route path="auth/login" element={<Login />} />
                        <Route path="auth/register" element={<Register />} />
                        <Route path="auth/logout" element={<Logout />} />

                        <Route path="*" element={<Page404 />} />
                  </Routes>
            </>
      )
}
export default Routing;