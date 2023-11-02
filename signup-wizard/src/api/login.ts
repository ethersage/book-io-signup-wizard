export default function login(username: string, password: string) {
    const credentials = {username, password};
    return fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((response) => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    });
}
