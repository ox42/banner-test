import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AuthLinks.module.css';

const AuthLinks = (props: { current: string }) => (
    <div className={classes.AuthLinks}>

        {props.current !== 'login' &&
            <Link to='/auth/login'>Already have an account? Login.</Link>}

        {props.current !== 'register' &&
            <Link to='/auth/register'>No account? Register now!</Link>}

        {props.current !== 'reset' &&
            <Link to='/auth/reset'>Forgot your password?</Link>}
    </div>
)

export default AuthLinks;
