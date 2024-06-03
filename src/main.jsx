import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ApiProvider} from "@reduxjs/toolkit/query/react";
import store from "./store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApiProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </ApiProvider>
    </React.StrictMode>,
)
