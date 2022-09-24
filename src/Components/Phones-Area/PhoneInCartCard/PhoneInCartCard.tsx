import ItemInCartModel from "../../../Models/item-in-cart model";
import "./PhoneInCartCard.css";
import { useState, useEffect, useCallback } from "react"
import { PhoneModel } from "../../../Models/phone-model";
import storeServices from "../../../Services/StoreServices";
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
        <div className="PhoneInCartCard">
            <p>{phone?.name}</p>
        </div>
    );
}

export default PhoneInCartCard;
