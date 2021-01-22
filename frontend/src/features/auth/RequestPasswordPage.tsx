import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { Redirect, Link } from "react-router-dom";

import classes from '../common/Form.module.css';
import {post} from "../../app/api";
import {mutations} from "../../requests";
import AuthLinks from "../common/AuthLinks";


export default function RequestPasswordPage() {
    const token = useSelector((state: RootState) => state.auth.token);

    const [email, setEmail] = useState<string>('');
    const [resetToken, setResetToken] = useState<string | null>(null);

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
        setLoading(true);
        setResetToken(null);

        post(mutations.requestResetToken(email))
            .then(json => {
                if (json && json.requestResetToken && json.requestResetToken.token) {
                    setResetToken(json.requestResetToken.token);
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
            <form className={classes.formAuth} onSubmit={submitForm}>

                <i className={classes.loginIcon + " bi bi-person-badge-fill"}></i>
                <h1 className="h3 mb-3 font-weight-normal">Reset password</h1>

                {resetToken
                    ? (
                        <div className="card text-center">
                            <div className="card-body">
                            <p className="text-danger font-weight-bold mt-3 mb-3">This is a demo project, so you won't get an actual reset token via email.</p>
                            <p className="mb-4">However, our backend system actually generated one, and an email would send you to this url next:</p>

                            <p><Link to={`/auth/set-password/${resetToken}`} className="btn btn-primary">Change password</Link></p>
                            </div>
                        </div>
                    )

                    : (<React.Fragment>
                        <p className="text-danger font-weight-bold mt-3 mb-4">{(error && !typing) ? error : '\u00A0'}</p>

                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className={"form-control " + classes.formField}
                               placeholder="Email address" onChange={(e) => {
                            setTyping(true);
                            setEmail(e.target.value);
                        }} required autoComplete="off" autoFocus />

                        <button className="btn btn-lg btn-primary btn-block" disabled={loading} type="submit">Submit
                        </button>
                    </React.Fragment>
                    )}



                <AuthLinks current="reset" />
            </form>
        </div>
    );
}
