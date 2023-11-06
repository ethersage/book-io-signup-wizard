// vue.d.ts
import { Store } from 'vuex';
import { State } from './store'; // Adjust the import to where your State type is defined

declare module '@vue/runtime-core' {
  // Declare your own store states
  interface State {
    // types of your state properties
  }

  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
