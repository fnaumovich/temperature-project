import Vue from 'vue';
import Router from 'vue-router';

import Precipitation from '@/pages/precipitation';
import Temperature from '@/pages/Temperature';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Precipitation',
            component: Precipitation,
        },
        {
            path: '/temperature',
            name: 'Temperature',
            component: Temperature,
        },
    ],
});
