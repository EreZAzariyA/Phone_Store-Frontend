import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import storeServices from "../../../Services/StoreServices";
import "./OrderPage.css";

function OrderPage(): JSX.Element {


    const getData = async () => {
        await storeServices?.getAllPhones();
    }
    useEffect(() => {
        getData(); 
    },[])

    return (
        <Container fluid>
            <h1>Order Page</h1>
            <Row>

            </Row>
        </Container>
    );
}

export default OrderPage;
