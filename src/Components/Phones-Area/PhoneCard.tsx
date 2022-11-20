import { Button, Card, Carousel, Col, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model"

interface PhoneCardProps {
      phone: PhoneModel;
}
const PhoneCard = (props: PhoneCardProps) => {
      return (
            <Card className="m-1" as={Col} xl='3' lg='3' md='5' >
                  <Card.Img variant='top' as='div'>
                        <Carousel variant="dark">
                              <Carousel.Item>
                                    <Image width='100%' src={props.phone.picture} alt={props.phone.name + ' imageURL'} />
                              </Carousel.Item>
                              <Carousel.Item>
                                    <Image width='100%' src={props.phone.picture} alt={props.phone.name + ' imageURL'} />
                              </Carousel.Item>
                        </Carousel>
                  </Card.Img>

                  <Card.Title>
                        {props.phone?.name}
                  </Card.Title>

                  <Row className="m-auto">
                        <NavLink to={`/phone/${props.phone.phoneId}`}>
                              <Button size="sm" variant="dark" className="mb-2">
                                    See Product
                              </Button>
                        </NavLink>

                  </Row>

            </Card>
      )
}

export default PhoneCard;