import { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap"
import ItemInCartModel from "../../Models/item-in-cart model"
import { PhoneModel } from "../../Models/phone-model";
import { removeItemFromGuestCartAction } from "../../Redux/GuestState";
import { authStore, guestsStore } from "../../Redux/Store";
import notifyService from "../../Services/NotifyService";
import phonesServices from "../../Services/PhonesServices";
import shoppingCartServices from "../../Services/ShoppingCartsServices";

interface ItemInCartCardProps {
      itemInCart: ItemInCartModel;
}

const ItemInCartCard = (props: ItemInCartCardProps) => {
      const [phone, setPhone] = useState<PhoneModel>();

      const getPhoneByItemId = useCallback(async () => {
            const phone = await phonesServices.getOnePhoneById(props.itemInCart.phoneId);
            setPhone(phone);
      }, [props.itemInCart]);

      useEffect(() => {
            getPhoneByItemId();
      }, [getPhoneByItemId]);

      const deleteFromCart = async () => {
            const user = authStore.getState().user;
            try {
                  if (user) {
                        await shoppingCartServices.removePhoneFromCart(props.itemInCart.phoneId, props.itemInCart.cartId);
                  } else {
                        guestsStore.dispatch(removeItemFromGuestCartAction(props.itemInCart.phoneId));
                  }
                  notifyService.success('Removed...')
            } catch (err: any) {
                  notifyService.error(err);
            }
      };

      return (
            <Card className="m-1 w-auto" hidden={!phone}>
                  <Button size='sm' variant="danger" style={{ position: 'absolute', left: '5px', top: '5px', borderRadius: '50%' }} onClick={deleteFromCart}>
                        -
                  </Button>

                  <Card.Img variant="top" src={phone?.picture} height='150' alt='' />
                  <Card.Title>
                        {phone?.name}
                  </Card.Title>

            </Card>
      )
}

export default ItemInCartCard;