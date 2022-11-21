import { useState, useCallback, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import brandsServices from "../../Services/BrandsServices";

interface OthersBrandsProps {
      brandId: string;
}

const OthersBrands = (props: OthersBrandsProps) => {
      const [othersBrands, setOthersBrands] = useState<BrandModel[]>();

      const getOthersBrands = useCallback(async () => {
            const allBrands = await brandsServices.getAllBrands();
            const othersBrands = allBrands.filter(brand => brand.brandId !== props.brandId);
            setOthersBrands(othersBrands);
      }, [props.brandId]);

      useEffect(() => {
            getOthersBrands();
      }, [getOthersBrands]);

      return (
            <>
                  {othersBrands?.map(brand =>
                        <Card key={brand?.brandId} style={{ width: '12rem' }} className='m-1' as={NavLink} to={`/brands/${brand?.brandId}`}>

                              <Card.Img variant="top" height='150px' src={brand?.img} alt={brand?.brand + ' ImageURL'} />

                              <Card.Body>
                                    <Button size='sm' variant="dark">
                                          See Products
                                    </Button>
                              </Card.Body>
                        </Card>

                  )}
            </>
      )
}

export default OthersBrands;