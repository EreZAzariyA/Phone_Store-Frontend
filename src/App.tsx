import React, { useMemo, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Auth-Area/Login';
import Register from './Components/Auth-Area/Register';
import OneBrand from './Components/Brands-Area/OneBrand';
import Header from './Components/Layout-Area/Header';
import BrandsPage from './Components/Pages/BrandsPage';
import CartPage from './Components/Pages/CartPage';
import HomePage from './Components/Pages/HomePage';
import PhoneDetails from './Components/Phones-Area/PhoneDetails';
import { BrandModel } from './Models/brand-model';
import { PhoneModel } from './Models/phone-model';
import UserModel from './Models/user-model';
import { store } from './Redux/Store';
import storeServices from './Services/StoreServices';

function App() {
  const [user, setUser] = useState<UserModel>();
  const [phones, setPhones] = useState<PhoneModel[]>();
  const [brands, setBrands] = useState<BrandModel[]>();

  useMemo(async () => {
    const phones = await storeServices.getAllPhones();
    setPhones(phones);

    const brands = await storeServices.getAllBrands();
    setBrands(brands);

    const unsubscribe = store.subscribe(() => {
      const phones = store.getState().phones;
      setPhones(phones);

      const brands = store.getState().brands;
      setBrands(brands);
    });
    return () => unsubscribe();
  }, []);


  return (
    <Container fluid>
      <Row as='header'>
        <Header />
      </Row>

      <Row>
        <Routes>
          <Route path='/' element={<HomePage brands={brands} phones={phones} />} />
          <Route path='/brands' element={<BrandsPage />} />
          <Route path='/brands/:brandId' element={<OneBrand />} />
          <Route path='/brands' element={null} />
          <Route path='/phone/:phoneId' element={<PhoneDetails />} />
          <Route path='/cart' element={<CartPage />} />

          {!user &&
            <>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/register' element={<Register />} />
            </>
          }

        </Routes>

      </Row>

      <Row as='footer' style={{ color: 'white' }}>
        {/* <Footer /> */}
        Footer
      </Row>


    </Container>
  );
}

export default App;
