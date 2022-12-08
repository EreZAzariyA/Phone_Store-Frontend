import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './Redux/Store';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider
        breakpoints={['xxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xs"
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>


);

export function getBrandName(brandId: string) {
  const brands = store.getState().brands
  return brands?.find(b => b.brandId === brandId)?.brand;
}

export function numberWithCommas(x: number) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

reportWebVitals();
