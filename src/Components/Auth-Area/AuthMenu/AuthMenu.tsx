import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/Store";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState()?.user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="AuthMenu">
            {/* If there is no user */}
            {!user &&
                <>
                    <span className="input-text" id="basic-addon1">
                        Hello Guest
                        <NavLink to="/auth/login">
                            <BiLogIn size={"25px"} color="white" />
                        </NavLink>
                    </span>
                </>
            }
            {/* If there is a user */}
            {user &&
                <>
                    <span>Hello {user.firstName + " " + user.lastName}</span>
                    <NavLink to="/auth/logout">
                        <BiLogOut size={"25px"} color="white" />
                    </NavLink>

                </>
            }
        </div>
    );
}

export default AuthMenu;
