import { Button, Card } from "react-bootstrap"
import { BrandModel } from "../../Models/brand-model";
import { FcNext } from "react-icons/fc";
import { NavLink } from "react-router-dom";

interface BrandCardProps {
      brand: BrandModel;
}

const BrandCard = (props: BrandCardProps) => {
      return (
            <Card className="m-1 w-auto p-2">
                  <Card.Img variant="top" className='mb-1' height={'150'} src={props.brand?.img} />

                  <Card.Body>
                        <NavLink to={`/brands/${props.brand.brandId}`}>
                              <Button variant="light">
                                    Shop <FcNext />
                              </Button>
                        </NavLink>
                  </Card.Body>
            </Card>
      )
}

export default BrandCard;