/**
 * canvas绘制圆形
*/

import Timer from './timer'

class Ball {
  constructor (canvas, option) {
    this._canvas = canvas
    this._ctx = canvas.getContext('2d')
    this._opts = option || {}
    this._colors = ['#C04D00', '#f5587b', '#F75940', '#FF2E63', '#1794A5', '#00a03e']
    this.ball = null
    this.init()
  }

  get ctx () {
    return this._ctx
  }

  init () {
    const x = this._opts.x || this._canvas.width / 2
    const y = this._opts.y || this._canvas.height / 2
    const radius = this._opts.radius || 50
    const angle = this._opts.angle || 2 * Math.PI
    const color = this._opts.color || this._colors[(Math.random() * 6) | 0]
    this.ball = Object.assign({}, {
      x: x,
      y: y,
      color: color,
      angle: angle,
      radius: radius
    })
    this._draw(x, y, radius, angle, color)
  }

  _draw (x, y, radius, angle, color) {
    const ctx = this._ctx
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, angle, false)
    ctx.lineWidth = 0
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = color
    ctx.stroke()
  }

  easing () {
    console.log(11)
  }

  run (during) {
    const t = new Timer(during)
    const gravity = 9.8
    t.onProgress = (p) => {
      const x = this.ball.x
      const y = this.ball.y + gravity * (Math.cos(p * Math.PI))
      Object.assign(this.ball, {
        y: y
      })
      const radius = this.ball.radius
      const angle = this.ball.angle
      const color = this.ball.color
      this._draw(x, y, radius, angle, color)
    }
    t.start()
  }
}

export default Ball