import { Col, Container, Form, Row } from "react-bootstrap";
import { SyntheticEvent, useEffect, useState } from "react"
import "./HomePage.css";
import { BrandModel } from "../../../Models/brand-model";
import { PhoneModel } from "../../../Models/phone-model";
import storeServices from "../../../Services/StoreServices";
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

    const searchInput = async (e: SyntheticEvent) => {
        const searchInputValue = (e.target as HTMLInputElement).value;
        const searchInputNewValue = searchInputValue.charAt(0).toUpperCase() + searchInputValue.slice(1);


        const phonesBySearch = phones?.filter(p =>
            p.name.startsWith(searchInputNewValue)
        )
        setPhones(phonesBySearch);

        if (searchInputValue === "") {
            const phones = await storeServices.getAllPhones();
            setPhones(phones);
        }

    }


    return (
        <Container fluid className="main">
            {/* Inputs container */}
            <Container fluid>
                <Row>
                    {/* Brand input */}
                    <Col xxl={'6'} xl={'6'} lg={'6'} md={'6'} sm={'12'} xs={'12'} xxs={'12'}>
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

                    {/* Search input */}
                    <Col xxl={'6'} xl={'6'} lg={'6'} md={'6'} sm={'12'} xs={'12'} xxs={'12'}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                placeholder="Search your phone"
                                onChange={searchInput}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            {/* Main home list */}
            <Container fluid className="list">
                <Row>
                    {/* If phones is still loading from the server */}
                    {phones === undefined &&
                        <>
                            <Col xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                                <UndefineCard />
                            </Col>
                            <Col xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                                <UndefineCard />
                            </Col>
                            <Col xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                                <UndefineCard />
                            </Col>
                        </>
                    }

                    {/* Phones list*/}
                    {phones?.map(phone =>
                        <Col key={phone.phoneId} xxl={'auto'} xl={'auto'} md={'auto'} sm={'auto'} xs={'auto'} xxs={'auto'}>
                            <PhoneCard phone={phone} />
                        </Col>
                    )}
                </Row>
            </Container>
        </Container>
    );
}

export default HomePage;
