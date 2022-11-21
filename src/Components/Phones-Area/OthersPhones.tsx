import { useState, useMemo } from "react";
import { Card, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model";
import phonesServices from "../../Services/PhonesServices";

interface OthersPhonesProps {
      phone: PhoneModel;
}

const OthersPhones = (props: OthersPhonesProps) => {
      const [othersPhones, setOthersPhones] = useState<PhoneModel[]>();

      useMemo(async () => {
            const phonesBySameBrand = await phonesServices.getPhonesByBrandId(props.phone?.brandId);
            const othersPhones = phonesBySameBrand.filter(p => p?.phoneId !== props.phone?.phoneId);
            setOthersPhones(othersPhones);
      }, [props.phone]);

      return (
            <>
                  {othersPhones?.map(p =>
                        <Card key={p.phoneId} className="m-1 p-1 w-auto text-decoration-none text-black" as={NavLink} to={`/phone/${p?.phoneId}`}>
                              <Card.Img src={p?.picture} variant='top' height='150' alt='' />

                              <Card.Title>
                                    {p.name}
                              </Card.Title>
                              <Card.Body>
                                    <Button size='sm' variant="dark">
                                          Go See
                                    </Button>
                              </Card.Body>
                        </Card>
                  )}
            </>
      )
}

export default OthersPhones;