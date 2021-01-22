import recordsQuery from './queries/records';

import signInMutation from './mutations/sign-in';
import registerMutation from './mutations/register';
import requestResetTokenMutation from "./mutations/request-reset-token";
import resetPasswordWithTokenMutation from "./mutations/reset-password-with-token";
import addRecordMutation from './mutations/add-record';


//Deliberately not using apollo or any other client
//since we don't know if we are allowed to (for this demo)
export const queries = {
    records: recordsQuery
}

export const mutations = {
    signIn: signInMutation,
    register: registerMutation,
    requestResetToken: requestResetTokenMutation,
    resetPasswordWithToken: resetPasswordWithTokenMutation,
    addRecord: addRecordMutation
}
