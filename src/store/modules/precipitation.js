import * as types from '../mutation-types';
import apiService from '@/api/apiService';
import localStorage from '@/services/local-storage';
import indexedDB from '@/services/indexedDB';

export default {
    namespaced: true,
    state() {
        return {
            precipitation: [],
            isFetched: false,
        };
    },
    getters: {
        getAveragePrecipitation(state) {
            const precipitation = state.precipitation;


        },
    },
    mutations: {
        setFetchStatus(state) {
            state.isFetched = true;
        },
        [types.FETCH_PRECIPITATION](state, data) {
            state.precipitation = data;
        },
    },
    actions: {
        setStorage(store) {
            localStorage.setItem('precipitation', store.state.precipitation);
        },
        async fetchPrecipitation(store, data) {
            const precipitation = localStorage.getItem('precipitation');

            if (Array.isArray(precipitation) && precipitation.length) {
                store.commit(types.FETCH_PRECIPITATION, precipitation);
            } else {
                const precipitation = await apiService.getPrecipitation();
                store.commit(types.FETCH_PRECIPITATION, precipitation);
                store.commit('setFetchStatus');
                await store.dispatch('setStorage');
            }
        },
        getIndexed() {
            const db = indexedDB();
            console.log(db);
        }
    },
};
