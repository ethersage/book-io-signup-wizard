export default async function (username: string, bookId: string) {
    // Make sure the username and favoriteBookId are set
    if (!username || !bookId) {
        return Promise.reject('Username and favorite book must be provided');
    }

    // Construct the URL with the username
    const url = `http://localhost:9000/users/${username}/favorites`;

    // Construct the request payload
    const payload = {
        book: bookId
    };

    // Perform the POST request to save the favorite book
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
