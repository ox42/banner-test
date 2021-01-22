import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { Redirect } from "react-router-dom";
import {loginSuccess} from "./authSlice";

import classes from '../common/Form.module.css';
import {post} from "../../app/api";
import {mutations} from "../../requests";
import AuthLinks from "../common/AuthLinks";


export default function RegisterPage() {
    const token = useSelector((state: RootState) => state.auth.token);

    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [typing, setTyping] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    if (token) {
        return (<Redirect to='/dashboard/records/list' />);
    }

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setTyping(false);
        setError(null);

        if (password !== repeatPassword) {
            setError('The two passwords must match.');
            return ;
        }

        setLoading(true);
        post(mutations.register(name, email, password))
            .then(json => {
                if (json && json.register && json.register.token) {
                    dispatch(loginSuccess(json.register.token));
                } else {
                    setError('Invalid data. Please try again.');
                }
            })
            .catch((err) => {
                setError(err.message || 'Invalid data. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className={classes.AuthPage}>
            <form className={classes.formAuth + " " + classes.withDistance} onSubmit={submitForm}>

                <i className={classes.loginIcon + " bi bi-person-fill"}></i>
                <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

                <p className="text-danger font-weight-bold mt-3 mb-4">{(error && !typing) ? error : '\u00A0'}</p>

                <label htmlFor="inputName" className="sr-only">Full name</label>
                <input type="text" id="inputName" className={"form-control " + classes.formField}
                       placeholder="Your full name" onChange={(e) => {
                    setTyping(true);
                    setName(e.target.value);
                }} required autoComplete="off" autoFocus />

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className={"form-control " + classes.formField}
                       placeholder="Email address" onChange={(e) => {
                    setTyping(true);
                    setEmail(e.target.value);
                }} required autoComplete="off" />

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className={"form-control " + classes.formField}
                       placeholder="Password" onChange={(e) => {
                    setTyping(true);
                    setPassword(e.target.value);
                }} required />

                <label htmlFor="inputRepeatPassword" className="sr-only">Repeat</label>
                <input type="password" id="inputRepeatPassword" className={"form-control " + classes.formField}
                       placeholder="Repeat password" onChange={(e) => {
                    setTyping(true);
                    setRepeatPassword(e.target.value);
                }} required />

                <button className="btn btn-lg btn-primary btn-block" disabled={loading} type="submit">Submit
                </button>

                <AuthLinks current="register" />
            </form>
        </div>
    );
}
