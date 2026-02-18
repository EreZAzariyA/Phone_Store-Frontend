import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from './Redux/Store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import interceptorsService from './Services/InterceptorsService';

interceptorsService.createInterceptors();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture"
      }}>
        <BrowserRouter>
          <ThemeProvider
            breakpoints={['xxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xs"
          >
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
