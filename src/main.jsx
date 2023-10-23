import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AuthContextProvider from "./contexts/AuthContext";
import { MainProvider } from './contexts/MainContext.jsx';
import { Provider } from 'react-redux';
import store from "./redux/store/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MainProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MainProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
