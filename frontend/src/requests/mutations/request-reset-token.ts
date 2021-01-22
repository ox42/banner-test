export default function requestResetToken(email: string): { query: string, variables: object } {
    return ({
        query: `
            mutation RequestResetToken($email: String!) {
                requestResetToken(email: $email) {
                    token
                }
            }`,

        variables: {
            email
        }
    });
}
