import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { BrandModel } from "../../Models/brand-model";
import Role from "../../Models/role";
import notifyService from "../../Services/NotifyService";
import brandsServices from "../../Services/BrandsServices";
import AddBrand from "./AddBrand";
import { toUpperCase } from "../../Utils/helpers";
import { Card, Popconfirm, Row, Space } from "antd";
import { Button } from "react-bootstrap";
import { FcNext } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import "./brands.css";

const { Meta } = Card;

const steps = {
  New_Brand: "New_Brand",
  Update_Brand: "Update_Brand",
};

const BrandsArea = () => {
  const brands = useSelector((state: RootState) => state.store.brands);
  const user = useSelector((state: RootState) => state.auth.user);
  const [brand, setBrand] = useState<BrandModel>(null);
  const [step, setStep] = useState(null);

  const handleBtn = async (btnType: string, brand: BrandModel): Promise<void> => {
    try {
      if (btnType === 'delete') {
        await brandsServices.deleteBrand(brand._id);
        notifyService.success(`Brand '${brand.brand}' Removed Successfully`);
      }
      if (btnType === 'edit') {
        setBrand(brand);
        setStep(steps.Update_Brand);
      }
    } catch (err: any) {
      console.log(err);
      notifyService.error(err.message);
    }
  };

  const onBack = (): void => setStep(null);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {!step && (
        <>
          <h1>All Brands</h1>
          <Row align={'middle'} justify={'center'} gutter={[10, 10]}>
            {brands.map((brand) =>
              <Card
                key={brand._id}
                style={{ width: '15rem' }}
                hoverable
                className="m-1"
                cover={<img src={brand.img} alt={`${brand.brand}-img`} />}
              >
                {(user && user.roleId === Role.Admin) && (
                  <div className="d-flex justify-content-end btn-toolbar admin-buttons">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleBtn('edit', brand)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => handleBtn('delete', brand)}
                      >
                        <button
                          className="btn btn-sm btn-danger"
                        >
                          <MdDeleteOutline />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                )}
                <Meta title={toUpperCase(brand.brand)} />
                <NavLink to={`/brands/${brand._id}`}>
                  <Button className="mt-3" variant="light">
                    Shop <FcNext />
                  </Button>
                </NavLink>
              </Card>
            )}
          </Row>
          {(user && user.roleId === Role.Admin) && (
            <button className="btn btn-success" onClick={() => setStep(steps.New_Brand)}>Add new brand</button>
          )}
        </>
      )}
      {(step && step === steps.New_Brand) && (
        <AddBrand onBack={onBack} />
      )}
      {(brand && step === steps.Update_Brand) && (
        <AddBrand
          brand={brand}
          onBack={onBack}
        />
      )}
    </Space>
  );
};

export default BrandsArea;