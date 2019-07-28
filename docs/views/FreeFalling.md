### Free Falling Body Demo
<hr />
<ClientOnly>
    <LockPage :token="token" :articleText="article_text" :articleUrl="article_url">
        <FreeFalling/>
    </LockPage>
</ClientOnly>

<script>
    import '@scss/global.scss'
    export default {
        name: 'FreeFallingMD',
        data () {
            return {
                token: '1564200670830',
                article_text: '',
                article_url: ''
            }
        }
    }
</script>