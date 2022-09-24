import { Button, Card, Carousel, Col, Container, Placeholder, Row } from "react-bootstrap";
import "./PhoneDetails.css";
import { useState, useEffect, useCallback } from "react";
import { PhoneModel } from "../../../Models/phone-model";
import { NavLink, useParams } from "react-router-dom";
import storeServices from "../../../Services/StoreServices";
import MyModal from "../MyModal";

function PhoneDetails(): JSX.Element {
    const params = useParams();
    const [phone, setPhone] = useState<PhoneModel>();
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const getData = useCallback(async () => {
        const phoneId = params.phoneId;
        const phone = await storeServices.getOnePhone(phoneId);
        setPhone(phone);
    }, [params]);

    useEffect(() => {
        getData();
    }, [getData, params]);

    return (
        <Container>
            <Row>
                <Col xxl='2' xl='2' lg='2' md='2' sm='2' xs='2' xxs='2'>
                    <NavLink to="/">
                        <Button className="btn-sm" variant="secondary">
                            Back
                        </Button>
                    </NavLink>
                </Col>
                <Col xxl='10' xl='10' lg='10' md='10' sm='10' xs='10' xxs='10'>
                    <h2>{phone?.name}</h2>
                </Col>
            </Row>

            <Row>
                {/* image carousel */}
                <Col xxl='6' xl='6' lg='6' md='6' sm='12' xs='12'>
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <Card.Img variant="top" src={phone?.picture} className="img" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card.Img variant="top" src={phone?.picture} className="img" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card.Img variant="top" src={phone?.picture} className="img" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                {/* details */}
                <Col xxl='6' xl='6' lg='6' md='6' sm='12' xs='12'>
                    <Card style={{ height: '100%' }}>
                        <Card.Header>
                            <Card.Title>
                                {phone?.name}
                            </Card.Title>

                            {phone === undefined && <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xxl='12' xl='12' lg='12' md='12' sm='8' xs='8' />
                            </Placeholder>}

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>
                                    {phone?.description}
                                </strong>
                                <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo qui laboriosam delectus aut error placeat veritatis earum. Voluptatum vel nemo iusto natus. Vitae voluptas rem vel adipisci. Animi, aspernatur delectus.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="secondary" onClick={handleShow}>
                                Add To Cart
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <MyModal phone={phone} show={show} close={handleClose} save={handleClose} />
        </Container>
    );
}

export default PhoneDetails;
