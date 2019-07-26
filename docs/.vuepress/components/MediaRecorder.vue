<template>
    <div class="wrapper">
        <div class="containner">
            <h3 class="title">MediaRecoder录屏效果演示</h3>
            <div class="box">
                <canvas ref="$circle" class="circle-canvas"></canvas>
                <div class="circle-recording"><span class="circle-point" :class="canStop ? 'record' : 'stop'"></span><span class="circle-time">{{ time | formatTime }}</span></div>
                <div class="circle-ctrl">
                    <button class="circle-btn circle-record" :disabled="!canRecord" @click="record">Record</button>
                    <button class="circle-btn circle-stop" :disabled="!canStop" @click="stop">Stop</button>
                    <button class="circle-btn circle-download" :disabled="!canDownload" @click="download">Download</button>
                </div>
                <div class="circle-preview">
                    <p class="circle-title">预览效果</p>
                    <video ref="$video" class="circle-video" :src="videoUrl" autoplay controls></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Timer from '@/js/timer'
export default {
    filters: {
        formatTime (val) {
            return val > 9 ? `00 : ${val}` : `00 : 0${val}`
        }
    },
    data () {
        return {
            time: 0,
            tTimer: null,
            mediaRecord: null,
            chunks: new Set(),
            videoUrl: null,
            canRecord: true,
            canStop: false,
            canDownload: false,
            color: ['#C04D00', '#f5587b', '#F75940', '#FF2E63', '#1794A5', '#00a03e']
        }
    },
    methods: {
        getPixelRatio (ctx) {
            const backingStore = ctx.backingStorePixelRatio ||
                ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        },

        initCircleCanvas () {
            const $circle = this.$refs.$circle
            $circle.width = 600
            $circle.height = 300
            const ctx = $circle.getContext('2d')

            this.createVideo($circle)

            this.tTimer = new Timer(null, 1000) // 计时器
            this.tTimer.onFinished = () => {
                if(this.canStop){
                    this.time++
                    this.tTimer.start()
                }
            }
            const cTimer = new Timer(null, 5000)
            let color = this.color[parseInt(Math.random() * 6)]
            cTimer.onProgress = (p) => {
                const x = Math.cos(p * 2 * Math.PI) * 50 + 300
                const y = Math.sin(p * 2 * Math.PI) * 50 + 150
                if(x < 300 && y > 150 || x > 300 && y < 150) color = this.color[parseInt(Math.random() * 6)]
                this.drawCircle(ctx, x, y, color)
            }
            cTimer.onFinished = () => {
                cTimer.start()
            }
            cTimer.start()
        },

        drawCircle (ctx, x=100, y=100, color) {
            const radius = 20
            ctx.clearRect(0, 0, 600, 300)
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
            ctx.lineWidth = 0
            ctx.closePath()
            ctx.fillStyle = color
            ctx.fill()
            ctx.strokeStyle = color
            ctx.stroke()
        },

        createVideo (canvas) {
            const mediaStream = canvas.captureStream(10) // 设置帧频率
            this.mediaRecord = new MediaRecorder(mediaStream, {
                videoBitsPerSecond: 8500000
            })

            this.mediaRecord.ondataavailable = (e) => {
                this.chunks.add(e.data)
            }
        },

        record () {
            this.canRecord = false
            this.canStop = true
            this.canDownload = false
            this.mediaRecord.start()
            this.time = 0
            this.tTimer.start()
        },

        stop () {
            this.canStop = false
            this.mediaRecord.stop()
            setTimeout(() => {
                this.previewVideo()
            }, 2000)
        },

        previewVideo () {
            const videoBlob = new Blob(this.chunks, { 'type' : 'video/webm;codecs=vp9' })
            this.chunks = new Set()
            this.videoUrl = window.URL.createObjectURL(videoBlob)
            this.canDownload = true
            this.canRecord = true
        },

        download () {
            var a = document.createElement('a')
            a.href = this.videoUrl
            a.download = 'record-canvas.webm'
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()
            setTimeout(function() {
                document.body.removeChild(a)
            }, 500)
        }
    },
    mounted () {
        this.initCircleCanvas()
    }
}
</script>


<style lang="scss" scoped>
    .box{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .circle{
        &-ctrl{
            margin: 10px 0;
            display: flex;
            width: 100%;
        }

        &-btn{
            padding: 8px 15px;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 14px;
            color: #fff;
            border-radius: 4px;
        }
        &-record{
            margin-right: 10px;
            background-color: #4bc2c5;
            box-shadow: 0px 3px 10px rgba(36,168,172,.4);
            &:hover{
                background-color: rgba(36,168,172,1);
            }
            &[disabled]{
                cursor: not-allowed;
                background-color: rgba(36,168,172,.6);
            }
        }
        &-stop{
            margin-right: 10px;
            background-color: #f06966;
            box-shadow: 0 3px 10px rgba(215,75,75,.4);
            &:hover{
                background-color: rgba(215,75,75,1);
            }
            &[disabled]{
                cursor: not-allowed;
                background-color: rgba(215,75,75,.6);
            }
        }
        &-download{
            background-color: #00a03e;
            box-shadow: 0 3px 5px rgba(65,146,75,.4);
            &:hover{
                background-color: rgba(65,146,75,1);
            }
            &[disabled]{
                cursor: not-allowed;
                background-color: rgba(65,146,75,.6);
            }
        }

        &-preview{
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            border-top: 1px solid #ebedec;
        }

        &-title{
            padding: 10px;
            font-size: 16px;
            color: #666;
            font-weight: bold;
        }

        &-video{
            width: 600px;
            height: 300px;
        }

        &-recording{
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            margin: 5px 0;
        }

        &-point{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border: 2px solid #D74B4B;
            border-radius: 30px;
        }

        &-time{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 10px;
            font-size: 14px;
            color: #D74B4B;
        }

    }

    .record{
        &:after{
            content: '';
            display: block;
            width: 15px;
            height: 15px;
            background-color: #D74B4B;
        }

        &+.circle-time{
            &:before{
                content: '';
                display: block;
                width: 5px;
                height: 5px;
                margin-right: 5px;
                border-radius: 5px;
                background-color: #D74B4B;
            }
        }
    }

    .stop{
        &:after{
            content: '';
            display: block;
            position: relative;
            left: 10px;
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 15px solid transparent;
            border-left: 15px solid transparent;
            border-left-color: #D74B4B; 
        }
    }

</style>

