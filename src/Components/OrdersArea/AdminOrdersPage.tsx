import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import ordersServices from "../../Services/OrdersServices";
import notifyService from "../../Services/NotifyService";
import { Form, Spinner } from "react-bootstrap";
import { FiPackage, FiCalendar, FiMapPin, FiUser, FiDollarSign, FiChevronRight } from "react-icons/fi";
import { asPriceNum } from "../../Utils/helpers";

const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, { color: string; bg: string; border: string }> = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  confirmed: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  shipped: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)" },
  delivered: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)" },
  cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
};

const AdminOrdersPage = () => {
  const orders = useSelector((state: RootState) => state.orders.allOrders);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await ordersServices.getAllOrders();
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await ordersServices.updateOrderStatus(orderId, newStatus);
      notifyService.success(`Order updated to ${newStatus}`);
    } catch (err: any) {
      notifyService.error("Failed to update order status");
    }
  };

  const filteredOrders = filter === "all"
    ? orders
    : orders?.filter(o => o.status === filter);

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
    <div className="ps-orders-page" style={{ maxWidth: '1100px' }}>
      <div className="ps-orders-header">
        <h1>All Orders</h1>
        <span className="ps-orders-count">
          {filteredOrders?.length || 0} {filteredOrders?.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {/* Filter bar */}
      <div className="ps-admin-orders-filter">
        <button
          className={`ps-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {statusOptions.map(s => (
          <button
            key={s}
            className={`ps-filter-btn ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spinner animation="border" style={{ color: 'var(--ps-gold)' }} />
        </div>
      )}

      {!loading && (!filteredOrders || filteredOrders.length === 0) && (
        <div className="ps-orders-empty">
          <FiPackage size={48} color="var(--ps-text-muted)" style={{ marginBottom: '16px' }} />
          <h4>No orders found</h4>
          <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem' }}>
            {filter !== 'all' ? `No ${filter} orders.` : 'No orders have been placed yet.'}
          </p>
        </div>
      )}

      {!loading && filteredOrders?.length > 0 && (
        <div className="ps-orders-list">
          {filteredOrders.map((order, index) => (
            <div className="ps-order-row" key={order.orderId || index}>
              <div className="ps-order-row-header">
                <div className="ps-order-row-id">
                  <FiPackage size={16} />
                  <span>Order #{order.orderId?.slice(-6).toUpperCase() || (index + 1)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Form.Select
                    size="sm"
                    value={order.status || 'pending'}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    className="ps-status-select"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </Form.Select>

                  <span style={getStatusStyle(order.status || 'pending')}>
                    {order.status || 'pending'}
                  </span>
                </div>
              </div>

              <div className="ps-order-row-body">
                <div className="ps-order-row-detail">
                  <FiUser size={14} />
                  <div>
                    <span className="ps-detail-label">Customer</span>
                    <span className="ps-detail-value">{order.fullName}</span>
                    <span className="ps-detail-value" style={{ fontSize: '0.75rem', color: 'var(--ps-text-muted)' }}>{order.email}</span>
                  </div>
                </div>

                <div className="ps-order-row-detail">
                  <FiCalendar size={14} />
                  <div>
                    <span className="ps-detail-label">Ordered</span>
                    <span className="ps-detail-value">{formatDate(order.orderDate)}</span>
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

              {/* Products preview + view link */}
              <div className="ps-order-row-footer">
                <div className="ps-order-products-preview">
                  {order.products?.slice(0, 4).map((p, i) => (
                    <img key={i} src={p.picture} alt={p.name} title={p.name} />
                  ))}
                  {order.products?.length > 4 && (
                    <span className="ps-products-more">+{order.products.length - 4}</span>
                  )}
                  {(!order.products || order.products.length === 0) && (
                    <span style={{ color: 'var(--ps-text-muted)', fontSize: '0.8rem' }}>No product data</span>
                  )}
                </div>

                <NavLink
                  to={`/admin/order/${order.orderId}`}
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

export default AdminOrdersPage;
