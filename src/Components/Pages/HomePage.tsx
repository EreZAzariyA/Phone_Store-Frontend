import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import img from "../../Assets/iPhone-14.jpg";
import moreImg from "../../Assets/Galaxy-S22-Ultra.jpg";
import { NavLink } from "react-router-dom";
import BrandCard from "../Brands-Area/BrandCard";

interface HomePageProps {
    brands: BrandModel[];
    phones: PhoneModel[];
}

function HomePage(props: HomePageProps): JSX.Element {

    return (
        <Container fluid>
            <Row style={{ backgroundColor: 'black' }}>
                <Carousel variant="light">
                    <Carousel.Item>
                        <Image height='300' src={img} alt='' className='w-100' />
                        <Carousel.Caption style={{ position: 'absolute', top: '50%', right: 'auto' }}>
                            <p>iPhone-14</p>
                            <NavLink to='/'>
                                <Button variant="light">
                                    Buy Now
                                </Button>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image height='300' src={moreImg} alt='' className='w-100' />
                    </Carousel.Item>
                </Carousel>
            </Row>

            <Row className="pt-2 w-75 m-auto">
                <Row>
                    {props.brands?.map(brand =>
                        <Col key={brand?.brandId} xs='12' sm='6' md='4' xl='3' >
                            <BrandCard brand={brand} />
                        </Col>
                    )}
                </Row>
            </Row>
        </Container>
    );
}

export default HomePage;
