import { Breadcrumb, Button, ButtonGroup, Card, Carousel, Col, Container, Modal, Placeholder, Row } from "react-bootstrap";
import "./PhoneDetails.css";
import { useState, useEffect } from "react";
import { PhoneModel } from "../../../Models/phone-model";
import { NavLink, useParams } from "react-router-dom";
import { store } from "../../../Redux/Store";
import storeServices from "../../../Services/StoreServices";
import { BrandModel } from "../../../Models/brand-model";

function PhoneDetails(): JSX.Element {
    const params = useParams();
    const [phone, setPhone] = useState<PhoneModel>();
    const [show, setShow] = useState(false);
    const [brand, setBrand] = useState<BrandModel>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getBrandName = (brandId: string) => {
        const brands = store.getState().brands;
        return brands?.find(b => b.brandId === brandId)?.brand;
    }

    useEffect(() => {
        const getData = async () => {
            const phoneId = params.phoneId;
            const phones = store.getState().phones
            const phone = phones?.find(phone => phone.phoneId === phoneId);
            setPhone(phone);
        }
        getData();

        const unsubscribe = store.subscribe(() => {
            getData();
        });

        return () => unsubscribe();

    }, [params]);

    return (
        <Container>
            <Row>
                <Col xxl={'2'} xl={'2'} lg={'2'} md={'2'} sm={'2'} xs={'2'} xxs={'2'}>
                    <NavLink to={"/"}>
                        <Button className="btn-sm" variant="secondary">
                            Back
                        </Button>
                    </NavLink>
                </Col>
                <Col xxl={'10'} xl={'10'} lg={'10'} md={'10'} sm={'10'} xs={'10'} xxs={'10'}>
                    <h2>{phone?.name}</h2>
                </Col>
            </Row>

            <Row>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{phone?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>Set Stock To Order</Modal.Title>
                    <ButtonGroup>
                        <Button variant="success">
                            <strong>+</strong>
                        </Button>
                        <Button variant="danger">
                            <strong>–</strong>
                        </Button>
                    </ButtonGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default PhoneDetails;
