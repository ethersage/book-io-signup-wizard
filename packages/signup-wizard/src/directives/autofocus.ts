import {ObjectDirective} from 'vue';

const autofocusDirective: ObjectDirective<HTMLElement> = {
    mounted(el) {
        el.focus();
    }
};

export default autofocusDirective;
