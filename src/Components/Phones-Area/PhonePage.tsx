import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ItemInCartModel from "../../Models/item-in-cart model";
import Role from "../../Models/role";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import undefineImage from "../../Assets/undefine-card-img.jpg";
import OthersPhones from "./OthersPhones";
import { myLorem, numberWithCommas } from "../../Utils/helpers";
import { message } from "antd";
import { Button, Carousel, Col, Container, Image, InputGroup, Row } from "react-bootstrap"
import { FcOk } from "react-icons/fc";

const PhonePage = () => {
  const { phoneId } = useParams();
  const navigate = useNavigate();
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const phones = useSelector((state: RootState) => state.store.phones);
  const [amount, setAmount] = useState<number>(1);
  const phone = phones?.find((p) => p._id === phoneId);
  const isInCart = shoppingCart.products?.find((phone) => phone.phone_id === phoneId);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.roleId === Role.Admin) || false;

  const plus = () => {
    if (amount >= 10) {
      return;
    }
    setAmount(amount + 1);
  };

  const minus = () => {
    if (amount === 0) {
      return;
    }
    setAmount(amount - 1);
  };

  const addToCart = async () => {
    if (!shoppingCart._id) {
      navigate('/auth/login');
      message.info('Please login first');
      return;
    }

    const item = {
      cart_id: shoppingCart._id,
      phone_id: phoneId,
      amount,
      total_price: (phone.price || 0) * amount
    };
    const itemToAdd = new ItemInCartModel(item);
    
    try {
      if (!isInCart && itemToAdd.amount > 0) {
        await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const AddToCartButton = () => (
    <>
      {!isInCart ? (
        <Button size="sm" className="p-1" variant='dark' onClick={addToCart}>
          Add To Cart
        </Button>
      ) : (
        <Button size="sm" className="p-1" variant='success'>
          In-Cart <FcOk />
        </Button>
      )}
    </>
  );

  return (
    <Container fluid>
      <Row className="m-1 mt-2 mb-2 justify-content-start text-start">
        <Col>
          <NavLink className='text-decoration-none' to={`/brands/${phone?.brand_id}`}>
            Go Back
          </NavLink>
        </Col>
      </Row>

      <Container fluid style={{ maxHeight: '500px'}}>
        <Row>
          {/* Image-carousel */}
          <Col sm='6' xs='12'>
            {!phone?.picture ? (
              <Image src={undefineImage} width='60%' alt={"undefine image"} />
            ) : (
              <Carousel variant="dark">
                <Carousel.Item>
                  <Image src={phone?.picture} style={{ objectFit: 'cover', height: '100%' }} alt={`${phone?.name + 'ImageURL'}`} />
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={phone?.picture} style={{ objectFit: 'cover', height: '100%' }} alt={`${phone?.name + 'ImageURL'}`} />
                </Carousel.Item>
              </Carousel>
            )}
          </Col>

          {/* Phone details */}
          <Col sm='6' xs='12' className='ml-3 d-flex flex-column align-items-start text-start'>
            <h2>
              {!phone?.name ? (
                <p className="w-50 placeholder placeholder-wave placeholder-xs" />
              ) : (phone?.name)}
            </h2>

            <div className="text-muted pt-2 pb-2">
              {phone?.description ? (
                <span>
                  {phone.description + " Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita ut, deleniti reiciendis nisi unde quod"}
                </span>
              ) : (
                <>
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                </>
              )}
            </div>

            <h5 className="pt-2 pb-2 fw-bolder">
              {phone?.price ? (
                <span style={{ fontFamily: 'sans-serif' }}>{"$ " + numberWithCommas(phone.price)}</span>
              ) : (
                <p className="w-25 placeholder placeholder-wave placeholder-xs" />
              )}
            </h5>
            {!isAdmin && (
              <Row className="w-100 h-100 text-center align-items-end">
                {!isInCart && (
                  <Col>
                    <InputGroup size="sm">
                      <Button variant="success" onClick={plus}>+</Button>
                      <InputGroup.Text>{amount}</InputGroup.Text>
                      <Button variant='danger' onClick={minus} disabled={amount === 1}>-</Button>
                    </InputGroup>
                  </Col>
                )}
                <Col>
                  <AddToCartButton />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <hr className="mt-4 mb-4" />
        <Row className="mt-3 m-auto">
          <Col md='8'>
            <h3 className="text-decoration-underline">Description</h3>
            <Row className="text-sm-start">
              {phone?.description + " " + myLorem}
              <br />
              <br />
              {myLorem}
            </Row>
          </Col>
          <Col md='4' className="mt-3">
            <h3 className="text-decoration-underline">In The Box</h3>
          </Col>
        </Row>

        <hr className="mt-2" />
        {/* Others phones */}
        <Row>
          <Container className="w-auto">
            <Row>
              <h2>You May Also Like</h2>
            </Row>
            <Row className="flex-nowrap justify-content-center overflow-auto">
              <OthersPhones phone={phone} />
            </Row>
          </Container>
        </Row>
      </Container>
    </Container>
  );
};

export default PhonePage;
