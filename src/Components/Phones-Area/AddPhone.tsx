import { useCallback, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, FormFloating, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import brandsServices from "../../Services/BrandsServices";
import notifyService from "../../Services/NotifyService";
import phonesServices from "../../Services/PhonesServices";
import { errStyle } from "../Auth-Area/Register";

const style = {
      width: 'auto',
      margin: 'auto'
}

const AddPhone = () => {
      const [brands, setBrands] = useState<BrandModel[]>();
      const { register, handleSubmit, formState } = useForm<PhoneModel>();
      const navigate = useNavigate();

      const getAllBrands = useCallback(async () => {
            const brands = await brandsServices.getAllBrands();
            setBrands(brands);
      }, []);

      useEffect(() => {
            getAllBrands();
      });

      const submit = async (phone: PhoneModel) => {
            try {
                  await phonesServices.addNewPhone(phone);
                  notifyService.success("Phone Added Successfully");
                  navigate(`/phone/${phone.phoneId}`);
            } catch (err: any) {
                  notifyService.error(err);
            }
      };

      return (
            <FormFloating style={style} >

                  <h1>
                        Add Phone
                  </h1>

                  <FloatingLabel label={"Phone Name"} className="mt-3">
                        <Form.Control type="text" autoFocus required {...register('name', {
                              required: { value: true, message: "Phone-Name is missing" },
                              minLength: { value: 3, message: "Phone-Name must be minimum 3 chars" },
                              maxLength: { value: 50, message: "Phone-Name can't exceed 50 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.name?.message}
                        </span>
                  </FloatingLabel>


                  <FloatingLabel label={"Brand"} className="mt-3">
                        <Form.Select defaultValue='' required {...register('brandId', {
                              required: { value: true, message: "Brand is missing" }
                        })}>
                              <option value="" disabled>Select Brand...</option>
                              {brands?.map(brand =>
                                    <option
                                          key={brand?.brandId}
                                          value={brand?.brandId}>
                                          {brand?.brand}
                                    </option>
                              )}
                        </Form.Select>

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.name?.message}
                        </span>
                  </FloatingLabel>

                  <FloatingLabel label={"Description"} className="mt-3">
                        <Form.Control type="text" required {...register('description', {
                              required: { value: true, message: "Description is missing" },
                              minLength: { value: 3, message: "Description must be minimum 3 chars" },
                              maxLength: { value: 150, message: "Description can't exceed 150 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.description?.message}
                        </span>
                  </FloatingLabel>

                  <InputGroup className="mt-3 w-50 m-auto">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control required {...register('price', {
                              required: { value: true, message: "Price is missing" },
                              min: { value: 99, message: "Price must be minimum 99.00$" },
                              max: { value: 15000, message: "Price can't exceed 15,000.00$" }
                        })} />
                        <InputGroup.Text>.00</InputGroup.Text>

                  </InputGroup>
                  <span className="mb-2" style={errStyle}>
                        {formState.errors.price?.message}
                  </span>

                  <FloatingLabel label={"Picture URL"} className="mt-3 mb-2">
                        <Form.Control type="url" required {...register('picture', {
                              required: { value: true, message: "Picture URL is missing" },
                              minLength: { value: 3, message: "Picture URL must be minimum 3 chars" },
                              maxLength: { value: 150, message: "Picture URL can't exceed 150 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.picture?.message}
                        </span>
                  </FloatingLabel>

                  <Button type="submit" onClick={handleSubmit(submit)}>
                        Add
                  </Button>

            </FormFloating>
      )
}

export default AddPhone;