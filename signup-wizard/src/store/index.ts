// src/store/index.ts

import {createStore} from 'vuex';

export interface User {
    name: string;
}

export interface Book {
    id: number;
    title: string;
}

export interface State {
    user: User | null;
    books: Book[];
    favoriteBookId: string | null;
}

// Create a new store instance.
const store = createStore({
    state() {
        return {
            user: null, // This will hold the user data after a successful login
            books: [],
            favoriteBookId: null
        };
    },
    mutations: {
        SET_USER(state: State, user: User) {
            state.user = user;
        },
        SET_BOOKS(state, books) {
            state.books = books;
        },
        SET_FAVORITE_BOOK(state, bookId) {
            state.favoriteBookId = bookId;
        }
    },
    actions: {
        fetchBooks({commit}) {
            console.log('fetching books');
            fetch('http://localhost:9000/books')
                .then((response) => response.json())
                .then((data) => {
                    console.log('committing books');
                    console.log(data.data.books);
                    commit('SET_BOOKS', data.data.books); // Assuming the API returns an object with a books array
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },

        fetchFavoriteBook({state, commit}) {
            const username = state.user?.name;
            if (username) {
                fetch(`http://localhost:9000/users/${username}/favorites`)
                    .then((response) => response.json())
                    .then((data) => {
                        commit('SET_FAVORITE_BOOK', data.favoriteBookId); // Adjust according to your API response structure
                    })
                    .catch((error) => {
                        console.error('Error fetching favorite book:', error);
                    });
            }
        },

        login({commit}, credentials) {
            return new Promise((resolve, reject) => {
                fetch('http://localhost:9000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                    .then((response) => {
                        if (!response.ok) throw new Error('Login failed');
                        return response.json();
                    })
                    .then((data) => {
                        commit('SET_USER', credentials.username);
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    }
});

export default store;
