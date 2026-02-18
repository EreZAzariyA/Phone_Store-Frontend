import { NavLink } from "react-router-dom";
import LastOrder from "../OrdersArea/LastOrderToast";
import ItemInCartCard from "./ItemInCartCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Spin } from "antd";
import { Button } from "react-bootstrap";
import { FiShoppingBag, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { asPriceNum } from "../../Utils/helpers";

const CartPage = () => {
  const itemsInCart = useSelector((state: RootState) => state.shoppingCart.products);
  const phones = useSelector((state: RootState) => state.store.phones);
  const orders: any[] = [];

  const calculateTotal = () => {
    let total = 0;
    itemsInCart?.forEach((item) => {
      const phone = phones?.find((p) => p._id === item.phone_id);
      if (phone) total += phone.price * item.amount;
    });
    return total;
  };

  const totalPrice = calculateTotal();

  return (
    <div className="ps-cart-page">
      <div className="ps-cart-header">
        <div>
          <h1>Your Cart</h1>
          <span className="ps-cart-count">
            {itemsInCart?.length || 0} {itemsInCart?.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {itemsInCart === undefined && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
        </div>
      )}

      {orders.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h5 style={{ color: 'var(--ps-text-secondary)', fontSize: '0.95rem', marginBottom: '12px' }}>
            You have {orders.length} order{orders.length > 1 ? 's' : ''} on the way
          </h5>
          {orders.map(order =>
            <LastOrder key={order.orderId} order={order} />
          )}
        </div>
      )}

      {itemsInCart?.length === 0 && (
        <div className="ps-cart-empty">
          <FiShoppingBag size={48} color="var(--ps-text-muted)" style={{ marginBottom: '16px' }} />
          <h4>Your cart is empty</h4>
          <NavLink to="/phones">
            <Button className="ps-btn-outline-gold">
              Browse Products
            </Button>
          </NavLink>
        </div>
      )}

      {itemsInCart?.length > 0 && (
        <>
          <div className="ps-cart-grid">
            {itemsInCart.map((itemInCart) => (
              <ItemInCartCard key={itemInCart.phone_id} itemInCart={itemInCart} />
            ))}
          </div>

          <div className="ps-cart-footer">
            <div>
              <div className="ps-cart-total-label">Total</div>
              <div className="ps-cart-total-price">${asPriceNum(totalPrice)}</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <NavLink to="/phones">
                <Button variant="outline-danger" style={{ padding: '12px 32px', fontSize: '0.95rem' }}>
                  Keep Shpping <FiArrowLeft style={{ marginLeft: '6px' }} />
                </Button>
              </NavLink>
              <NavLink to="/order">
                <Button className="ps-btn-gold" style={{ padding: '12px 32px', fontSize: '0.95rem' }}>
                  Continue To Order <FiArrowRight style={{ marginLeft: '6px' }} />
                </Button>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
