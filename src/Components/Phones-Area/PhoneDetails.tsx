import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model";
import storeServices from "../../Services/StoreServices";

const PhoneDetails = () => {

      const [phone, setPhone] = useState<PhoneModel>();
      const params = useParams();

      useEffect(() => {
            const phoneId = params.phoneId;
            getPhoneById(phoneId);
      });

      const getPhoneById = useCallback(async (phoneId: string) => {
            const phone = await storeServices.getOnePhone(phoneId);
            setPhone(phone);
      }, [])

      return (
            <Container>
                  <NavLink to={`/brands/${phone?.brandId}`}>
                        <Button variant='light' style={{ position: 'absolute', left: '20px', marginTop: '10px' }}>
                              Go Back
                        </Button>
                  </NavLink>

                  <Row>
                        <Col>

                        </Col>
                  </Row>
            </Container >
      )
}

export default PhoneDetails;