export default function resetPasswordWithToken(password: string, token: string): { query: string, variables: object } {
    return ({
        query: `
            mutation ResetPasswordWithToken($password: String!, $token: String!) {
                resetPasswordWithToken(password: $password, token: $token) {
                    token
                }
            }`,

        variables: {
            password, token
        }
    });
}
