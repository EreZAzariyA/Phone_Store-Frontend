import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import storeServices from "../../Services/StoreServices";
import PhoneCard from "../Phones-Area/PhoneCard";

const OneBrand = () => {

      const [brand, setBrand] = useState<BrandModel>();
      const [phones, setPhones] = useState<PhoneModel[]>();
      const params = useParams();

      const getBrandByParams = useCallback(async (brandId: string) => {
            const brand = await storeServices.getOneBrand(brandId);
            setBrand(brand);
            getPhonesByBrandId(brand?.brandId);
      }, []);

      useEffect(() => {
            const brandId = params.brandId;
            getBrandByParams(brandId);
      }, [params?.brandId, getBrandByParams]);


      const getPhonesByBrandId = (async (brandId: string) => {
            const phones = await storeServices.getPhonesByBrandId(brandId);
            setPhones(phones);
      });



      return (
            <Container>
                  {/* Back button */}
                  <Row className="mt-2 mb-1">
                        <Col xs='2' sm='2'>
                              <NavLink className='text-decoration-none' to='/'>
                                    Go Back
                              </NavLink>
                        </Col>
                  </Row>

                  <h1>{brand?.brand}</h1>

                  <Row>
                        <Container>
                              <Row>
                                    {phones?.map(phone =>
                                          <Col lg='3' md='6' sm='6' xs='12' key={phone.phoneId}>
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
      }, [getOthersBrands]);

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
            </>
      )
}
