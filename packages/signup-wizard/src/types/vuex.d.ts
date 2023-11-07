// vue.d.ts
import {Store} from 'vuex';

declare module '@vue/runtime-core' {
    // Declare your own store states
    interface State {
        user: {
            name: string;
        };
        favoriteBookId: string;
        books: Book[];
    }

    // Provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
