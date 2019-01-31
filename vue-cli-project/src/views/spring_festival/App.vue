<template>
    <div>
        2019春节活动 {{ date }}
    </div>
</template>

<script>
import { uniqueArr } from '@/js/utils'
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
