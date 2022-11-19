import { useCallback, useState } from "react";
import { Container } from "react-bootstrap"
import ItemInCartModel from "../../Models/item-in-cart model";
import UserModel from "../../Models/user-model";
import shoppingCartServices from "../../Services/ShoppingCartsServices";

const CartPage = () => {
      const [user, setUser] = useState<UserModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();

      const getItems = useCallback(async() => {
            if (user) {
                  // const itemsInCart = await shoppingCartServices.ge
            }
      },[])

      return (
            <Container>
                  {!itemsInCart &&
                        <h1>Your Cart Is Empty</h1>
                  }

            </Container>
      )
}

export default CartPage;