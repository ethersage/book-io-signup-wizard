<template>
    <form class="form-step" @submit.prevent="submit">
        <h2>Step 2: Select Your Favorite Book</h2>
        <div v-if="showError" class="error">
            Please select a book to continue.
        </div>
        <div class="form">
            <select v-model="favoriteBookId" v-autofocus>
                <option v-for="book in books" :key="book.id" :value="book.id">
                    {{ book.title }}
                </option>
            </select>
            <button class="button submit-button" type="submit">
                Complete Signup
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
    data() {
        return {
            favoriteBookId: '',
            noSelectedBook: false
        };
    },
    computed: {
        books() {
            const store = useStore();
            return store.state.books;
        },
        showError() {
            return this.noSelectedBook;
        }
    },
    methods: {
        submit() {
            if (!this.favoriteBookId) {
                this.noSelectedBook = true;
            } else {
                this.noSelectedBook = false;
                this.$emit('advance', {favoriteBookId: this.favoriteBookId});
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
