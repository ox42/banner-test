export default function records(): { query: string } {
    return ({
        query: `
            query Records {
                records {
                    id,
                    title, 
                    description,
                    account {
                        id,
                        name
                    } 
                }
            }`
    });
}
