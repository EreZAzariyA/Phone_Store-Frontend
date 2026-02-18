import { useState } from "react";
import { Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { NavLink } from "react-router-dom";
import Role from "../../Models/role";
import { PhoneModel } from "../../Models/phone-model";
import AddPhone from "./AddPhone";
import phonesServices from "../../Services/PhonesServices";
import notifyService from "../../Services/NotifyService";
import { toUpperCase, asPriceNum } from "../../Utils/helpers";
import { FiArrowRight, FiStar, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const steps = {
  New_Phone: "New_Phone",
  Update_Phone: "Update_Phone",
};

const PhonesArea = () => {
  const phones = useSelector((state: RootState) => state.store.phones || []);
  const [phone, setPhone] = useState<PhoneModel>(null);
  const [step, setStep] = useState(null);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.roleId === Role.Admin) || false;

  const handleBtn = async (btnType: string, phone: PhoneModel): Promise<void> => {
    try {
      if (btnType === 'delete') {
        await phonesServices.deletePhoneById(phone._id);
        notifyService.success(`Phone '${phone.name}' removed successfully`);
      }
      if (btnType === 'edit') {
        setPhone(phone);
        setStep(steps.Update_Phone);
      }
    } catch (err: any) {
      notifyService.error(err.message);
    }
  };

  const onBack = (): void => setStep(null);

  return (
    <div style={{ width: '100%' }}>
      {!step && (
        <div className="ps-catalog-page">
          <div className="ps-catalog-header">
            <div>
              <h1 className="ps-section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>All Phones</h1>
              <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                {phones.length} products
              </p>
            </div>
            {isAdmin && (
              <button className="ps-catalog-add-btn" onClick={() => setStep(steps.New_Phone)}>
                <FiPlus size={16} /> Add Phone
              </button>
            )}
          </div>
          <div className="ps-section-divider" style={{ margin: '0 0 36px 0' }} />

          <div className="ps-catalog-grid">
            {phones.map((phone) => (
              <div className="ps-catalog-card" key={phone._id}>
                {/* Admin overlay */}
                {isAdmin && (
                  <div className="ps-catalog-admin-overlay">
                    <button className="ps-catalog-admin-btn" onClick={() => handleBtn('edit', phone)}>
                      <FiEdit2 size={13} />
                    </button>
                    <Popconfirm title="Delete this phone?" onConfirm={() => handleBtn('delete', phone)}>
                      <button className="ps-catalog-admin-btn ps-catalog-admin-btn-danger">
                        <FiTrash2 size={13} />
                      </button>
                    </Popconfirm>
                  </div>
                )}

                <NavLink to={`/phone/${phone._id}`} className="ps-catalog-card-link">
                  <div className="ps-catalog-card-img">
                    <img src={phone.picture} alt={phone.name} />
                  </div>
                  <div className="ps-catalog-card-body">
                    <h5 className="ps-catalog-card-name">{toUpperCase(phone.name)}</h5>
                    {phone.rating > 0 && (
                      <div className="ps-catalog-card-rating">
                        <FiStar size={12} fill="#c9a96e" color="#c9a96e" />
                        <span>{phone.rating}</span>
                      </div>
                    )}
                    <div className="ps-catalog-card-footer">
                      <span className="ps-catalog-card-price">${asPriceNum(phone.price)}</span>
                      <span className="ps-catalog-card-action">
                        Shop <FiArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
      {(step && step === steps.New_Phone) && (
        <AddPhone onBack={onBack} />
      )}
      {(step && step === steps.Update_Phone) && (
        <AddPhone onBack={onBack} phone={phone} />
      )}
    </div>
  );
};

export default PhonesArea;
