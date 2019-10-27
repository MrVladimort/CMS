import * as React from 'react';
import {Route} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "./assets/css/default.min.css";
import "semantic-ui-css/semantic.min.css";
import "react-datepicker/dist/react-datepicker.css";

import PrivateRoute from "./components/utilComponents/PrivateRoute";
import AdminRoute from "./components/utilComponents/AdminRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import UserPage from "./components/pages/UserPage";
import ConfirmEmailPage from "./components/pages/ConfirmEmailPage";

const App = ({location, dispatch, history}: any) => (
    <div className="reactBody">
        <Header location={location} dispatch={dispatch} history={history}/>
        <div className="content">
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/confirm-email" exact component={ConfirmEmailPage}/>

            <PrivateRoute path="/user" exact component={UserPage}/>
        </div>
        <Footer/>
    </div>
);

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(App);
