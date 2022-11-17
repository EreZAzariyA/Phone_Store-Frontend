import React, { useMemo, useState } from 'react';
import { Container, Offcanvas, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import OneBrand from './Components/Brands-Area/OneBrand';
import Header from './Components/Layout-Area/Header';
import Sidenav from './Components/Layout-Area/Sidenav';
import BrandsPage from './Components/Pages/BrandsPage';
import HomePage from './Components/Pages/HomePage';
import PhoneDetails from './Components/Phones-Area/PhoneDetails';
import { BrandModel } from './Models/brand-model';
import { PhoneModel } from './Models/phone-model';
import { store } from './Redux/Store';
import storeServices from './Services/StoreServices';

function App() {
  const [phones, setPhones] = useState<PhoneModel[]>();
  const [brands, setBrands] = useState<BrandModel[]>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
        <Header sideNavTrigger={handleShow} />
      </Row>

      <Row>
        <Routes>
          <Route path='/' element={<HomePage brands={brands} phones={phones} />} />
          <Route path='/brands' element={<BrandsPage />} />
          <Route path='/brands/:brandId' element={<OneBrand />} />
          <Route path='/brands' element={null} />
          <Route path='/phone/:phoneId' element={<PhoneDetails />} />

        </Routes>

      </Row>

      <Row as='footer' style={{ color: 'white' }}>
        {/* <Footer /> */}
        Footer
      </Row>


      <Offcanvas placement='end' show={show} onHide={handleClose} >
        <Sidenav />
      </Offcanvas>
    </Container>
  );
}

export default App;
