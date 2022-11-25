import { useCallback, useEffect, useState } from "react"
import { Button, Card, Container, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import brandsServices from "../../Services/BrandsServices";
import { FcNext } from "react-icons/fc";

const BrandsPage = () => {
      const [brands, setBrands] = useState<BrandModel[]>();

      const getAllBrands = useCallback(async () => {
            const brands = await brandsServices.getAllBrands();
            setBrands(brands);
      }, []);

      useEffect(() => {
            getAllBrands();
      })

      return (
            <Container>
                  <h1>
                        All our brands
                  </h1>
                  <Row className="justify-content-center">
                        {brands?.map(brand =>
                              <Card key={brand?.brandId} style={{ width: '15rem' }} className="m-1">
                                    <Card.Img variant="top" height={'150'} src={brand?.img} />

                                    <Card.Body>
                                          <NavLink to={`/brands/${brand.brandId}`}>
                                                <Button variant="light">
                                                      Shop <FcNext />
                                                </Button>
                                          </NavLink>
                                    </Card.Body>
                              </Card>
                        )}
                  </Row>
            </Container>
      )
}

export default BrandsPage