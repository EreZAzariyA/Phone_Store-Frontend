import { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Carousel, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { numberWithCommas } from "../..";
import { PhoneModel } from "../../Models/phone-model";
import storeServices from "../../Services/StoreServices";
import undefineImage from "../../Assets/undefine-card-img.jpg";

const PhoneDetails = () => {

      const [phone, setPhone] = useState<PhoneModel>();
      const params = useParams();

      useEffect(() => {
            const phoneId = params.phoneId;
            getPhoneById(phoneId);
      });

      const getPhoneById = useCallback(async (phoneId: string) => {
            const phone = await storeServices.getOnePhone(phoneId);
            setPhone(phone);
            phone.memorySizes = ['512', '256', '128', '64']
      }, []);

      return (
            <Container>
                  <Row className="mt-2 mb-2">
                        <Col sm='2'>
                              <NavLink className='text-decoration-none' to={`/brands/${phone?.brandId}`}>
                                    Go Back
                              </NavLink>
                        </Col>
                  </Row>

                  <Row>
                        <Col sm='6' xs='6'>
                              <Carousel variant="dark" style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}>
                                    <Carousel.Item>
                                          {
                                                phone?.picture &&
                                                <Image src={phone?.picture} width='80%' alt={`${phone?.name + 'ImageURL'}`} />
                                          }
                                          {phone?.picture === undefined && <Image src={undefineImage} alt={"undefine image"} />
                                          }
                                    </Carousel.Item>
                              </Carousel>
                        </Col>

                        <Col sm='6' sx='6' className=""
                              style={{ textAlign: 'justify' }}>
                              <h2>
                                    {phone?.name}
                                    {phone?.name === undefined &&
                                          <p className="w-50 placeholder placeholder-wave placeholder-xs" />
                                    }
                              </h2>

                              <div className="text-muted pt-2 pb-2">
                                    {
                                          phone?.description &&
                                          phone?.description + " Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita ut, deleniti reiciendis nisi unde quod"
                                    }
                                    {
                                          phone?.description === undefined &&
                                          <>
                                                <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                                                <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                                                <p className="w-75 placeholder placeholder-wave placeholder-xs" /><p className="w-75 placeholder placeholder-wave placeholder-xs" />
                                          </>
                                    }
                              </div>

                              <h6 className="pt-2 pb-2">
                                    {"$ " + numberWithCommas(phone?.price)}
                                    {phone?.price === undefined &&
                                          <p className="w-25 placeholder placeholder-wave placeholder-xs" />
                                    }
                              </h6>

                              <Form className="pt-2 pb-5">
                                    {phone?.memorySizes?.map(size =>
                                          <Form.Check
                                                inline
                                                label={size + 'gb'}
                                                type="radio"
                                                name={phone?.phoneId}
                                                key={size}
                                          >
                                          </Form.Check>
                                    )}
                              </Form>

                              <Row className=" w-75 m-auto">
                                    <Col sm='6'>
                                          <InputGroup size="sm">
                                                <Button variant="success">+</Button>
                                                <InputGroup.Text>{0}</InputGroup.Text>
                                                <Button variant='danger'>-</Button>
                                          </InputGroup>
                                    </Col>
                                    <Col sm='6'>
                                          <Button size="sm" variant='dark'>
                                                Add To Cart ✔
                                          </Button>
                                    </Col>
                              </Row>
                        </Col>
                  </Row >
            </Container >
      )
}

export default PhoneDetails;