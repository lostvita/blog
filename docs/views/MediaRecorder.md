### MediaRecorder Demo
<hr />
<ClientOnly>
    <LockPage :token="token" :articleText="article_text" :articleUrl="article_url">
        <MediaRecorder/>
    </LockPage>
</ClientOnly>

<script>
    import '@scss/global.scss'
    export default {
        name: 'DataTransferMD',
        data () {
            return {
                token: '1563266971025',
                article_text: '',
                article_url: ''
            }
        }
    }
</script>