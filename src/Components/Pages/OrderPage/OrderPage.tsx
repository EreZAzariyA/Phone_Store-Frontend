import { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import storeServices from "../../../Services/StoreServices";
import "./OrderPage.css";

function OrderPage(): JSX.Element {


    const getData = async () => {
        await storeServices?.getAllPhones();
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <Container>
            <h1>Order Page</h1>
            <Row>
                <Col sm={6}>
                    <Form>
                        <Form.FloatingLabel 
                            label={"Address"}
                            className="mb-3">
                            <Form.Control type="text" placeholder="Address"/>
                            </Form.FloatingLabel>
                    </Form>
                </Col>
                <Col sm={6}>
                    <h1>b</h1>

                </Col>
            </Row>
        </Container>
    );
}

export default OrderPage;
