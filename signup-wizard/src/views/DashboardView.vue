<template>
    <div class="dashboard">
        <h1>Welcome, {{ $store.state.user && $store.state.user.name }}!</h1>
        <h1>fav book id = {{ $store.state.favoriteBookId }}</h1>
        <ul>
            <li v-for="book in $store.state.books" :key="book.id">
                {{ book.title }}
                <span v-if="book.id === $store.state.favoriteBookId">⭐️</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
    name: 'DashboardView',
    data() {
        return {
            books: [],
            favoriteBookId: null
        };
    },
    created() {
        const store = useStore();

        if (!store.state.user) {
            return this.$router.push({name: 'home'}); // Navigate to login
        }

        store.dispatch('fetchBooks');
        store.dispatch('fetchFavoriteBook');
    }
});
</script>

<style scoped>
/* Add styles for your dashboard here */
</style>
