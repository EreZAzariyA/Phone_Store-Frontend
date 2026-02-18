import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model";
import { toUpperCase, asPriceNum } from "../../Utils/helpers";
import { FiArrowRight, FiStar } from "react-icons/fi";

interface PhoneCardProps {
  phone: PhoneModel;
}

const PhoneCard = (props: PhoneCardProps) => {
  return (
    <NavLink to={`/phone/${props.phone._id}`} className="ps-catalog-card-link">
      <div className="ps-catalog-card">
        <div className="ps-catalog-card-img">
          <img src={props.phone?.picture} alt={props.phone?.name} />
        </div>
        <div className="ps-catalog-card-body">
          <h5 className="ps-catalog-card-name">{toUpperCase(props.phone?.name)}</h5>
          {props.phone?.rating > 0 && (
            <div className="ps-catalog-card-rating">
              <FiStar size={12} fill="#c9a96e" color="#c9a96e" />
              <span>{props.phone.rating}</span>
            </div>
          )}
          <div className="ps-catalog-card-footer">
            <span className="ps-catalog-card-price">${asPriceNum(props.phone?.price)}</span>
            <span className="ps-catalog-card-action">
              Shop <FiArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default PhoneCard;
