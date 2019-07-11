<template>
    <div class="wrapper">
        <div class="containner">
            <h3 class="title">DataTransfer.dropEffect效果演示</h3>
            <div class="body">
                <div class="form">
                    <div class="form-group">
                        <label class="form-label" for="">move</label>
                        <input type="radio" class="form-ctrl" v-model="dropEffect" value="move" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">copy</label>
                        <input type="radio" class="form-ctrl" v-model="dropEffect" value="copy" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">link</label>
                        <input type="radio" class="form-ctrl" v-model="dropEffect" value="link" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">none</label>
                        <input type="radio" class="form-ctrl" v-model="dropEffect" value="none" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">image</label>
                        <input type="radio" class="form-ctrl" v-model="dropEffect" value="image" />
                    </div>
                </div>
                <div class="box">
                    <div class="box-material">
                        <p class="box-txt">谁向云端着此亭，檐前树木映窗棂。</p>
                        <img src="@assets/jn.jpg" alt="">
                    </div>
                    <textarea ref="ele" name="" id=""class="box-textarea" placeholder="拖动文本或图片过来..." title="拖动到该区域时留意鼠标状态的变化"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataTransfer',
    data () {
        return {
            dropEffect: 'move',
            isImage: false
        }
    },

    methods: {
        initDrag () {
            const $ele = this.$refs.ele
            document.addEventListener('dragstart', this.dragstartHandle, {
                capture: false,
                passive: false
            })

            $ele.addEventListener('dragenter', (e) => {
                // e.preventDefault()
                console.log('dragenter')
            }, {
                capture: false,
                passive: false
            })

            $ele.addEventListener('dragover', this.dragoverHandle, {
                capture: false,
                passive: false
            })
            $ele.addEventListener('dragleave', (e) => {
                // e.preventDefault()
                console.log('dragleave')
            }, {
                capture: false,
                passive: false
            })
            $ele.addEventListener('drop', (e) => {
                // e.preventDefault()
                console.log('drop')
            }, {
                capture: false,
                passive: false
            })
            document.addEventListener('dragend', (e) => {
                // e.preventDefault()
                console.log('dragend')
            }, {
                capture: false,
                passive: false
            })
        },

        dragstartHandle (e) {
            console.log('dragstart')
            if(this.isImage) {
                const img = new Image()
                img.src = '/blog/fire.ico'
                e.dataTransfer.setDragImage(img, 50, 5)
            }
        },

        dragoverHandle (e) {
            e.preventDefault()
            console.log('dragover')
            e.dataTransfer.dropEffect = this.dropEffect
        },

        setMouse () {
            this.isImage = false
            const $ele = this.$refs.ele
            $ele.removeEventListener('dragover', this.dragoverHandle)
            $ele.addEventListener('dragover', (e) => {
                e.preventDefault()
                console.log('dragover')
                e.dataTransfer.dropEffect = this.dropEffect
            }, {
                capture: false,
                passive: false
            })
        },

        setImage () {
            this.isImage = true
            document.removeEventListener('dragstart', this.dragstartHandle)
            document.addEventListener('dragstart', this.dragstartHandle, {
                capture: false,
                passive: false
            })
        }
    },

    watch: {
        dropEffect (val) {
            if(val === 'image') {
                this.setImage()
            } else {
                this.setMouse()
            }
        }
    },

    mounted () {
        this.initDrag()
    }
}
</script>


<style lang="scss" scoped>
    .form{
        padding: 10px 30px;
        display: flex;
        flex-wrap: wrap;

        &-group{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 180px;
            height: 30px;
            margin-right: 20px;
            margin-bottom: 20px;
            box-shadow: 0 3px 5px rgba(0,0,0,.12);
            color: #333333;

            &:hover{
                color: #4695d6;
                box-shadow: 0 3px 5px  rgba(70,149,214,.32);
            }
        }

        &-label{
            font-size: 14px;
            margin-right: 10px;
        }

        &-ctrl{
            cursor: pointer;
        }
    }

    .box{
        display: flex;
        flex-direction: column;
        padding: 10px 30px;

        &-textarea{
            width: 100%;
            height: 80px;
            margin-top: 30px;
        }
    }

</style>

