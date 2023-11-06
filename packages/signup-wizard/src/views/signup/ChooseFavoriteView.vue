<template>
    <div class="form-step">
        <h2>Step 2: Select Your Favorite Book</h2>
        <div class="form">
            <select v-model="favoriteBookId">
                <option v-for="book in books" :key="book.id" :value="book.id">
                    {{ book.title }}
                </option>
            </select>
            <button class="button submit-button" @click="submit">
                Complete Signup
            </button>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex';

export default {
    data() {
        return {
            favoriteBookId: ''
        };
    },
    computed: {
        books() {
            const store = useStore();
            return store.state.books;
        }
    },
    methods: {
        submit() {
            this.$emit('advance', {favoriteBookId: this.favoriteBookId});
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
