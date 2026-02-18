import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { BrandModel } from "../../Models/brand-model";
import Role from "../../Models/role";
import AddBrand from "./AddBrand";
import notifyService from "../../Services/NotifyService";
import brandsServices from "../../Services/BrandsServices";
import { toUpperCase } from "../../Utils/helpers";
import { Popconfirm } from "antd";
import { FiArrowRight, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import "./brands.css";

const steps = {
  New_Brand: "New_Brand",
  Update_Brand: "Update_Brand",
};

const BrandsArea = () => {
  const brands = useSelector((state: RootState) => state.store.brands);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [brand, setBrand] = useState<BrandModel>(null);
  const [step, setStep] = useState(null);
  const isAdmin = user && user.roleId === Role.Admin;

  const handleBtn = async (btnType: string, brand: BrandModel): Promise<void> => {
    try {
      if (btnType === 'delete') {
        await brandsServices.deleteBrand(brand._id);
        notifyService.success(`Brand '${brand.brand}' removed successfully`);
      }
      if (btnType === 'edit') {
        setBrand(brand);
        setStep(steps.Update_Brand);
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
              <h1 className="ps-section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>All Brands</h1>
              <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                {brands.length} collections
              </p>
            </div>
            {isAdmin && (
              <button className="ps-catalog-add-btn" onClick={() => setStep(steps.New_Brand)}>
                <FiPlus size={16} /> Add Brand
              </button>
            )}
          </div>
          <div className="ps-section-divider" style={{ margin: '0 0 36px 0' }} />

          <div className="ps-catalog-grid">
            {brands.map((brand) => (
              <div className="ps-catalog-card" key={brand._id}>
                {/* Admin overlay */}
                {isAdmin && (
                  <div className="ps-catalog-admin-overlay">
                    <button className="ps-catalog-admin-btn" onClick={() => handleBtn('edit', brand)}>
                      <FiEdit2 size={13} />
                    </button>
                    <Popconfirm title="Delete this brand?" onConfirm={() => handleBtn('delete', brand)}>
                      <button className="ps-catalog-admin-btn ps-catalog-admin-btn-danger">
                        <FiTrash2 size={13} />
                      </button>
                    </Popconfirm>
                  </div>
                )}

                <div
                  className="ps-catalog-card-link"
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
              </div>
            ))}
          </div>
        </div>
      )}
      {(step && step === steps.New_Brand) && (
        <AddBrand onBack={onBack} />
      )}
      {(brand && step === steps.Update_Brand) && (
        <AddBrand brand={brand} onBack={onBack} />
      )}
    </div>
  );
};

export default BrandsArea;
