import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import precipitation from './modules/precipitation';
import temperature from './modules/temperature';

export default new Vuex.Store({
    modules: {
        precipitation,
        temperature,
    }
});
