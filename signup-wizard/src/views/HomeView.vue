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
            <select v-model="favoriteBook">
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
            favoriteBook: '' as string,
            books: [
                {id: 1, title: 'Book A'},
                {id: 2, title: 'Book B'},
                {id: 3, title: 'Book C'}
            ] as {id: number; title: string}[]
        };
    },
    methods: {
        nextStep() {
            this.step++;
        },
        completeSignup() {
            console.log('Signup Completed:', {
                username: this.username,
                password: this.password,
                favoriteBook: this.favoriteBook
            });
            // Here you would handle the sign-up logic, such as calling an API.
        }
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>
