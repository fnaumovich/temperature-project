<template>
    <section>
        <div class="date-pickers">
            <datepicker class="date-picker date-picker__start" v-model="dateStart" :format="format" @selected="onSelectDayStart"></datepicker>
            <datepicker class="date-picker date-picker__end" v-model="dateEnd" :format="format" @selected="onSelectDayEnd"></datepicker>
        </div>
        <div class="graphic-wrapper">
            <cLineChart
                v-if="hasData"
                :key="renderKey"
                :chartData="toggleableTemperatureValue"
            ></cLineChart>
            <h1 class="info-title" v-else>No Data</h1>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import cLineChart from '@/components/cLineChart.vue';
import { dateFormatter } from '@/tools/helpers/';

export default {
    data() {
        return {
            dateStart: 0,
            dateEnd: 0,
            format: 'yyyy-MM-dd',
            renderKey: 0,
            isDateSelected: false,
            isDateStartSelected: false,
            isDateEndSelected: false,
        };
    },
    components: {
        Datepicker,
        cLineChart,
    },
    computed: {
        formattedDateStart() {
            return this.getFirstTemperatureDate || dateFormatter(this.dateStart);
        },
        formattedDateEnd() {
            return this.getLastTemperatureDate || dateFormatter(this.dateEnd);
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
        hasData() {
            return this.toggleableTemperatureValue.datasets[0].data.length > 0;
        },
        getFirstTemperatureDate() {
            return this.isDateStartSelected ? false : this.temperature[0].t;
        },
        getLastTemperatureDate() {
            return this.isDateEndSelected ? false : this.temperature[this.temperature.length - 1].t;
        },

        ...mapState('temperature', [ 'temperature' ]),
        ...mapGetters('temperature', [ 'getAverageTemperature' ]),
    },
    methods: {
        onSelectDayStart() {
            this.renderKey = Math.floor(Math.random() * 1000);
            this.isDateSelected = true;
            this.isDateStartSelected = true;
        },
        onSelectDayEnd() {
            this.renderKey = Math.floor(Math.random() * 1000);
            this.isDateSelected = true;
            this.isDateEndSelected = true;
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

    .info-title {
        margin-top: 50px;
        font-size: 36px;
        font-weight: 600;
        text-align: center;
    }
</style>
