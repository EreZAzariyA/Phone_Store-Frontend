import { Routes, Route } from "react-router-dom"
import Login from "../Auth-Area/Login/Login";
import Logout from "../Auth-Area/Logout/Logout";
import Register from "../Auth-Area/Register/Register";
import HomePage from "../Pages/HomePage/HomePage";
import PhoneDetails from "../Phones-Area/PhoneDetails/PhoneDetails";

function Routing(): JSX.Element {
      return (
            <>
                  <Routes>
                        {/* Main Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/phone-details/:phoneId" element={<PhoneDetails />} />


                        {/* Auth Routes */}
                        <Route path="auth/login" element={<Login />} />
                        <Route path="auth/register" element={<Register />} />
                        <Route path="auth/logout" element={<Logout />} />
                  </Routes>
            </>
      )
}
export default Routing;