import { useState } from "react";
import { Card, Popconfirm, Row, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FcNext } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import Role from "../../Models/role";
import { PhoneModel } from "../../Models/phone-model";
import AddPhone from "./AddPhone";
import phonesServices from "../../Services/PhonesServices";
import notifyService from "../../Services/NotifyService";
import { toUpperCase } from "../../Utils/helpers";

const steps = {
  New_Phone: "New_Phone",
  Update_Phone: "Update_Phone",
};

const PhonesArea = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const phones = useSelector((state: RootState) => state.store.phones);
  const [phone, setPhone] = useState<PhoneModel>(null);
  const [step, setStep] = useState(null);

  const handleBtn = async (btnType: string, phone: PhoneModel): Promise<void> => {
    try {
      if (btnType === 'delete') {
        await phonesServices.deletePhoneById(phone._id);
        notifyService.success(`Phone '${phone.name}' Removed Successfully`);
      }
      if (btnType === 'edit') {
        setPhone(phone);
        setStep(steps.Update_Phone);
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
          <h1>All Phones</h1>
          <Row align={'middle'} justify={'center'} gutter={[10, 10]}>
            {phones.map((phone) =>
              <Card
                key={phone._id}
                style={{ width: '15rem' }}
                hoverable
                className="m-1"
                cover={<img src={phone.picture} alt={`${phone.name}-img`} />}
              >
                {(user && user.roleId === Role.Admin) && (
                  <div className="d-flex justify-content-end btn-toolbar admin-buttons">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleBtn('edit', phone)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => handleBtn('delete', phone)}
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
                <Card.Meta title={toUpperCase(phone.name)} />
                <NavLink to={`/phones/${phone._id}`}>
                  <Button className="mt-3" variant="light">
                    Shop <FcNext />
                  </Button>
                </NavLink>
              </Card>
            )}
          </Row>
          {(user && user.roleId === Role.Admin) && (
            <button className="btn btn-success" onClick={() => setStep(steps.New_Phone)}>Add new phone</button>
          )}
        </>
      )}
      {(step && step === steps.New_Phone) && (
        <AddPhone onBack={onBack} />
      )}
      {(step && step === steps.Update_Phone) && (
        <AddPhone onBack={onBack} phone={phone} />
      )}
    </Space>
  );
};

export default PhonesArea;