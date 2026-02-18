import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ItemInCartModel from "../../Models/item-in-cart model";
import Role from "../../Models/role";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import OthersPhones from "./OthersPhones";
import { asPriceNum } from "../../Utils/helpers";
import { Popconfirm } from "antd";
import { Button } from "react-bootstrap";
import { FiArrowLeft, FiShoppingCart, FiCheck, FiMinus, FiPlus, FiStar, FiBox, FiShield, FiTruck, FiEdit2, FiTrash2 } from "react-icons/fi";
import phonesServices from "../../Services/PhonesServices";
import notifyService from "../../Services/NotifyService";

const PhonePage = () => {
  const { phoneId } = useParams();
  const navigate = useNavigate();
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const phones = useSelector((state: RootState) => state.store.phones);
  const [amount, setAmount] = useState<number>(1);
  const phone = phones?.find((p) => p._id === phoneId);
  const isInCart = shoppingCart?.products?.find((phone) => phone.phone_id === phoneId);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.roleId === Role.Admin) || false;

  const plus = () => {
    if (amount >= 10) return;
    setAmount(amount + 1);
  };

  const minus = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  const addToCart = async () => {
    if (!shoppingCart._id) {
      navigate('/auth/login');
      notifyService.error('Please login first');
      return;
    }

    const item = {
      cart_id: shoppingCart._id,
      phone_id: phoneId,
      amount,
      total_price: (phone.price || 0) * amount
    };
    const itemToAdd = new ItemInCartModel(item);

    try {
      if (!isInCart && itemToAdd.amount > 0) {
        await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
        notifyService.success(`${phone.name} added to cart`);
      }
    } catch (err: any) {
      notifyService.error(err.message);
    }
  };

  const handleAdminBtn = async (btnType: string): Promise<void> => {
    try {
      if (btnType === 'delete') {
        await phonesServices.deletePhoneById(phoneId);
        notifyService.success(`'${phone.name}' removed successfully`);
        navigate('/phones');
      }
    } catch (err: any) {
      notifyService.error(err.message);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={16}
        fill={i < rating ? '#c9a96e' : 'none'}
        color={i < rating ? '#c9a96e' : '#444'}
        style={{ marginRight: '2px' }}
      />
    ));
  };

  if (!phone) {
    return (
      <div className="ps-phone-page">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <p style={{ color: 'var(--ps-text-muted)' }}>Product not found</p>
          <NavLink to="/phones" className="ps-btn-outline-gold" style={{ display: 'inline-block', marginTop: '16px', textDecoration: 'none' }}>
            Back to Phones
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-phone-page">
      {/* Breadcrumb / Back */}
      <div className="ps-phone-breadcrumb">
        <NavLink to={phone?.brand_id ? `/brands/${phone.brand_id}` : '/phones'} className="ps-phone-back">
          <FiArrowLeft size={16} /> Back to Collection
        </NavLink>
      </div>

      {/* Main Product Section */}
      <div className="ps-phone-main">
        {/* Image */}
        <div className="ps-phone-image-section">
          <div className="ps-phone-image-wrapper">
            <img
              src={phone.picture}
              alt={phone.name}
              className="ps-phone-image"
            />
          </div>
        </div>

        {/* Details */}
        <div className="ps-phone-details-section">
          {/* Admin actions */}
          {isAdmin && (
            <div className="ps-phone-admin-actions">
              <button className="ps-phone-admin-btn ps-phone-admin-edit" onClick={() => navigate(`/phones`)}>
                <FiEdit2 size={14} /> Edit
              </button>
              <Popconfirm title="Delete this product?" onConfirm={() => handleAdminBtn('delete')}>
                <button className="ps-phone-admin-btn ps-phone-admin-delete">
                  <FiTrash2 size={14} /> Delete
                </button>
              </Popconfirm>
            </div>
          )}

          <h1 className="ps-phone-name">{phone.name}</h1>

          {/* Rating */}
          {phone.rating > 0 && (
            <div className="ps-phone-rating">
              {renderStars(phone.rating)}
              <span className="ps-phone-rating-text">{phone.rating}/5</span>
            </div>
          )}

          {/* Price */}
          <div className="ps-phone-price">${asPriceNum(phone.price)}</div>

          {/* Description */}
          <p className="ps-phone-description">{phone.description}</p>

          {/* Divider */}
          <div className="ps-phone-divider" />

          {/* Add to cart section (for non-admin users) */}
          {!isAdmin && (
            <div className="ps-phone-cart-section">
              {!isInCart ? (
                <>
                  {/* Quantity selector */}
                  <div className="ps-phone-quantity">
                    <span className="ps-phone-quantity-label">Quantity</span>
                    <div className="ps-phone-quantity-control">
                      <button className="ps-phone-qty-btn" onClick={minus} disabled={amount <= 1}>
                        <FiMinus size={14} />
                      </button>
                      <span className="ps-phone-qty-value">{amount}</span>
                      <button className="ps-phone-qty-btn" onClick={plus} disabled={amount >= 10}>
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Total for selected quantity */}
                  {amount > 1 && (
                    <div className="ps-phone-line-total">
                      Total: <strong>${asPriceNum(phone.price * amount)}</strong>
                    </div>
                  )}

                  {/* Add to cart button */}
                  <Button className="ps-phone-add-btn" onClick={addToCart}>
                    <FiShoppingCart size={16} />
                    Add to Cart
                  </Button>
                </>
              ) : (
                <div className="ps-phone-in-cart">
                  <FiCheck size={18} />
                  <span>Already in your cart</span>
                  <NavLink to="/cart" className="ps-phone-view-cart-link">
                    View Cart
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* Perks */}
          <div className="ps-phone-perks">
            <div className="ps-phone-perk">
              <FiTruck size={16} />
              <span>Free Shipping</span>
            </div>
            <div className="ps-phone-perk">
              <FiShield size={16} />
              <span>1 Year Warranty</span>
            </div>
            <div className="ps-phone-perk">
              <FiBox size={16} />
              <span>In Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="ps-phone-full-description">
        <h3>About This Product</h3>
        <div className="ps-phone-desc-divider" />
        <div className="ps-phone-desc-content">
          <p>{phone.description}</p>
          <p style={{ color: 'var(--ps-text-muted)' }}>
            Experience premium quality craftsmanship and cutting-edge technology.
            Designed for those who demand excellence in every detail.
          </p>
        </div>

        <h4 style={{ marginTop: '32px', fontSize: '1.1rem' }}>In The Box</h4>
        <ul className="ps-phone-inbox-list">
          <li>{phone.name}</li>
          <li>USB-C Charging Cable</li>
          <li>Quick Start Guide</li>
          <li>Warranty Card</li>
        </ul>
      </div>

      {/* You may also like */}
      <div className="ps-phone-related">
        <h3>You May Also Like</h3>
        <div className="ps-phone-desc-divider" />
        <div className="ps-phone-related-grid">
          <OthersPhones phone={phone} />
        </div>
      </div>
    </div>
  );
};

export default PhonePage;
