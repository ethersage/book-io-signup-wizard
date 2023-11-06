<template>
    <div class="dashboard">
        <h1>Welcome, {{ $store.state.user && $store.state.user.name }}!</h1>
        <ul>
            <li
                class="book"
                :class="{'fav-book': book.id === $store.state.favoriteBookId}"
                v-for="book in $store.state.books"
                :key="book.id"
            >
                <span
                    class="fav-icon"
                    v-if="book.id === $store.state.favoriteBookId"
                >
                    ⭐️</span
                >
                <span>{{ book.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {doIfLoggedIn} from '@/router/navigate';
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

        doIfLoggedIn(() => {
            store.dispatch('fetchBooks');
            store.dispatch('fetchFavoriteBook');
        });
    }
});
</script>

<style scoped>
.book {
    padding: 5px 20px;
}

.fav-book {
    margin-left: -25px;
}

.fav-icon {
    margin-right: 5px;
}
</style>
