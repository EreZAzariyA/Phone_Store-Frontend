import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "./AddPhonePage.css";
import { useState, useEffect } from "react";
import { BrandModel } from "../../../Models/brand-model";
import storeServices from "../../../Services/StoreServices";
import { store } from "../../../Redux/Store";
import { useForm } from "react-hook-form";
import { PhoneModel } from "../../../Models/phone-model";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function AddPhonePage(): JSX.Element {

    const [brands, setBrands] = useState<BrandModel[]>();
    const { register, handleSubmit } = useForm<PhoneModel>();
    const navigate = useNavigate();

    const getData = async () => {
        const brands = await storeServices.getAllBrands();
        setBrands(brands);

        const unsubscribe = store.subscribe(() => {
            const brands = store.getState().brands;
            setBrands(brands);
        });
        return () => unsubscribe();
    }

    const submit = async (phone: PhoneModel) => {
        try {
            await storeServices.addNewPhone(phone);
            notifyService.success("Added");
            navigate('/')
        } catch (err: any) {
            alert(err.message);
        }

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            <h1>
                Add New Phone
            </h1>
            <Form className="w-50" style={{ margin: 'auto' }} onSubmit={handleSubmit(submit)}>

                <FloatingLabel
                    label="Phone Name"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Samsung Galaxy" required {...register("name")} />
                </FloatingLabel>


                <FloatingLabel label={"Select Brand"} className="mb-3" >
                    <Form.Select defaultValue="" required {...register("brandId")}>
                        <option value="" disabled>Select...</option>
                        {brands?.map(brand =>
                            <option key={brand.brandId} value={brand.brandId}>{brand.brand}</option>
                        )}
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                    label="Phone Description"
                    className="mb-3"
                >
                    <Form.Control as="textarea" placeholder="Phone description" required {...register("description")} />
                </FloatingLabel>

                <FloatingLabel
                    label="Phone Rating"
                    className="mb-3"
                >
                    <Form.Control type="number" max={5} min={1} placeholder="Set phone rating" required {...register("rating")} />
                </FloatingLabel>

                <FloatingLabel
                    label="Phone Price"
                    className="mb-3"
                >
                    <Form.Control type="number" max={10000} min={99} placeholder="Set phone price" required {...register("price")} />
                </FloatingLabel>

                <FloatingLabel
                    label="Phone Image"
                    className="mb-3"
                >
                    <Form.Control type={'url'} max={5} min={0} placeholder="Samsung Galaxy" required {...register("picture")} />
                </FloatingLabel>

                <Button variant="success" type="submit">Add</Button>
            </Form>
        </Container>
    );
}

export default AddPhonePage;
