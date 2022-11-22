import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { store } from "../../Redux/Store";
import storeServices from "../../Services/StoreServices";
import undefineImage from "../../Assets/undefine-card-img.jpg";

const TopThreeProducts = () => {
      const [topThree, setTopThree] = useState<[{ phoneId: string }]>();

      const getTopThree = useCallback(async () => {
            const topThree = await storeServices.getTopThreeProducts();
            setTopThree(topThree as any);
      }, []);

      useEffect(() => {
            getTopThree();
      }, [getTopThree]);


      const getProductById = (productId: string) => {
            const product = store.getState().phones?.find(phone => phone.phoneId === productId);
            return product
      }

      return (
            <Container className='w-auto'>
                  <h1>
                        Top 3 Products
                  </h1>

                  <Row className="flex-nowrap overflow-auto m-auto">
                        {topThree?.map(item =>
                              <Card key={item?.phoneId} className="m-1 p-1 w-auto text-decoration-none mb-3" as={NavLink} to={`/phone/${item?.phoneId}`}>
                                    <Card.Img variant="top" height='200' src={getProductById(item?.phoneId)?.picture} />
                                    <Card.Body>
                                          <Card.Title style={{ color: "black" }}>
                                                {getProductById(item?.phoneId)?.name}
                                          </Card.Title>
                                          <Button size='sm' variant="dark">
                                                Go see
                                          </Button>
                                    </Card.Body>
                              </Card>
                        )}

                        {topThree === undefined &&
                              undefineTopThree()
                        }

                  </Row>
                  <p className="text-muted">Based on users orders</p>
                  <hr className='m-auto mt-2 mb-2' />

            </Container >
      )
}

export default TopThreeProducts

const undefineTopThree = () => {

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

