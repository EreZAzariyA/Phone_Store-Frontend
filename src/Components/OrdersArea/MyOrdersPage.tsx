import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import ordersServices from "../../Services/OrdersServices";
import OrderModel from "../../Models/order-model";
import { Spinner } from "react-bootstrap";
import { FiPackage, FiCalendar, FiMapPin, FiDollarSign, FiChevronRight } from "react-icons/fi";
import { asPriceNum } from "../../Utils/helpers";

const statusColors: Record<string, { color: string; bg: string; border: string }> = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  confirmed: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  shipped: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)" },
  delivered: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)" },
  cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
};

const MyOrdersPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const orders = useSelector((state: RootState) => state.orders.userOrders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.email) {
          await ordersServices.getUserOrders(user.email);
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const getPaymentLabel = (order: OrderModel) => {
    if (order.paymentMethod?.creditCard) return 'Credit Card';
    if (order.paymentMethod?.paypal) return 'PayPal';
    return 'N/A';
  };

  const getStatusStyle = (status: string) => {
    const s = statusColors[status] || statusColors.pending;
    return {
      color: s.color,
      backgroundColor: s.bg,
      border: `1px solid ${s.border}`,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
    };
  };

  return (
    <div className="ps-orders-page">
      <div className="ps-orders-header">
        <h1>My Orders</h1>
        <span className="ps-orders-count">
          {orders?.length || 0} {orders?.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spinner animation="border" style={{ color: 'var(--ps-gold)' }} />
        </div>
      )}

      {!loading && (!orders || orders.length === 0) && (
        <div className="ps-orders-empty">
          <FiPackage size={48} color="var(--ps-text-muted)" style={{ marginBottom: '16px' }} />
          <h4>No orders yet</h4>
          <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem' }}>
            Your order history will appear here once you make a purchase.
          </p>
        </div>
      )}

      {!loading && orders?.length > 0 && (
        <div className="ps-orders-list">
          {orders.map((order, index) => (
            <div className="ps-order-row" key={order.orderId || index}>
              <div className="ps-order-row-header">
                <div className="ps-order-row-id">
                  <FiPackage size={16} />
                  <span>Order #{order.orderId?.slice(-6).toUpperCase() || (index + 1)}</span>
                </div>
                <span style={getStatusStyle(order.status || 'pending')}>
                  {order.status || 'pending'}
                </span>
              </div>

              <div className="ps-order-row-body">
                <div className="ps-order-row-detail">
                  <FiCalendar size={14} />
                  <div>
                    <span className="ps-detail-label">Ordered</span>
                    <span className="ps-detail-value">{formatDate(order.orderDate)}</span>
                  </div>
                </div>

                <div className="ps-order-row-detail">
                  <FiCalendar size={14} />
                  <div>
                    <span className="ps-detail-label">Delivery</span>
                    <span className="ps-detail-value">{formatDate(order.receivingDeliveryDate)}</span>
                  </div>
                </div>

                <div className="ps-order-row-detail">
                  <FiMapPin size={14} />
                  <div>
                    <span className="ps-detail-label">Shipping</span>
                    <span className="ps-detail-value">{order.address}, {order.city}</span>
                  </div>
                </div>

                <div className="ps-order-row-detail">
                  <FiDollarSign size={14} />
                  <div>
                    <span className="ps-detail-label">Total</span>
                    <span className="ps-detail-value" style={{ color: 'var(--ps-gold)', fontWeight: 600 }}>
                      ${asPriceNum(order.grandTotal || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products preview + link */}
              <div className="ps-order-row-footer">
                <div className="ps-order-products-preview">
                  {order.products?.slice(0, 4).map((p, i) => (
                    <img key={i} src={p.picture} alt={p.name} title={p.name} />
                  ))}
                  {order.products?.length > 4 && (
                    <span className="ps-products-more">+{order.products.length - 4}</span>
                  )}
                  {(!order.products || order.products.length === 0) && (
                    <span style={{ color: 'var(--ps-text-muted)', fontSize: '0.8rem' }}>
                      {getPaymentLabel(order)}
                    </span>
                  )}
                </div>

                <NavLink
                  to={`/order-detail/${order.orderId}`}
                  className="ps-view-order-link"
                >
                  View Details <FiChevronRight size={14} />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
