export default async function fetchFavorite(username: string) {
    const response = await fetch(
        `http://localhost:9000/users/${username}/favorites`
    );
    const data = await response.json();
    return data.data.favorites.book;
}
