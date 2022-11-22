import { Button, Card, Carousel, Container, Image, Row } from "react-bootstrap";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import img from "../../Assets/iPhone-14.jpg";
import moreImg from "../../Assets/Galaxy-S22-Ultra.jpg";
import { NavLink } from "react-router-dom";
import TopThreeProducts from "./TopPhones";
import TopBrands from "./TopBrands";
import { FcNext } from "react-icons/fc";

interface HomePageProps {
    brands: BrandModel[];
    phones: PhoneModel[];
}

function HomePage(props: HomePageProps): JSX.Element {

    return (
        <Container style={{ fontFamily: 'Crimson Pro, serif' }}>
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

            <Row className="pt-2 mb-2">
                <Container>
                    <Row>
                        <TopThreeProducts />
                    </Row>
                    <Row>
                        <TopBrands />
                    </Row>
                </Container>

            </Row>

            <Row>
                <Container>
                    <h1>Our Top Brands</h1>
                    <Row className="justify-content-center">
                        {props.brands?.map(brand =>
                            <Card key={brand?.brandId} style={{ width: '15rem' }} className="m-1">
                                <Card.Img variant="top" height={'150'} src={brand?.img} />

                                <Card.Body>
                                    <NavLink to={`/brands/${brand.brandId}`}>
                                        <Button variant="light">
                                            Shop <FcNext />
                                        </Button>
                                    </NavLink>
                                </Card.Body>
                            </Card>
                        )}
                    </Row>
                </Container>

            </Row>
        </Container>
    );
}

export default HomePage;
