import axios from 'axios';
import get from 'lodash.get';

const url = 'http://localhost:1234/';

export default {
    async getPrecipitation() {
        const data = await axios.get(`${url}getPrecipitation`);

        return get(data, 'data', []);
    },
    async getTemperature() {
        const data = await axios.get(`${url}getTemperature`);

        return get(data, 'data', []);
    },
};
