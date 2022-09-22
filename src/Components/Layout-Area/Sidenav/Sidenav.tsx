import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/Store";
import AuthMenu from "../../Auth-Area/AuthMenu/AuthMenu";
import "./Sidenav.css";

function Sidenav(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user)

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        });

        return () => unsubscribe()
    }, []);




    return (
        <>
            {user &&
                <>
                    <Offcanvas.Header>
                        <h4>Hello {user?.firstName + " " + user?.lastName}</h4>
                    </Offcanvas.Header>
                    <hr />
                    <Offcanvas.Body>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae, nostrum voluptas provident maxime nisi officia sint dolor earum harum voluptatum vitae quod impedit vel, ut sit quo ab ipsam.
                    </Offcanvas.Body>
                </>
            }
            {!user && <AuthMenu />}
        </>
    );
}

export default Sidenav;
