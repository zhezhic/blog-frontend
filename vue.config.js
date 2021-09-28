
const path = require('path')


function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    //关闭eslint语法检查
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            // .set('路径别名', resolve('vue.config文件的相对路径'))
            .set('api', resolve('./src/api'))
            .set('comps', resolve('./src/components'))
            .set('views', resolve('./src/views'))
            .set('style', resolve('./src/style'))
            .set('utils', resolve('./src/utils'))
            .set('router', resolve('./src/router'))
            .set('config', resolve('./src/config'))
    },
    configureWebpack: (config)=>{
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {loader: 'vue-loader'},
                {
                    loader: require.resolve('./markdownLoader.js')
                }
            ]
        })
    },
    // devServer: {
    //     proxy: {  //配置跨域
    //         '/randomBackground': {
    //             target: 'https://api.btstu.cn/sjbz/?lx=dongman',  //这里后台的地址模拟的;应该填写你们真实的后台接口
    //             changOrigin: true,  //允许跨域
    //             pathRewrite: {
    //                 /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
    //                   实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
    //                  */
    //                 '^/api': ''
    //             }
    //         },
    //     }
    // },
}
