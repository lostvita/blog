<template>
  <div class="wrapper">
    <div class="container">
      <h3 class="title">Canvas自由落体模拟演示</h3>
      <div class="box">
        <canvas ref="$canvas" class="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Ball from '@/js/ball'
export default {
  name: 'FreeFalling',
  methods: {
    initCanvas () {
      const $canvas = this.$refs.$canvas
      $canvas.width = 800
      $canvas.height = 400
      const ball = new Ball($canvas, {
        y: 50,
        radius: 20,
        color: '#00a03e'
      })

      ball.easing = function (data) {
        console.log(data)
      }

      ball.run(1500)
    }
  },

  mounted () {
    this.initCanvas()
  }
}
</script>

<style lang="scss" scoped>
  .canvas{
    border-bottom: 1px solid #ccc;
  }
</style>

