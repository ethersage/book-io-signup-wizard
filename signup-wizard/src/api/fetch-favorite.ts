export default function fetchFavorite(username: string) {
    return fetch(`http://localhost:9000/users/${username}/favorites`)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error fetching favorite book:', error);
        });
}
