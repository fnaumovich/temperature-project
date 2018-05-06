import axios from 'axios';
import get from 'lodash.get';

const url = 'http://localhost:3000/';

export default {
    async getPrecipitation() {
        return axios.get(`${url}getPrecipitation`);
    },
    async getTemperature() {
        const data = axios.get(`${url}getTemperature`);

        return get(data, 'data', []);
    },
};
