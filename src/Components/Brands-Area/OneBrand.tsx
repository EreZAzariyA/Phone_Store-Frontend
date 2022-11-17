import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import storeServices from "../../Services/StoreServices";
import PhoneCard from "../Phones-Area/PhoneCard";
import BrandCard from "./BrandCard";

const OneBrand = () => {

      const [brand, setBrand] = useState<BrandModel>();
      const [phones, setPhones] = useState<PhoneModel[]>();
      const params = useParams();

      useEffect(() => {
            const brandId = params.brandId;
            getBrandByParams(brandId);
      }, [params?.brandId]);


      const getBrandByParams = useCallback(async (brandId: string) => {
            const brand = await storeServices.getOneBrand(brandId);
            setBrand(brand);
            getPhonesByBrandId(brand?.brandId);
      }, []);

      const getPhonesByBrandId = useCallback(async (brandId: string) => {
            const phones = await storeServices.getPhonesByBrandId(brandId);
            setPhones(phones);
      }, []);



      return (
            <Container >
                  <h1>{brand?.brand}</h1>

                  <NavLink to='/'>
                        <Button size="sm" className="d-none d-lg-flex" style={{ position: 'absolute', right: '15px', top: '5rem' }}>
                              Back
                        </Button>
                  </NavLink>
                  <Row>
                        <Container>
                              <Row>
                                    {phones?.map(phone =>
                                          <Col lg='4' md='6' sm='6' xs='12' key={phone.phoneId}>
                                                <PhoneCard phone={phone} />
                                          </Col>
                                    )}
                              </Row>
                        </Container>
                  </Row >
                  <Row>
                        {/* Others brands */}
                        <Container>
                              <Row>
                                    <h2>You May Also Like</h2>
                              </Row>
                              <Row className="flex-nowrap overflow-auto">
                                    {OthersBrands(brand?.brandId)}
                              </Row>
                        </Container>

                  </Row>
            </Container >
      )
}
export default OneBrand;


const OthersBrands = (brandId: string) => {
      const [othersBrands, setOthersBrands] = useState<BrandModel[]>();

      const getOthersBrands = useCallback(async () => {
            const allBrands = await storeServices.getAllBrands();
            const othersBrands = allBrands.filter(brand => brand.brandId !== brandId);
            setOthersBrands(othersBrands);
      }, [brandId]);

      useEffect(() => {
            getOthersBrands();
      }, []);

      return (
            <>
                  {othersBrands?.map(brand =>
                        <Card key={brand?.brandId} as={Col} xs='6' sm='4' md='2' className="m-1 m-md-auto p-1">
                              <Card.Img variant="top" height='150px' src={brand?.img} alt={brand?.brand + ' ImageURL'} />
                              <Card.Body>
                                    <NavLink to={`/brands/${brand?.brandId}`}>
                                          <Button size='sm' variant="dark">
                                                See Products
                                          </Button>
                                    </NavLink>
                              </Card.Body>
                        </Card>

                  )}
            </ >
      )
}

const OthersPhones = (brandId: string) => {
      const [othersPhones, setOthersPhones] = useState<PhoneModel[]>();

      const getOthersPhones = useCallback(async () => {
            const allPhones = await storeServices.getAllPhones();
            const othersPhones = allPhones.filter(phones => phones?.brandId !== brandId);
            setOthersPhones(othersPhones);
      }, [brandId]);

      useEffect(() => {
            getOthersPhones();
      });

      return (
            <Container>

            </Container>
      );
}
