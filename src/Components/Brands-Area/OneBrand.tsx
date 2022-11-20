import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import brandsServices from "../../Services/BrandsServices";
import phonesServices from "../../Services/PhonesServices";
import PhoneCard from "../Phones-Area/PhoneCard";
import OthersBrands from "./OthersBrand";

const OneBrand = () => {

      const [brand, setBrand] = useState<BrandModel>();
      const [phones, setPhones] = useState<PhoneModel[]>();
      const params = useParams();

      const getBrandByParams = useCallback(async () => {
            const brandId = params.brandId;
            const brand = await brandsServices.getOneBrand(brandId);
            setBrand(brand);
            getPhonesByBrandId(brand?.brandId);
      }, [params.brandId]);

      useEffect(() => {
            getBrandByParams();
      }, [getBrandByParams]);


      const getPhonesByBrandId = (async (brandId: string) => {
            const phones = await phonesServices.getPhonesByBrandId(brandId);
            setPhones(phones);
      });


      return (
            <Container className="w-75">
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
                              <Row className="m-auto justify-content-center">
                                    {phones?.map(phone =>
                                          <PhoneCard key={phone?.phoneId} phone={phone} />
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
                                    <OthersBrands brandId={brand?.brandId} />
                              </Row>
                        </Container>

                  </Row>
            </Container >
      )
}
export default OneBrand;

