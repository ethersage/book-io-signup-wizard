import {dispatchSetBooks} from '@/store/helpers';
import fetchBooks from '../api/fetch-books';

export async function getBooks() {
    const books = await fetchBooks();
    dispatchSetBooks(books);
}
