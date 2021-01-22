import config from './config';

function fetchApi(url: string, setup: object): Promise<any> {

    let fetchError = false;
    return (fetch(url, setup)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            fetchError = true;
            return response.json();
        })
        .then((result: any) => {
            if (fetchError || (result.errors && result.errors.length > 0)) {

                if (result.errors && result.errors.length > 0) {
                    if (result.errors.find((error: any) => error.message.includes('not authenticated'))) {
                        localStorage.removeItem('user_token');
                        window.location.href = '/auth/login';
                    }

                    throw new Error(result.errors[0].message);
                }

                throw new Error((result.message ? result.message : 'Please try again.'));
            }


            return (result.data ? result.data : result);
        })

        //for demo purposes, we simulate a timeout/delay, so we can see that there is a (pretty) temporary spinner
        .then(x => new Promise(resolve => setTimeout(() => resolve(x), 150))));
}


export function get(query: { [key: string]: string }, token?: string | null) {

    const queryString = Object.keys(query)
        .map(key => `${key}=${query[key]}`)
        .join('&');

    return (fetchApi(`${config.BACKEND_API}?${queryString}`, {
        method: 'GET',
        headers: (token ? {
            'Authorization': `Bearer ${token}`
        } : {})
    }));
}

export function post(data: { [key: string]: any }, token?: string | null) {

    return (fetchApi(`${config.BACKEND_API}`, {
        method: 'POST',
        headers: Object.assign({}, {
            'Content-Type': 'application/json'
        }, (token ? {
            'Authorization': `Bearer ${token}`
        } : {})),

        body: JSON.stringify(data)
    }));
}
