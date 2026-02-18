import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../Redux/Store";
import storeServices from "../../Services/StoreServices";
import { PhoneModel } from "../../Models/phone-model";
import { Button, Card } from "react-bootstrap";

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
    <>
      <div className="ps-card-row">
        {!isLoading && topThree.map((item) => (
          <Card
            key={item._id}
            as={NavLink}
            to={`/phone/${item._id}`}
            className="ps-product-card"
            style={{ width: '280px' }}
          >
            <div style={{ overflow: 'hidden' }}>
              <Card.Img variant="top" src={getProductById(item._id)?.picture} />
            </div>
            <Card.Body>
              <Card.Title>{toUpperCase(getProductById(item._id)?.name)}</Card.Title>
              <Button className="ps-btn-outline-gold" size="sm">
                View Product
              </Button>
            </Card.Body>
          </Card>
        ))}

        {isLoading && <SkeletonCards />}
      </div>
      <p className="text-muted-custom text-center mt-3" style={{ fontSize: '0.85rem' }}>
        Based on user orders
      </p>
    </>
  );
};

export default TopThreeProducts;

const SkeletonCards = () => (
  <>
    {[1, 2, 3].map((i) => (
      <Card key={i} className="ps-skeleton-card" style={{ width: '280px' }}>
        <div className="ps-skeleton-img" />
        <Card.Body className="text-center">
          <p className="placeholder-wave mb-2">
            <span className="placeholder col-8" style={{ background: 'var(--ps-elevated)' }} />
          </p>
          <p className="placeholder-wave">
            <span className="placeholder col-5" style={{ background: 'var(--ps-elevated)' }} />
          </p>
        </Card.Body>
      </Card>
    ))}
  </>
);
