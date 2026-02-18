import { useEffect, useState } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import ordersServices from "../../Services/OrdersServices";
import notifyService from "../../Services/NotifyService";
import OrderModel from "../../Models/order-model";
import { Spinner } from "react-bootstrap";
import { FiArrowLeft, FiPackage, FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import { asPriceNum } from "../../Utils/helpers";

const statusColors: Record<string, { color: string; bg: string; border: string }> = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  confirmed: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  shipped: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)" },
  delivered: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)" },
  cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
};

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (orderId) {
          const data = await ordersServices.getOrderDetail(orderId);
          setOrder(data);
        }
      } catch (err: any) {
        notifyService.error("Order not found");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const getPaymentLabel = (o: OrderModel) => {
    if (o.paymentMethod?.creditCard) return 'Credit Card';
    if (o.paymentMethod?.paypal) return 'PayPal';
    return 'N/A';
  };

  const getStatusStyle = (status: string) => {
    const s = statusColors[status] || statusColors.pending;
    return {
      color: s.color,
      backgroundColor: s.bg,
      border: `1px solid ${s.border}`,
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
    };
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spinner animation="border" style={{ color: 'var(--ps-gold)' }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="ps-orders-page">
        <div className="ps-orders-empty">
          <FiPackage size={48} color="var(--ps-text-muted)" style={{ marginBottom: '16px' }} />
          <h4>Order not found</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-order-detail-page">
      <NavLink to={isAdminRoute ? "/admin/orders" : "/my-orders"} className="ps-order-back">
        <FiArrowLeft /> {isAdminRoute ? 'Back to Orders' : 'Back to My Orders'}
      </NavLink>

      <div className="ps-order-detail-header">
        <div>
          <h1>Order #{order.orderId?.slice(-6).toUpperCase()}</h1>
          <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Full ID: {order.orderId}
          </p>
        </div>
        <span style={getStatusStyle(order.status || 'pending')}>
          {order.status || 'pending'}
        </span>
      </div>

      <div className="ps-order-detail-grid">
        {/* Left column - Order info */}
        <div>
          {/* Customer info card */}
          <div className="ps-order-card" style={{ marginBottom: '20px' }}>
            <h5 style={{ marginBottom: '20px' }}>
              <FiUser size={16} style={{ marginRight: '8px', color: 'var(--ps-gold)' }} />
              Customer
            </h5>
            <div className="ps-detail-grid">
              <div>
                <span className="ps-detail-label">Name</span>
                <span className="ps-detail-value">{order.fullName}</span>
              </div>
              <div>
                <span className="ps-detail-label">Email</span>
                <span className="ps-detail-value">{order.email}</span>
              </div>
            </div>
          </div>

          {/* Shipping card */}
          <div className="ps-order-card" style={{ marginBottom: '20px' }}>
            <h5 style={{ marginBottom: '20px' }}>
              <FiMapPin size={16} style={{ marginRight: '8px', color: 'var(--ps-gold)' }} />
              Shipping
            </h5>
            <div className="ps-detail-grid">
              <div>
                <span className="ps-detail-label">Address</span>
                <span className="ps-detail-value">{order.address}</span>
              </div>
              <div>
                <span className="ps-detail-label">City</span>
                <span className="ps-detail-value">{order.city}</span>
              </div>
              <div>
                <span className="ps-detail-label">Zip Code</span>
                <span className="ps-detail-value">{order.zipCode}</span>
              </div>
            </div>
          </div>

          {/* Dates & Payment card */}
          <div className="ps-order-card">
            <h5 style={{ marginBottom: '20px' }}>
              <FiCalendar size={16} style={{ marginRight: '8px', color: 'var(--ps-gold)' }} />
              Dates & Payment
            </h5>
            <div className="ps-detail-grid">
              <div>
                <span className="ps-detail-label">Order Date</span>
                <span className="ps-detail-value">{formatDate(order.orderDate)}</span>
              </div>
              <div>
                <span className="ps-detail-label">Delivery Date</span>
                <span className="ps-detail-value">{formatDate(order.receivingDeliveryDate)}</span>
              </div>
              <div>
                <span className="ps-detail-label">Payment Method</span>
                <span className="ps-detail-value">{getPaymentLabel(order)}</span>
              </div>
              {order.paymentMethod?.paypal?.transactionId && (
                <div>
                  <span className="ps-detail-label">PayPal Transaction</span>
                  <span className="ps-detail-value" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
                    {order.paymentMethod.paypal.transactionId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Products & totals */}
        <div>
          <div className="ps-order-card">
            <h5 style={{ marginBottom: '20px' }}>
              <FiPackage size={16} style={{ marginRight: '8px', color: 'var(--ps-gold)' }} />
              Products ({order.products?.length || 0})
            </h5>

            {(!order.products || order.products.length === 0) ? (
              <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem' }}>
                No product data available for this order.
              </p>
            ) : (
              <div className="ps-order-detail-products">
                {order.products.map((p, i) => (
                  <div className="ps-order-detail-product" key={i}>
                    <img src={p.picture} alt={p.name} />
                    <div className="ps-product-info">
                      <div className="ps-product-name">{p.name}</div>
                      <div className="ps-product-meta">
                        ${asPriceNum(p.price)} &times; {p.amount}
                      </div>
                    </div>
                    <div className="ps-product-total">
                      ${asPriceNum(p.total_price)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            <div className="ps-order-totals" style={{ marginTop: '20px' }}>
              <div className="ps-totals-row">
                <span>Subtotal</span>
                <span>${asPriceNum(order.subtotal || 0)}</span>
              </div>
              <div className="ps-totals-row">
                <span>Shipping</span>
                <span>${asPriceNum(order.shippingCost || 0)}</span>
              </div>
              <div className="ps-totals-row">
                <span>VAT (17%)</span>
                <span>${asPriceNum(order.vat || 0)}</span>
              </div>
              <div className="ps-totals-row ps-totals-grand">
                <span>Total</span>
                <span>${asPriceNum(order.grandTotal || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
