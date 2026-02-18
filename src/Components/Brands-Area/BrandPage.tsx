import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import PhoneCard from "../Phones-Area/PhoneCard";
import OthersBrands from "./OthersBrand";
import { toUpperCase } from "../../Utils/helpers";
import { FiArrowLeft } from "react-icons/fi";

const BrandPage = () => {
  const { brand_id } = useParams();
  const store = useSelector((state: RootState) => state.store);
  const brand = store.brands.find((b) => b._id === brand_id);
  const phones = [...store.phones].filter((phone) => phone.brand_id === brand_id);

  return (
    <div className="ps-catalog-page">
      {/* Back link */}
      <NavLink to="/brands" className="ps-catalog-back-link">
        <FiArrowLeft size={14} /> All Brands
      </NavLink>

      {/* Page header */}
      <div className="ps-catalog-header" style={{ marginTop: '24px' }}>
        <div>
          <h1 className="ps-section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>
            {brand?.brand ? toUpperCase(brand.brand) : ''}
          </h1>
          <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            {phones.length} {phones.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>
      <div className="ps-section-divider" style={{ margin: '0 0 36px 0' }} />

      {/* Phone cards grid */}
      {phones.length > 0 ? (
        <div className="ps-catalog-grid">
          {phones.map((phone) => (
            <PhoneCard key={phone._id} phone={phone} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--ps-text-muted)', textAlign: 'center', padding: '40px 0' }}>
          No products available for this brand yet.
        </p>
      )}

      {/* Other brands section */}
      <div className="ps-catalog-others-section">
        <h3 className="ps-catalog-others-title">You May Also Like</h3>
        <div className="ps-catalog-others-divider" />
        <div className="ps-catalog-others-grid">
          <OthersBrands brand_id={brand?._id} />
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
