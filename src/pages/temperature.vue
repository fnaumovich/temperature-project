<template>
    <section>
        <div class="date-pickers">
            <datepicker class="date-picker date-picker__start" v-model="dateStart" :format="format" @selected="onSelectDay"></datepicker>
            <datepicker class="date-picker date-picker__end" v-model="dateEnd" :format="format" @selected="onSelectDay"></datepicker>
        </div>
        <div class="graphic-wrapper">
            <LineChart
                    :key="renderKey"
                    :data="toggleableTemperatureValue"
                    :options="{ responsive: false, maintainAspectRatio: false }"
                    :width="1500"
                    :height="900"
            ></LineChart>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import LineChart from '@/components/LineChart.js';
import { dateFormatter } from '@/tools/helpers/';

export default {
    data() {
        return {
            dateStart: 0,
            dateEnd: 0,
            format: 'yyyy-MM-dd',
            renderKey: 0,
            isDateSelected: false,
        };
    },
    components: {
        Datepicker,
        LineChart,
    },
    computed: {
        formattedDateStart() {
            return dateFormatter(this.dateStart);
        },
        formattedDateEnd() {
            return dateFormatter(this.dateEnd);
        },
        temperatureRange() {
            return this.temperature.filter(item => {
                return item.t >= this.formattedDateStart && item.t <= this.formattedDateEnd;
            });
        },
        temperatureValue() {
            const temperatureValues = [];
            const temperatureLabels = [];

            this.temperatureRange.forEach(item => {
                temperatureValues.push(item.v);
                temperatureLabels.push(item.t);
            });

            return {
                labels: temperatureLabels,
                datasets: [
                    {
                        label: 'Temperature',
                        backgroundColor: '#f87979',
                        data: temperatureValues,
                    }
                ]
            };
        },
        toggleableTemperatureValue() {
            return this.isDateSelected ? this.temperatureValue : this.getAverageTemperature;
        },

        ...mapState('temperature', [ 'temperature' ]),
        ...mapGetters('temperature', [ 'getAverageTemperature' ]),
    },
    methods: {
        onSelectDay() {
            this.renderKey = Math.floor(Math.random() * 1000);
            this.isDateSelected = true;
        },

        ...mapActions('temperature', [ 'fetchTemperature' ]),
    },
    created() {
        if (!this.temperature.length) {
            this.fetchTemperature();
        }
    }
};
</script>

<style>
    .date-pickers {
        display: flex;
    }

    .date-picker {
        margin-right: 10px;
    }
</style>
