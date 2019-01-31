const glob = require('glob')
const path     = require('path')
const webpack  = require('webpack')

function getPageEntry (globPath) {
    return glob.sync(globPath).reduce((acc, curr) => {
        const conf = require(curr)
        let paths = curr.split('/')
        paths.splice(-1)
        const app = paths.slice(-1)
        paths.push('index.js')
        return acc[app] = Object.assign({
            entry: paths.join('/'),
            title: app,
            template: 'public/' + app + '.html'
        }, conf), acc
    }, {})
}

module.exports = {
    // baseUrl: '/static/build',
    productionSourceMap: false,
    filenameHashing: false,
    outputDir: './dist',
    pages: getPageEntry('./src/views/**?/config.json'),

    // 配置merge
    configureWebpack: process.env.NODE_ENV === 'production' ? { // 开发环境不能使用改配置
        plugins: [
            // dllPlugin关联配置
            new webpack.DllReferencePlugin({
                // 跟dll.config里面DllPlugin的context一致
                context: process.cwd(), 
                
                // dll过程生成的manifest文件
                manifest: require(path.join(process.cwd(), "dll", "vendor-manifest.json"))
            })
        ],

        optimization: {

            // 根据需要为各应用分离代码块
            splitChunks: {
                cacheGroups: {
                    spring_festival: { // 分离spring_festival应用中的第三方库
                        name: 'spring-festival-vendor',
                        test: (module) => {
                            return /vue-router/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 1
                    },
                    common: {
                        name: 'chunk-common',
                        chunks: 'initial',
                        // 表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
                        priority: 2,
                        // 被引用次数
                        minChunks: 2,
                    }
                }
            }
        }
    } : {},

    // 基于环境条件配置
    chainWebpack: config => {
        if (process.env.ANALYZ) {
            config.plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    },
    devServer: {
        proxy: {
            '/api': {
                // 跨域 API 地址
                target: 'http://172.19.0.1:3000',
                // 如果要代理 websockets
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                autoRewrite: true,
                cookieDomainRewrite: true
            }
        }
    }
}