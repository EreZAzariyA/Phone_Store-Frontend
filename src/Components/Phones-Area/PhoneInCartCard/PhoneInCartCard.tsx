import ItemInCartModel from "../../../Models/item-in-cart model";
import "./PhoneInCartCard.css";
import { useState, useEffect, useCallback } from "react"
import { PhoneModel } from "../../../Models/phone-model";
import storeServices from "../../../Services/StoreServices";
import { numberWithCommas } from "../../..";
import { Card } from "react-bootstrap";
interface PhoneInCartCardProps {
    phone: ItemInCartModel;
}

function PhoneInCartCard(props: PhoneInCartCardProps): JSX.Element {

    const [phone, setPhone] = useState<PhoneModel>()
        ;
    const getData = useCallback(async () => {
        const phone = await storeServices.getOnePhone(props.phone.phoneId);
        setPhone(phone);
    }, [props.phone.phoneId]);

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Card className="PhoneInCartCard" bg="light">
            <Card.Img variant="left" src={phone?.picture} />
            <Card.ImgOverlay>
                <Card.Title>
                    <h1>
                        {props?.phone?.stock}
                    </h1>
                </Card.Title>
            </Card.ImgOverlay>
        </Card>
    );
}

export default PhoneInCartCard;
