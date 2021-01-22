import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';

import './DashboardLayout.css';

function DashboardLayout(props: any) {
    const dispatch = useDispatch();

    function logoutUser(event: MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        dispatch(logout());
    }

    return (
        <div className="Dashboard">

            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/dashboard/departments/list">Awesome
                    Co.</Link>

                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="/auth/logout" onClick={logoutUser}><i
                            className="bi bi-door-closed" /> Sign out</a>
                    </li>
                </ul>
            </nav>

            <div className="container">
                <div className="row">
                    <main role="main" className="col-12 ml-md-auto mr-md-auto">
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
