export default function signIn(email: string, password: string): { query: string, variables: object } {
    return ({
        query: `
            mutation SignIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                    token
                }
            }`,

        variables: {
            email, password
        }
    });
}
