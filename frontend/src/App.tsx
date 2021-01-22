import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import RequestPasswordPage from './features/auth/RequestPasswordPage';
import UpdatePasswordPage from "./features/auth/UpdatePasswordPage";

import RecordsPage from './features/records/RecordsPage';
import AddRecordPage from "./features/records/AddRecordPage";

import DashboardRoute from "./DashboardRoute";
import './App.css';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/auth/login" component={LoginPage} />
                <Route exact path="/auth/register" component={RegisterPage} />
                <Route exact path="/auth/reset" component={RequestPasswordPage} />
                <Route exact path="/auth/set-password/:token" component={UpdatePasswordPage} />

                <DashboardRoute exact path="/dashboard/records/list" component={RecordsPage} />
                <DashboardRoute exact path="/dashboard/records/add" component={AddRecordPage} />
                <Redirect path="/" to="/dashboard/records/list" />
            </Switch>
        </div>
    );
}

export default App;
