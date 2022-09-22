import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react"
import "./HomePage.css";
import { BrandModel } from "../../../Models/brand-model";
import { PhoneModel } from "../../../Models/phone-model";
import storeServices from "../../../Services/SocialServices";

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
    }, [])


    return (
        <Container fluid>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Select defaultValue={""}>
                            <option value="" disabled>Select brand</option>
                            {brands?.map(brand =>
                                <option value={brand.brandId}>{brand.brandName}</option>
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
    );
}

export default HomePage;
