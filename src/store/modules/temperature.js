import * as types from '../mutation-types';
import apiService from '@/api/apiService';
import localStorage from '@/services/local-storage';

export default {
    namespaced: true,
    state() {
        return {
            temperature: [],
            isFetched: false,
        };
    },
    getters: {
        getAverageTemperature(state) {
            const temperature = state.temperature;
        },
    },
    mutations: {
        setFetchStatus(state) {
            state.isFetched = true;
        },
        [types.FETCH_TEMPERATURE](state, data) {
            state.temperature = data;
        },
    },
    actions: {
        setStorage(store) {
            localStorage.setItem('temperature', store.state.temperature);
        },
        async fetchTemperature(store, data) {
            const temperature = localStorage.getItem('temperature');

            if (Array.isArray(temperature) && temperature.length) {
                store.commit(types.FETCH_TEMPERATURE, temperature);
            } else {
                const temperature = await apiService.getTemperature();
                store.commit(types.FETCH_TEMPERATURE, temperature);
                store.commit('setFetchStatus');
                await store.dispatch('setStorage');
            }
        }
    },
};
