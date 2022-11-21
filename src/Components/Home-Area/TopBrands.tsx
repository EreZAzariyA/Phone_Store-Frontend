import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { store } from "../../Redux/Store";
import storeServices from "../../Services/StoreServices";
import undefineImage from "../../Assets/undefine-card-img.jpg";

const TopBrands = () => {
      const [topBrands, setTopBrands] = useState<[{ brandId: string }]>();

      const getTopBrands = useCallback(async () => {
            const topBrands = await storeServices.getTopBrands();
            setTopBrands(topBrands as any);
      }, []);

      useEffect(() => {
            getTopBrands();
      }, [getTopBrands]);


      const getProductById = (brandId: string) => {
            const product = store.getState().brands?.find(brand => brand.brandId === brandId);
            return product
      }

      return (
            <Container className='w-auto'>
                  <h1>
                        Our Top 3 Brands
                  </h1>

                  <Row className="flex-nowrap overflow-auto m-auto">
                        {topBrands?.map(product =>
                              <Card key={product?.brandId} className="m-1 p-1 w-auto text-decoration-none mb-3" as={NavLink} to={`/brands/${product?.brandId}`}>
                                    <Card.Img variant="top" height='200' src={getProductById(product?.brandId)?.img} />

                                    <Button size='sm' variant="dark" className="w-auto m-auto mt-1 mb-1">
                                          Go see
                                    </Button>
                              </Card>
                        )}

                        {topBrands === undefined &&
                              undefineTopBrands()
                        }
                  </Row>
            </Container >
      )
}

export default TopBrands;

const undefineTopBrands = () => {

      return (
            <>
                  <Card className="m-1 p-1 w-auto">
                        <Card.Img variant="top" height='150' src={undefineImage} />
                        <Card.Body>
                              <p className="w-50 placeholder placeholder-wave placeholder-xs" />
                              <br />
                              <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                              <br />
                              <Button disabled>

                              </Button>
                        </Card.Body>

                  </Card>
                  <Card className="m-1 p-1 w-auto">
                        <Card.Img variant="top" height='150' src={undefineImage} />
                        <Card.Body>
                              <p className="w-50 placeholder placeholder-wave placeholder-xs" />
                              <br />
                              <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                              <br />
                              <Button disabled>

                              </Button>
                        </Card.Body>
                  </Card>
                  <Card className="m-1 p-1 w-auto">
                        <Card.Img variant="top" height='150' src={undefineImage} />
                        <Card.Body >
                              <p className="w-50 placeholder placeholder-wave placeholder-xs" />
                              <br />
                              <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                              <br />
                              <Button disabled>

                              </Button>
                        </Card.Body>
                  </Card>
            </>
      )
}

