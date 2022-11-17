import { useEffect, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap"
import UserModel from "../../Models/user-model";
import { authStore } from "../../Redux/Store";

const Sidenav = () => {
      const [user, setUser] = useState<UserModel>();

      useEffect(() => {
            const user = authStore.getState().user;
            setUser(user);

            const unsubscribe = authStore.subscribe(() => {
                  const user = authStore.getState().user;
                  setUser(user);
                  console.log(user?.firstName);
            });

            return () => unsubscribe();
      }, [user]);

      return (
            <Container>
                  <Offcanvas.Header closeButton>

                  </Offcanvas.Header>
            </Container>
      )
}

export default Sidenav;