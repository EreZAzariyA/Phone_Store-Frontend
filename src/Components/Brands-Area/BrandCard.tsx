import { Button, Card } from "react-bootstrap";
import { BrandModel } from "../../Models/brand-model";
import { toUpperCase } from "../../Utils/helpers";
import { NavLink } from "react-router-dom";

interface BrandCardProps {
  brand: BrandModel;
}

const BrandCard = (props: BrandCardProps) => {
  return (
    <Card
      as={NavLink}
      to={`/brands/${props.brand._id}`}
      className="ps-product-card"
      style={{ width: '240px' }}
    >
      <div style={{ overflow: 'hidden' }}>
        <Card.Img variant="top" src={props.brand.img} style={{ height: '160px', objectFit: 'cover' }} />
      </div>
      <Card.Body>
        <Card.Title>{toUpperCase(props.brand.brand)}</Card.Title>
        <Button className="ps-btn-outline-gold" size="sm">
          Shop
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BrandCard;
