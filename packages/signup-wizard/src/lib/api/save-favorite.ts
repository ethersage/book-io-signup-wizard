export default async function (username: string, bookId: string) {
    if (!username || !bookId) {
        return Promise.reject('Username and favorite book must be provided');
    }

    const url = `http://localhost:9000/users/${username}/favorites`;

    const payload = {
        book: bookId
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Failed to save favorite book');
    }
    return response.json();
}
