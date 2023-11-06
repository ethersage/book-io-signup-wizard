export default async function (username: string, password: string) {
    const response = await fetch('http://localhost:9000/users/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    if (!response.ok) {
        throw new Error('Creating new user failed');
    }

    return response.json();
}
