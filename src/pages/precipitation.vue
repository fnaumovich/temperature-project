<template>
    <section>
        <div class="date-pickers">
            <datepicker class="date-picker date-picker__start" v-model="dateStart" :format="format"></datepicker>
            <datepicker class="date-picker date-picker__end" v-model="dateEnd" :format="format"></datepicker>
        </div>
        <div class="graphic-wrapper">

        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            dateStart: 0,
            dateEnd: 0,
            format: 'yyyy-MM-dd',
        };
    },
    components: {
        Datepicker,
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
