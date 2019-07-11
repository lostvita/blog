<template>
    <section>
        2019春节活动 {{ date }}
        <div class="loader">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
    </section>
</template>

<script>
import { uniqueArr } from '@/js/utils'
import '../../scss/spring.scss'
export default {
    data () {
        return {
            date: new Date()
        }
    },

    methods: {
        unique (arr) {
            return uniqueArr(arr)
        }
    }
}
</script>
