export default function (username: string, bookId: string) {
    // Make sure the username and favoriteBookId are set
    if (!username || !bookId) {
        console.error('Username and favorite book must be provided');
        return;
    }

    // Construct the URL with the username
    const url = `http://localhost:9000/users/${username}/favorites`;

    // Construct the request payload
    const payload = {
        book: bookId
    };

    // Perform the POST request to save the favorite book
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to save favorite book');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error during saving favorite book:', error);
        });
}
