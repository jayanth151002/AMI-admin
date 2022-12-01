import React from "react";
import ReactDOM from "react-dom/client";
import 'antd/dist/reset.css';
import App from "./App";
import { Provider } from 'react-redux'
import store, { persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
