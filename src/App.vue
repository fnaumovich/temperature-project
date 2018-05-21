<template>
    <div id="app">
        <div class="container">
            <div class="wrapper">
                <div class="links">
                    <router-link class="link" to="/">Precipitation</router-link>
                    <router-link class="link" to="/temperature">Temperature</router-link>
                </div>
                <div class="graphics">
                    <div class="graphics-wrapper">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style scoped lang="scss">
    .container {
        width: 1600px;
        min-height: 100vh;
        margin: 0 auto;
    }

    .wrapper {
        display: flex;
        height: 100vh;
    }

    .links,
    .graphics {
        padding-top: 20px;
    }

    .links {
        width: 150px;
        border-right: 1px solid #000;
    }

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        background: #ccc;
        color: #000;
        text-decoration: none;
        font-size: 24px;
        font-weight: 600;

        &:hover {
            opacity: 0.8;
        }
    }

    .router-link-exact-active {
        opacity: 0.8;
    }

    .graphics-wrapper {
        padding-left: 20px;
    }
</style>
