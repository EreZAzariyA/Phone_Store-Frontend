import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BrandModel } from "../../../Models/brand-model";
import notifyService from "../../../Services/NotifyService";
import storeServices from "../../../Services/StoreServices";
import "./AddBrandPage.css";

function AddBrandPage(): JSX.Element {
    const { register, handleSubmit } = useForm<BrandModel>();
    const navigate = useNavigate();

    const submit = async (brand: BrandModel) => {
        try {
            brand.brandId = ""
            await storeServices.addNewBrand(brand);
            notifyService.success("Added");
            navigate("/");
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <Container>
            <h1>Add New Brand</h1>

            <Form className="w-50" style={{ margin: 'auto' }} onSubmit={handleSubmit(submit)}>

                <FloatingLabel
                    label="Brand"
                    className="mb-3">
                    <Form.Control type="text" placeholder="Apple" required {...register("brand")} />
                    
                </FloatingLabel>

                <Button variant="success" type="submit">Add</Button>
            </Form>
        </Container>
    );
}

export default AddBrandPage;
