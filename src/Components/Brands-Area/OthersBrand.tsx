import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { toUpperCase } from "../../Utils/helpers";
import { Card, Button } from "react-bootstrap";
import { FcNext } from "react-icons/fc";

interface OthersBrandsProps {
  brand_id: string;
};

const OthersBrands = (props: OthersBrandsProps) => {
  const navigate = useNavigate();
  const brands = useSelector((state: RootState) => state.store.brands);
  const othersBrands = [...brands || []].filter((brand) => brand._id !== props.brand_id);

  return (
    <>
      {othersBrands.map((brand) =>
        <Card
          key={brand._id}
          style={{ width: '15rem', cursor: 'pointer' }}
          className="m-1 p-1 w-auto text-decoration-none mb-3"
          onClick={() => navigate(`/brands/${brand._id}`)}
        >
          <Card.Img variant="top" height='150px' src={brand.img} alt={brand.brand + ' ImageURL'} />
          <Card.Title className="mt-2">{toUpperCase(brand.brand)}</Card.Title>
          <Button variant="light" size="sm">
            Shop <FcNext />
          </Button>
        </Card>
      )}
    </>
  );
};

export default OthersBrands;