import { useState } from "react";
import { Container } from "react-bootstrap"
import ItemInCartModel from "../../Models/item-in-cart model";

const CartPage = () => {

      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();

      return (
            <Container>
                  {!itemsInCart &&
                        <h1>Your Cart Is Empty</h1>
                  }

            </Container>
      )
}

export default CartPage;