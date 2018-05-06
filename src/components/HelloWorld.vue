<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed: {
        ...mapState('precipitation', [' isFetched ']),
    },
    methods: {
        ...mapActions('precipitation', [ 'fetchPrecipitation' ]),
    },
    mounted() {
        this.fetchPrecipitation();
    },
};
</script>

<style scoped>

</style>
