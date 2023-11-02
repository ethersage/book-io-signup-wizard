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
import newUser from '@/lib/new-user';
import saveFavorite from '@/lib/save-favorite';
import {defineComponent} from 'vue';

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

            newUser(this.username, this.password)
                .then(() => {
                    this.saveFavoriteBook();
                })
                .then(() => {
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
        async saveFavoriteBook() {
            saveFavorite(this.username, this.favoriteBookId);
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
