export default function register(name: string, email: string, password: string): { query: string, variables: object } {
    return ({
        query: `
            mutation Register($name: String!, $email: String!, $password: String!) {
                register(name: $name, email: $email, password: $password) {
                    token
                }
            }`,

        variables: {
            name, email, password
        }
    });
}
