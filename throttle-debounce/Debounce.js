/**
 * 防抖组件
 */

const debounce = (func, delay, before) => {
  let timer = null
  delay = delay || 300
  return (arg) => {
      if (timer) {
          window.clearTimeout(timer)
      }
      before && before.call(this)
      timer = window.setTimeout(async () => {
          if(!Array.isArray(func)) {
            func = [func]
          }
          for(let i in func) {
            await func[i].call(this, arg)
          }
          timer = null
      }, delay)
  }
}

const isRegExp = (val) => {
  return Object.prototype.toString.call(val) === '[object RegExp]'
}

const match = (pattern, name) => {
  if(Array.isArray(pattern)) return pattern.includes(name)
  if(typeof pattern === 'string') return new Set(pattern.split(',')).has(name)
  if(isRegExp(pattern)) return pattern.test(name)
  return false
}

const pruneDebounce = (vm, filter) => {
  const { debounceMap, originMap, _vnode } = vm
  Object.keys(debounceMap).filter(!filter).forEach((each) => {
      Reflect.deleteProperty(debounceMap, each)
      Reflect.set(_vnode.data.on, each, originMap[each])
  })
}

export default {
  name: 'Debounce',
  abstract: true,
  props: {
    include: [Array, String, RegExp],
    exclude: [Array, String, RegExp],
    time: [String, Number],
    before: Function
  },
  created () {
    this.originMap = new Map
    this.debounceMap = new Map
    this.default = new Set
    this._vnode = null
  },
  mounted () {
    this.$watch(include, val => { // 监听include参数变化，实时更新防抖函数
        pruneDebounce(this, name => matchs(val, name))
    })
    this.$watch(exclude, val => {
        pruneDebounce(this, name => !matchs(val, name))
    })
},
  destroyed () {
    this.debounceMap = new Map
    this.default = new Set
  },
  render () {
    const vnode = this.$slots.default[0] || Object.create(null)
    this._vnode = vnode
    if(vnode.tag === 'input') {
      this.default.add('input')
    } else if(vnode.tag === 'button') {
      this.default.add('click')
    }
    const { include, exclude, time } = this
    const evts = Object.keys(vnode.data.on)
    const timer = parseInt(time)
    evts.forEach((each) => {
      if(
        (include && match(include, each))
        || (exclude && !match(exclude, each))
        || (!match(exclude, each) && this.default.has(each))
      ) {
        this.originMap.set(each) = vnode.data.on[data]
        this.debounceMap.set(each, debounce.call(vnode, vnode.data.on[each], timer, this.before))
        vnode.data.on[each] = this.debounceMap.get(each)
      }
    })
    return vnode
  }
}