<template>
    <div v-if="canAccess">
        <slot />
    </div>
    <div class="login" v-else>
        <div class="login-box"><input type="text" v-model.trim="tokenIpt" placeholder="输入token" class="login-ctrl" :class="invalid ? 'invalid' : ''"><button class="login-submit" @click="submit">访问</button></div>
        <p v-show="this.invalid" class="invalid-tip">Token Error</p>
        <p class="login-tips">访问<a class="login-link" :href="articleUrl" :target="articleUrl ? '_blank' : ''">{{ articleText || '这里' }}</a>获取token。</p>
    </div>
</template>

<script>
export default {
    name: 'LockPage',
    props: {
        token: String,
        articleText: String,
        articleUrl: String
    },

    data () {
        return {
            tokenVal: null,
            tokenIpt: null,
            invalid: false
        }
    },

    computed: {
        canAccess () {
            return this.tokenVal === this.token
        }
    },

    methods: {
        getTokenFromUrl (key) {
            const search = window.location.search
            const reg = new RegExp(`${key}=([^&]*)(&|$)`, 'i')
            const rst = search.match(reg)
            if (rst) {
                return decodeURI(rst[1])
            }
            return null
        },

        submit () {
            if(this.verifyToken()) {
                window.location.href = `${window.location.href}?t=${this.tokenIpt}`
            }
        },

        verifyToken () {
            if(this.tokenIpt === this.token) return true

            this.invalid = true
            return false
        }
    },

    created () {
        this.tokenVal = this.getTokenFromUrl('t')
    }
}
</script>

<style lang="scss" scoped>
    .login{
        padding: 10px 20px;

        &-box{
            display: flex;
            width: 100%;
            margin-bottom: 10px;
            font-size: 14px;
        }

        &-ctrl{
            width: 270px;
            height: 40px;
            padding-left: 10px;
            line-height: 40px;
            background-color: #f5f5fa;
            border: 1px solid transparent;
            outline: none;
            color: #666;
            border-radius: 4px;

            &:focus{
                border: 1px solid #20a0ff;
            }
        }

        &-submit{
            margin-left: 15px;
            width: 100px;
            height: 40px;
            border-radius: 4px;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
            background-color: #20a0ff ;
            cursor: pointer;
            outline: none;
            border: none;
            letter-spacing: 3px;

            &:hover{
                background-color: #4db3ff;
            }
        }

        &-tips{
            padding: 10px;
            font-size: 14px;
            color: #999;
            font-style: italic;
        }

        &-link{
            margin: 0 5px;
        }
    }
    .invalid{
        border-color: red;

        &-tip{
            padding: 0 0 0 10px;
            margin: 0;
            color: red;
            font-size: 12px;
            font-style: italic;
        }
    }
</style>


