import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../Redux/Store";
import storeServices from "../../Services/StoreServices";
import { PhoneModel } from "../../Models/phone-model";
import { Button, Card, Container, Row } from "react-bootstrap";
import undefineImage from "../../Assets/undefine-card-img.jpg";
import { message } from "antd";
import { toUpperCase } from "../../Utils/helpers";

const TopThreeProducts = () => {
  const [topThree, setTopThree] = useState<PhoneModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getTopThree = async () => {
      try {
        const topThree = await storeServices.getTopThreeProducts();
        setTopThree(topThree);
        setIsLoading(false);
      } catch (err: any) {
        message.error(err.message);
      }
    };

    getTopThree();
  }, []);

  const getProductById = (_id: string) => {
    const product = store.getState().store.phones.find(phone => phone._id === _id);
    return product;
  };

  return (
    <Container className='w-auto'>
      <h1>
        Top 3 Products
      </h1>

      <Row className="flex-nowrap overflow-auto m-auto">
        {!isLoading && topThree.map((item) => (
          <Card
            key={item._id}
            as={NavLink}
            to={`/phone/${item._id}`}
            style={{ width: '15rem' }}
            className="m-1 p-1 w-auto text-decoration-none mb-3"
          >
            <Card.Img variant="top" height='200' src={getProductById(item._id)?.picture} />
            <Card.Title style={{ color: "black" }}>
              {toUpperCase(getProductById(item._id)?.name)}
            </Card.Title>

            <Button size='sm' variant="dark" className="w-auto m-auto mt-1 mb-1">
              {toUpperCase('go see')}
            </Button>
          </Card>
          ))
        }

        {isLoading && <UndefineTopThree />}
      </Row>
      <p className="text-muted">Based on users orders</p>
      <hr className='m-auto mt-2 mb-2' />
    </Container>
  )
}

export default TopThreeProducts

const UndefineTopThree = () => (
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
);
