<template>
    <LineChart
        :data="chartData"
        :options="{ responsive: false, maintainAspectRatio: false }"
        :width="1500"
        :height="900"
    ></LineChart>
</template>

<script>
import LineChart from './LineChart.js';

export default {
    props: {
        chartData: Object,
    },
    components: {
        LineChart,
    }
}
</script>
