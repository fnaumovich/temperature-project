import * as types from '../mutation-types';
import apiService from '@/api/apiService';
import localStorage from '@/services/local-storage';
import { getMonth, getYear, getLastDayOfTheMonth } from '@/tools/helpers';

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
            const averagePrecipitationValues = [];
            const labels = [];
            let count = 0;
            let value = 0;

            precipitation.forEach(item => {
                const year = getYear(item.t);
                const month = getMonth(item.t);
                const lastDayOfMonth = getLastDayOfTheMonth(year, month);

                value += item.v;

                count++;

                if (count === lastDayOfMonth) {
                    const averageValue = parseFloat((value / lastDayOfMonth).toFixed(1));
                    averagePrecipitationValues.push(averageValue);
                    labels.push('');
                    value = 0;
                    count = 0;
                }
            });

            return {
                labels: labels,
                datasets: [
                    {
                        label: 'Precipitation',
                        backgroundColor: '#f87979',
                        data: averagePrecipitationValues,
                    }
                ]
            };
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
    },
};
