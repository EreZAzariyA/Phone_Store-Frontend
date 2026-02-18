import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { toUpperCase } from "../../Utils/helpers";
import { FiArrowRight } from "react-icons/fi";

interface OthersBrandsProps {
  brand_id: string;
}

const OthersBrands = (props: OthersBrandsProps) => {
  const navigate = useNavigate();
  const brands = useSelector((state: RootState) => state.store.brands);
  const othersBrands = [...(brands || [])].filter((brand) => brand._id !== props.brand_id);

  if (!othersBrands || othersBrands.length === 0) {
    return (
      <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>
        No other brands available.
      </p>
    );
  }

  return (
    <>
      {othersBrands.map((brand) => (
        <div
          key={brand._id}
          className="ps-catalog-card"
          onClick={() => navigate(`/brands/${brand._id}`)}
          style={{ cursor: 'pointer' }}
        >
          <div className="ps-catalog-card-img">
            <img src={brand.img} alt={brand.brand} />
          </div>
          <div className="ps-catalog-card-body">
            <h5 className="ps-catalog-card-name">{toUpperCase(brand.brand)}</h5>
            <div className="ps-catalog-card-footer">
              <span className="ps-catalog-card-action">
                Explore <FiArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OthersBrands;
