<template>
    <section>
        <div class="date-pickers">
            <datepicker class="date-picker date-picker__start" v-model="dateStart" :format="format" @selected="onSelectDay"></datepicker>
            <datepicker class="date-picker date-picker__end" v-model="dateEnd" :format="format" @selected="onSelectDay"></datepicker>
        </div>
        <div class="graphic-wrapper">
            <LineChart
                :key="renderKey"
                :data="precipitationValue"
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
            return this.formatDate(this.dateStart);
        },
        formattedDateEnd() {
            return this.formatDate(this.dateEnd);
        },
        precipitationRange() {
            return this.precipitation.filter(item => {
                return item.t >= this.formattedDateStart && item.t <= this.formattedDateEnd;
            });
        },
        precipitationValue() {
            const precipitationValues = [];

            this.precipitationRange.forEach(item => {
                precipitationValues.push(item.v);
            });

            return {
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: precipitationValues,
                    }
                ]
            }
        },

        ...mapState('precipitation', [ 'precipitation' ]),
    },
    methods: {
        formatDate(date) {
            const newDate = new Date(date);
            const year = newDate.getFullYear();
            const month = String(newDate.getMonth()).padStart(2, '0');
            const day = String(newDate.getDate()).padStart(2, '0');

            return `${ year }-${ month }-${ day }`;
        },
        onSelectDay() {
            this.renderKey = Math.floor(Math.random() * 1000);
        },

        ...mapActions('precipitation', [ 'fetchPrecipitation' ]),
    },
    mounted() {
        this.fetchPrecipitation();
    },
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
