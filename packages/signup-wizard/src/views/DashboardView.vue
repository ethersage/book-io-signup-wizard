<template>
    <div class="dashboard">
        <h1>Welcome, {{ $store.state.user && $store.state.user.name }}!</h1>
        <h2>Your books:</h2>
        <ul class="books">
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
import {hydrateLogin} from '@/lib/auth';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'DashboardView',
    data() {
        return {
            books: [],
            favoriteBookId: null
        };
    },
    created() {
        hydrateLogin();
    }
});
</script>

<style scoped>
.dashboard {
    text-align: left;
}

.dashboard h1 {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
}

.dashboard h2 {
    text-decoration: underline;
    margin: 15px 0 10px 0;
}

.books {
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 15px;
}

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
