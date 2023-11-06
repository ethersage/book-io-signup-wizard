<template>
    <div class="form-step">
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
            <button class="button submit-button" @click="submit">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        submit() {
            this.$emit('advance', {
                username: this.username,
                password: this.password
            });
        }
    }
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}
</style>
