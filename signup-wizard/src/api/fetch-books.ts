export default function fetchBooks() {
    return fetch('http://localhost:9000/books')
        .then((response) => response.json())
        .then((data) => data.data.books)
        .catch((error) => {
            console.error('Error fetching books:', error);
        });
}
