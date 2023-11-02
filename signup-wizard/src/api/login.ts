export default async function login(username: string, password: string) {
    const credentials = {username, password};
    const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}
