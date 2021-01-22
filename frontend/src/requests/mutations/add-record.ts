export default function addRecord(title: string, description: string): { query: string, variables: object } {
    return ({
        query: `
            mutation AddRecord($title: String!, $description: String!) {
                addRecord(title: $title, description: $description) {
                    title, 
                    description, 
                    account {
                        id,
                        name
                    }
                }
            }`,

        variables: {
            title, description
        }
    });
}
