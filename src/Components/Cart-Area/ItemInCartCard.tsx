import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ItemInCartModel from "../../Models/item-in-cart model"
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import { Popconfirm, message } from "antd";
import { FiX } from "react-icons/fi";
import { asPriceNum } from "../../Utils/helpers";

interface ItemInCartCardProps {
  itemInCart: ItemInCartModel;
}

const ItemInCartCard = (props: ItemInCartCardProps) => {
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const phones = useSelector((state: RootState) => state.store.phones);
  const phone = phones?.find((p) => p._id === props.itemInCart.phone_id);
  const [stock, setStock] = useState(props.itemInCart.amount || 0);

  const handleBtn = async (name: string) => {
    if (!shoppingCart._id) {
      message.error('Some error with your cart, please try to reload the page');
      return;
    }

    let msg = 'stock updated...';
    let phoneToUpdate = new ItemInCartModel(props.itemInCart);
    phoneToUpdate.cart_id = shoppingCart._id;
    let amount = 0;

    switch(name) {
      case 'minus':
        if (stock === 1) return;
        amount = stock - 1;
        phoneToUpdate.amount = amount;
      break;
      case 'plus':
        amount = stock + 1;
        phoneToUpdate.amount = amount;
      break;
    }

    try {
      phoneToUpdate.total_price = amount * (phone.price || 0);
      await shoppingCartServices.updateStockInCart(phoneToUpdate);
      setStock(amount);
      message.success(msg);
    } catch (err: any) {
      message.error(err.message);
      console.log(err);
    }
  };

  const handleRemove = async () => {
    try {
      await shoppingCartServices.removePhoneFromCart(props.itemInCart.phone_id, shoppingCart._id);
      message.success('Removed from cart');
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div className="ps-cart-item">
      <div className="ps-cart-item-img">
        <img src={phone?.picture} alt={phone?.name || ''} />
      </div>

      <div className="ps-cart-item-info">
        <h5 className="ps-cart-item-name">{phone?.name}</h5>
        <span className="ps-cart-item-price">
          ${asPriceNum(phone?.price)} each
        </span>
        <span className="ps-cart-item-total">
          ${asPriceNum(stock * (phone?.price || 0))}
        </span>
      </div>

      <div className="ps-cart-item-actions">
        <Popconfirm
          title="Remove this item?"
          onConfirm={handleRemove}
          okText="Yes"
          cancelText="No"
        >
          <button className="ps-cart-item-remove" title="Remove item">
            <FiX />
          </button>
        </Popconfirm>

        <div className="ps-cart-item-qty">
          <button onClick={() => handleBtn('minus')} disabled={stock <= 1}>
            &minus;
          </button>
          <span>{stock}</span>
          <button onClick={() => handleBtn('plus')} disabled={stock >= 9}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemInCartCard;
