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
                :chartData="toggleablePrecipitationValue"
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
            return this.getFirstPrecipitationDate || dateFormatter(this.dateStart);
        },
        formattedDateEnd() {
            return this.getLastPrecipitationDate || dateFormatter(this.dateEnd);
        },
        precipitationRange() {
            return this.precipitation.filter(item => {
                return item.t >= this.formattedDateStart && item.t <= this.formattedDateEnd;
            });
        },
        precipitationValue() {
            const precipitationValues = [];
            const precipitationLabels = [];

            this.precipitationRange.forEach(item => {
                precipitationValues.push(item.v);
                precipitationLabels.push(item.t)
            });

            return {
                labels: precipitationLabels,
                datasets: [
                    {
                        label: 'Precipitation',
                        backgroundColor: '#f87979',
                        data: precipitationValues,
                    }
                ]
            };
        },
        toggleablePrecipitationValue() {
            return this.isDateSelected ? this.precipitationValue : this.getAveragePrecipitation;
        },
        hasData() {
            return this.toggleablePrecipitationValue.datasets[0].data.length > 0;
        },
        getFirstPrecipitationDate() {
            return this.isDateStartSelected ? false : this.precipitation[0].t;
        },
        getLastPrecipitationDate() {
            return this.isDateEndSelected ? false : this.precipitation[this.precipitation.length - 1].t;
        },

        ...mapState('precipitation', [ 'precipitation' ]),
        ...mapGetters('precipitation', [ 'getAveragePrecipitation' ]),
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

        ...mapActions('precipitation', [ 'fetchPrecipitation' ]),
    },
    created() {
        if (!this.precipitation.length) {
            this.fetchPrecipitation();
        }
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

    .info-title {
        margin-top: 50px;
        font-size: 36px;
        font-weight: 600;
        text-align: center;
    }
</style>
