<template>
    <form class="form-step" @submit.prevent="submit">
        <h2>Step 1: Enter Username and Password</h2>
        <div class="form">
            <label for="username">Username:</label>
            <input
                type="text"
                v-model="username"
                id="username"
                placeholder="Username"
                v-autofocus
            />
            <div v-if="showUserError" class="error">
                Please select a username.
            </div>
            <label for="password">Password:</label>
            <input
                type="password"
                v-model="password"
                id="password"
                placeholder="Password"
            />
            <div v-if="showPassError" class="error">
                Please select a password to continue.
            </div>
            <button class="button submit-button" type="submit">Next</button>
        </div>
    </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    data() {
        return {
            username: '',
            password: '',
            noUser: false,
            noPass: false
        };
    },
    computed: {
        showUserError() {
            return this.noUser;
        },
        showPassError() {
            return this.noPass;
        }
    },
    methods: {
        submit() {
            this.noUser = !this.username;
            this.noPass = !this.password;

            if (!this.noUser && !this.noPass) {
                this.$emit('advance', {
                    username: this.username,
                    password: this.password
                });
            }
        }
    }
});
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}
</style>
