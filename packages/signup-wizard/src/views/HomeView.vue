<template>
    <div>
        <h1>Login</h1>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <form @submit.prevent="loginUser">
            <div class="form">
                <label for="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    v-model="credentials.username"
                    required
                    placeholder="Username"
                />
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="credentials.password"
                    required
                    placeholder="Password"
                />
                <button class="button submit-button" type="submit">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import {goToDashboard, goToDashboardIfLoggedIn} from '@/router/navigate';
import {defineComponent, computed} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';

import {performLogin} from '@/lib/auth';

export default defineComponent({
    setup() {
        const store = useStore();
        const route = useRoute();

        // Extract the query parameter and create messages based on its value
        const successQuery = route.query.signup;
        const successMessage = computed(() => {
            return successQuery === 'true' ? 'Signup was successful!' : '';
        });
        const errorMessage = computed(() => {
            return successQuery === 'false'
                ? 'Signup failed, please try again.'
                : '';
        });

        return {store, successMessage, errorMessage};
    },
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        async loginUser() {
            performLogin(this.credentials.username, this.credentials.password);
        }
    },
    created() {
        goToDashboardIfLoggedIn();
    }
});
</script>

<style scoped></style>
