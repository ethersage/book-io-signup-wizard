<template>
    <div class="signup-view">
        <h1>Signup</h1>
        <div v-if="step === 1">
            <h2>Step 1: Enter Username and Password</h2>
            <div class="form">
                <label for="username">Username:</label>
                <input
                    type="text"
                    v-model="username"
                    id="username"
                    placeholder="Username"
                />
                <label for="password">Password:</label>
                <input
                    type="password"
                    v-model="password"
                    id="password"
                    placeholder="Password"
                />
                <button class="button submit-button" @click="nextStep">
                    Next
                </button>
            </div>
        </div>

        <div v-if="step === 2">
            <h2>Step 2: Select Your Favorite Book</h2>
            <div class="form">
                <select v-model="favoriteBookId">
                    <option
                        v-for="book in $store.state.books"
                        :key="book.id"
                        :value="book.id"
                    >
                        {{ book.title }}
                    </option>
                </select>
                <button class="button submit-button" @click="completeSignup">Complete Signup</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import {goHome} from '@/router/navigate';
import signup from '@/api/signup';

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
        async completeSignup() {
            // TODO: check if user has been created first

            try {
                await signup(this.username, this.password, this.favoriteBookId);

                goHome(true);
            } catch (error) {
                console.error('Error during signup:', error);
            }
        }
    },
    created() {
        const store = useStore();
        store.dispatch('fetchBooks');
    }
});
</script>

<style scoped>
/* Add your styles here */
.form {
    display: flex;
    flex-direction: column;
}
</style>
