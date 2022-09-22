import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { SyntheticEvent, useEffect, useState } from "react"
import "./HomePage.css";
import { BrandModel } from "../../../Models/brand-model";
import { PhoneModel } from "../../../Models/phone-model";
import storeServices from "../../../Services/SocialServices";
import PhoneCard from "../../Phones-Area/PhoneCard/PhoneCard";
import UndefineCard from "../../Phones-Area/undefineCard/undefineCard";

function HomePage(): JSX.Element {

    const [phones, setPhones] = useState<PhoneModel[]>();
    const [brands, setBrands] = useState<BrandModel[]>();

    const getData = async () => {
        const phones = await storeServices.getAllPhones();
        setPhones(phones);

        const brands = await storeServices.getAllBrands();
        setBrands(brands);
    }

    useEffect(() => {
        getData();
    }, []);

    const getPhonesByBrandId = async (e: SyntheticEvent) => {
        const brandId = (e.target as HTMLInputElement).value;
        if (brandId === "") {
            const phones = await storeServices.getAllPhones();
            setPhones(phones);
        } else {
            const phonesByBrandId = await storeServices.getPhonesByBrandId(brandId);
            setPhones(phonesByBrandId);
        }
    }


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Select defaultValue={""} onChange={getPhonesByBrandId}>
                                <option disabled>Select brand</option>
                                <option value="">Any</option>
                                {brands?.map(brand =>
                                    <option value={brand.brandId} key={brand.brandId}>{brand.brand}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                placeholder="Search your phone"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row className="list">
                    {phones === undefined &&
                        <Row>
                            <Col xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                                <UndefineCard />
                            </Col>
                            <Col xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                                <UndefineCard />
                            </Col>
                            <Col xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                                <UndefineCard />
                            </Col>
                        </Row>
                    }

                    {phones?.map(phone =>
                        <Col key={phone.phoneId} xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                            <PhoneCard phone={phone} />
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
