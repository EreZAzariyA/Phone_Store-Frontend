import { useNavigate } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model"
import { Button, Card, Carousel, Image } from "react-bootstrap";
import undefineImage from "../../Assets/undefine-card-img.jpg";
import { toUpperCase } from "../../Utils/helpers";

interface PhoneCardProps {
  phone: PhoneModel;
};

const PhoneCard = (props: PhoneCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: '15rem' }}
      className="m-1 p-1 w-auto text-decoration-none mb-3"
    >
      {!props.phone?.picture ? (
        <Image src={undefineImage} height='200' alt={"undefine image"} />
      ) : (
        <div style={{ width: '200px'}}>
          <Carousel variant="dark">
            <Carousel.Item className="mr-2">
              <Card.Img src={props.phone?.picture} height='200' alt={`${props.phone?.name + 'ImageURL'}`} />
            </Carousel.Item>
            <Carousel.Item className="mr-2">
              <Card.Img src={props.phone?.picture} height='200' alt={`${props.phone?.name + 'ImageURL'}`} />
            </Carousel.Item>
          </Carousel>
        </div>
      )}
      <Card.Title className="mt-2">{toUpperCase(props.phone?.name)}</Card.Title>
      <Button
        size="sm"
        variant="light"
        onClick={() => navigate(`/phone/${props.phone._id}`)}
      >
        See Product
      </Button>
    </Card>
  );
};

export default PhoneCard;