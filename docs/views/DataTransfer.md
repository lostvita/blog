### DataTransfer Demo
<hr />
<ClientOnly>
    <LockPage :token="token" :article="article">
        <DataTransfer/>
    </LockPage>
</ClientOnly>

<script>
    import '@scss/global.scss'
    export default {
        name: 'DataTransferMD',
        data () {
            return {
                token: '1562835370187',
                article: 'https://juejin.im/post/5d1d72b06fb9a07f0870b2a5'
            }
        }
    }
</script>