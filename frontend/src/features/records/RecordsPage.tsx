import React, {useMemo} from 'react';
import {shallowEqual, useSelector} from "react-redux";

import { RootState } from "../../app/store";
import Spinner from '../../components/Spinner';
import { Link } from "react-router-dom";
import { queries } from "../../requests";
import useApiQuery from "../../hooks/useApiQuery";

export default function RecordsPage() {

    const token = useSelector((state: RootState) => state.auth.token, shallowEqual);
    const fetchRecords = useMemo(() => queries.records(), []);
    const [records, loading] = useApiQuery(fetchRecords, token);

    if (loading) {
        return (<Spinner />);
    }

    return (
        <div>
            <h2>Records <Link to="/dashboard/records/add" className="btn btn-primary ml-auto">Add</Link></h2>

            <p className="mb-5">A list of records. To add a new record, click on the blue "Add" button (see above).</p>

            <div className="table-responsive-md">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Added by</th>
                    </tr>
                    </thead>

                    <tbody>
                    {(records as any[]).map(record => (
                        <tr key={record.id}>
                            <td>{record.id}.</td>
                            <td>{record.title}</td>
                            <td>{record.description}</td>
                            <td>{record.account.name}</td>
                        </tr>
                    ))}

                    {(records.length === 0) ? <tr>
                        <td colSpan={4} className="text-center font-weight-bold py-5">No records found. Please
                            create one.
                        </td>
                    </tr> : ''}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
