<template>
    <div class="signup-view">
        <div v-if="step === 1">
            <h2>Step 1: Enter Username and Password</h2>
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" id="username" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" id="password" />
            </div>
            <button @click="nextStep">Next</button>
        </div>

        <div v-if="step === 2">
            <h2>Step 2: Select Your Favorite Book</h2>
            <select v-model="favoriteBookId">
                <option v-for="book in books" :key="book.id" :value="book.id">
                    {{ book.title }}
                </option>
            </select>
            <button @click="completeSignup">Complete Signup</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {defineComponent} from 'vue';

export default defineComponent({
    name: 'SignupView',
    data() {
        return {
            step: 1 as number,
            username: '' as string,
            password: '' as string,
            favoriteBookId: '' as string,
            books: [] as Array<{
                id: number;
                title: string;
                author: string;
                description: string;
                cover_url: string;
            }>
        };
    },
    methods: {
        nextStep() {
            this.step++;
        },
        completeSignup() {
            // TODO: check if user has been created first
            console.log('Signup Completed:', {
                username: this.username,
                password: this.password,
                favoriteBookId: this.favoriteBookId
            });

            // Construct the request payload
            const payload = {
                username: this.username,
                password: this.password
            };

            // Perform the POST request to the signup endpoint
            fetch('http://localhost:9000/users/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Signup failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.saveFavoriteBook();
                })
                .then((response) => {
                    this.$router.push({name: 'home'}); // Navigate to login
                })
                .catch((error) => {
                    console.error('Error during signup:', error);
                });
        },
        fetchBooks() {
            // TODO: show loading indicator if favorite books are not available yet
            fetch('http://localhost:9000/books') // Adjust if your endpoint is different
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.books = data.data.books;
                    console.log(data.data.books);
                })
                .catch((error) => {
                    console.error(
                        'There has been a problem with your fetch operation:',
                        error
                    );
                });
        },
        saveFavoriteBook() {
            // Make sure the username and favoriteBookId are set
            if (!this.username || !this.favoriteBookId) {
                alert('Username and favorite book must be provided');
                return;
            }

            // Construct the URL with the username
            const url = `http://localhost:9000/users/${this.username}/favorites`;

            // Construct the request payload
            const payload = {
                book: this.favoriteBookId
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
                // .then((data) => {
                //     console.log(data.message); // Handle the success response
                // })
                .catch((error) => {
                    console.error('Error during saving favorite book:', error);
                });
        }
    },
    created() {
        this.fetchBooks(); // Fetch books when component is created
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>
