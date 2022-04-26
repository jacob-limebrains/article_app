import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {CookiesProvider} from "react-cookie";

import 'bootstrap/dist/css/bootstrap.min.css'

import Login from "./components/Login";

import App from './App';

const Routers = () => {
    return (
        <CookiesProvider>
            <Router>
                <Route exact path='/' component={Login}/>
                <Route exact path='/articles' component={App}/>
            </Router>
        </CookiesProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Routers/>
    </React.StrictMode>
);