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
    }
}
