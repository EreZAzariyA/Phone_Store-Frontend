import { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Auth-Area/Login';
import Register from './Components/Auth-Area/Register';
import OneBrand from './Components/Brands-Area/OneBrand';
import Header from './Components/Layout-Area/Header';
import BrandsPage from './Components/Home-Area/BrandsPage';
import CartPage from './Components/Cart-Area/CartPage';
import HomePage from './Components/Home-Area/HomePage';
import PhoneDetails from './Components/Phones-Area/PhonePage';
import { BrandModel } from './Models/brand-model';
import { PhoneModel } from './Models/phone-model';
import UserModel from './Models/user-model';
import { authStore, store } from './Redux/Store';
import brandsServices from './Services/BrandsServices';
import phonesServices from './Services/PhonesServices';

function App() {
  const [user, setUser] = useState<UserModel>();
  const [phones, setPhones] = useState<PhoneModel[]>();
  const [brands, setBrands] = useState<BrandModel[]>();

  const getDate = useCallback(async () => {
    const phones = await phonesServices.getAllPhones();
    setPhones(phones);

    const brands = await brandsServices.getAllBrands();
    setBrands(brands);

    const subscribe = store.subscribe(() => {
      setPhones(store.getState().phones);
      setBrands(store.getState().brands);
    });

    return () => subscribe();
  }, []);

  const getUser = useCallback(() => {
    const user = authStore.getState().user;
    setUser(user);
    const unsubscribe = authStore.subscribe(() => {
      const user = authStore.getState().user;
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getUser();
    getDate();
  });


  return (
    <Container fluid>
      <Row as='header'>
        <Header user={user} />
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


export const myLorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dolore eveniet nesciunt autem adipisci doloremque corrupti sequi laboriosam aperiam, nam illo blanditiis accusamus? Nostrum molestias corporis excepturi? Ipsam, perferendis reiciendis.';