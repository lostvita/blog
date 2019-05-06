/**
 * 节流组件
 */

const throttle = (func, wait, before) => {
    let isInvoking = false
    wait = wait || 300
    return (arg) => {
        if (isInvoking) return
        isInvoking = true
        before && before.call(this)
        window.setTimeout(async () => {
            if(!Array.isArray(func)) {
                func = [func]
            }
            for(let i in func) {
                await func[i].call(this, arg)
            }
            isInvoking = false
        }, wait)
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

const pruneThrottle = (vm, filter) => {
    const { throttleMap, originMap, __vnode } = vm
    Object.keys(throttleMap).filter(!filter).forEach((each) => {
        Reflect.deleteProperty(throttleMap, each)
        Reflect.set(__vnode.data.on, each, originMap[each])
    })
}

export default {
    name: 'Throttle',
    abstract: true,
    props: {
        include: [Array, String, RegExp],
        exclude: [Array, String, RegExp],
        time: [String, Number],
        before: Function
    },
    created () {
        this.originMap = new Map // 缓存原始函数
        this.throttleMap = new Map // 缓存节流函数
        this.default = new Set // 缓存默认节流的事件类型
        this.__vnode = null // 节流组件包裹的组件实例
    },
    mounted () {
        this.$watch('include', val => { // 监听include参数变化，实时更新节流函数
            pruneThrottle(this, name => matchs(val, name))
        })
        this.$watch('exclude', val => {
            pruneThrottle(this, name => !matchs(val, name))
        })
    },
    destroyed () {
        this.originMap = new Map
        this.throttleMap = new Map
        this.default = new Set
        this.__vnode = null
    },
    render () {
        console.log(this.$slots.default)
        const vnode = this.$slots.default[0] || Object.create(null)
        this.__vnode = vnode
        // 针对不同的元素类型设置默认节流事件
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
                this.originMap.set(each, vnode.data.on[each]) // 缓存原始事件函数
                this.throttleMap.set(each, throttle.call(vnode, vnode.data.on[each], timer, this.before)) // 缓存节流事件函数
                vnode.data.on[each] = this.throttleMap.get(each) // 重新赋值组件实例的事件函数
            }
        })
        return vnode
    }
}
