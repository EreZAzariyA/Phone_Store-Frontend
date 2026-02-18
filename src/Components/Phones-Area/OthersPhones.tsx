import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model";
import phonesServices from "../../Services/PhonesServices";
import { asPriceNum } from "../../Utils/helpers";
import { FiArrowRight } from "react-icons/fi";

interface OthersPhonesProps {
  phone: PhoneModel;
}

const OthersPhones = (props: OthersPhonesProps) => {
  const [othersPhones, setOthersPhones] = useState<PhoneModel[]>();

  useEffect(() => {
    const getOthersPhones = async () => {
      const phonesBySameBrand = await phonesServices.getPhonesByBrandId(props.phone.brand_id);
      const filtered = phonesBySameBrand.filter((phone) => phone._id !== props.phone._id);
      setOthersPhones(filtered);
    };

    if (props.phone) {
      getOthersPhones();
    }
  }, [props]);

  if (!othersPhones || othersPhones.length === 0) {
    return (
      <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>
        No other products from this brand.
      </p>
    );
  }

  return (
    <>
      {othersPhones.map((p) => (
        <NavLink
          key={p._id}
          to={`/phone/${p._id}`}
          className="ps-related-card"
        >
          <div className="ps-related-card-img">
            <img src={p.picture} alt={p.name} />
          </div>
          <div className="ps-related-card-body">
            <h5 className="ps-related-card-name">{p.name}</h5>
            <span className="ps-related-card-price">${asPriceNum(p.price)}</span>
            <span className="ps-related-card-link">
              View <FiArrowRight size={12} />
            </span>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default OthersPhones;
