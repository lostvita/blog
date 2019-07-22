<template>
    <div class="m-contianer">
        <div class="map-wrapper">
            <v-chart
                :options="map"
                :init-options="initOptions"
                ref="map"
                autoresize
                @click="handleClick"
            />
        </div>
        <div class="map-ctrl">
            <button class="map-btn">抽奖</button>
        </div>
    </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/scatter'
import 'echarts/map/js/world'
import 'echarts/lib/component/visualMap'

// Map of China
import chinaMap from '@data/chinaMap.json'
import map from '@data/map'

// registering map data
ECharts.registerMap('china', chinaMap)

export default {
    components: {
        'v-chart': ECharts
    },
    data () {
        return {
            initOptions: {
                renderer: 'canvas'
            },
            map
        }
    },
    methods: {
        handleClick (e) {
            // console.log(e)
        }
    }
}
</script>

<style lang="scss" scoped>
    .m-contianer{
        width: 100%;
        height: auto;
    }
    .map-wrapper{
        width: 100%;
        height: 50vh;
        overflow: scroll;
    }
    .map-ctrl{
        display: flex;
        align-items: center;
        margin-top: 30px;
    }
    .map-btn{
        width: 80px;
        line-height: 30px;
        border-radius: 4px;
        outline: none;
        border: none;
        background-color: #20a0ff;
        color: #fff;
        font-size: 14px;
    }
</style>

