<template>
    <section>
        <div class="date-pickers">
            <datepicker class="date-picker date-picker__start" v-model="dateStart" :format="format" @selected="onSelectDay"></datepicker>
            <datepicker class="date-picker date-picker__end" v-model="dateEnd" :format="format" @selected="onSelectDay"></datepicker>
        </div>
        <div class="graphic-wrapper">
            <LineChart
                    :key="renderKey"
                    :data="temperatureValue"
                    :options="{ responsive: false, maintainAspectRatio: false }"
                    :width="900"
                    :height="600"
            ></LineChart>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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

            this.temperatureRange.forEach(item => {
                temperatureValues.push(item.v);
            });

            return {
                datasets: [
                    {
                        label: 'Temperature',
                        backgroundColor: '#f87979',
                        data: temperatureValues,
                    }
                ]
            }
        },


        ...mapState('temperature', [ 'temperature' ]),
    },
    methods: {
        onSelectDay() {
            this.renderKey = Math.floor(Math.random() * 1000);
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
