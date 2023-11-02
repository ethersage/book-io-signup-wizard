export default function (username: string, password: string) {
    return fetch('http://localhost:9000/users/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Creating new user failed');
        }
        return response.json();
    });
}
