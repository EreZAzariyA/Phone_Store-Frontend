import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { BrandModel } from "../../Models/brand-model";
import storeServices from "../../Services/StoreServices";

import { toUpperCase } from "../../Utils/helpers";
import { message } from "antd";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const TopBrands = () => {
  const [topBrands, setTopBrands] = useState<BrandModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const brands = useSelector((state: RootState) => state.store.brands);

  useEffect(() => {
    setIsLoading(true);
    storeServices.getTopBrands().then((topBrands) => {
      setTopBrands(topBrands || []);
      setIsLoading(false);
    }).catch((err: any) => {
      message.error(err.message);
    });
  }, []);

  const getBrandById = (_id: string) => {
    const brand = brands.find(brand => brand._id === _id);
    return brand;
  };

  return (
    <>
      <div className="ps-card-row">
        {!isLoading && topBrands?.map((brand) =>
          <Card
            key={brand?._id}
            as={NavLink}
            to={`/brands/${brand?._id}`}
            className="ps-product-card"
            style={{ width: '280px' }}
          >
            <div style={{ overflow: 'hidden' }}>
              <Card.Img variant="top" src={getBrandById(brand?._id)?.img} />
            </div>
            <Card.Body>
              <Card.Title>{toUpperCase(brand?.brand)}</Card.Title>
              <Button className="ps-btn-outline-gold" size="sm">
                Explore
              </Button>
            </Card.Body>
          </Card>
        )}
        {isLoading && <SkeletonCards />}
      </div>
    </>
  );
};

export default TopBrands;

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
