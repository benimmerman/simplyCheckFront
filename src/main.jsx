import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './css/index.css'
import App from './App.jsx'
import { persistor, store } from "./state/store";
import { PersistGate } from "redux-persist/integration/react";
import axiosInstance from './services/axiosInstance.jsx'

axiosInstance.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
