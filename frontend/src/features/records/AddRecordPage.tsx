import React, { FormEvent, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useHistory } from "react-router-dom";
import { post } from '../../app/api';
import {mutations} from "../../requests";

export default function AddRecordPage() {

    const token = useSelector((state: RootState) => state.auth.token);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [typing, setTyping] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        setTyping(false);
        setError(null);

        post(mutations.addRecord(title, description), token)
            .then(() => {
                history.push('/dashboard/records/list');
            })
            .catch((err) => {
                setError(err.message || 'Invalid data. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (

        <div>
            <h2>Add Record <Link to={`/dashboard/records/list`} className="btn btn-primary ml-auto">View list</Link></h2>

            <p className="mb-5">Use the form below to create a new record.</p>

            <div className="card">
                <div className="card-header">
                    Record Details
                </div>

                <div className="card-body">
                    <form className="form pb-4" onSubmit={submitForm}>
                        <p className="text-danger font-weight-bold mt-3 mb-4">{(error && !typing) ? error : '\u00A0'}</p>

                        <div className="form-group">
                            <label htmlFor="inputTitle">Title</label>
                            <input type="text" id="inputTitle" className="form-control" autoComplete="off"
                                   placeholder="Enter a valid title" onChange={(e) => {
                                setTyping(true);
                                setTitle(e.target.value);
                            }} required autoFocus />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputDescription">Description</label>
                            <input type="text" id="inputDescription" className="form-control" autoComplete="off"
                                   placeholder="Enter a valid description" onChange={(e) => {
                                setTyping(true);
                                setDescription(e.target.value);
                            }} required />
                        </div>

                        <div className="clearfix text-right">
                            <button className="btn btn-lg btn-info my-2 ml-auto" disabled={loading} type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
