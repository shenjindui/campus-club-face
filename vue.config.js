/**
 * author shenjindui 2019.12.26
 * vue配置文件
 * @type {{devServer: {proxy: {"/ms": {changeOrigin: boolean, target: string}, "/api": {changeOrigin: boolean, pathRewrite: {"^/api": string}, target: string}}}, outputDir: string, productionSourceMap: boolean, baseUrl: string, css: {loaderOptions: {sass: {data: string}}, extract: boolean, sourceMap: boolean, modules: boolean}, pages: undefined, parallel: boolean, configureWebpack: module.exports.configureWebpack, assetsDir: string, runtimeCompiler: boolean, lintOnSave: boolean, chainWebpack: module.exports.chainWebpack}}
 */
module.exports = {
    /**
     * 关闭eslint规范
     */
    lintOnSave:false,
    /**
     * 基本路径
     */
    baseUrl: '/',
    /**
     * 输出文件目录
     */
    outputDir: 'dist',
    /**
     * eslint-loader 是否在保存的时候检查
     */
    lintOnSave: true,
    /**
     * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
     */
    assetsDir: 'static',
    /**
     * 以多页模式构建应用程序。
     */
    pages: undefined,
    /**
     * 是否使用包含运行时编译器的 Vue 构建版本
     */
    runtimeCompiler: false,
    /**
     * 是否为 Babel 或 TypeScript 使用 thread-loader。
     * 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，
     * 在适当的时候开启几个子进程去并发的执行压缩
     */
    parallel: require('os').cpus().length > 1,
    /**
     * 生产环境是否生成 sourceMap 文件，一般情况不打开
     */
    productionSourceMap: false,
    /**
     * webpack配置
     * @param config
     */
    chainWebpack: config => {
        /**
         * 删除懒加载模块的prefetch，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
         */
        //config.plugins.delete('prefetch');
        //if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
        //} else {// 为开发环境修改配置...
        //}
    },
    //调整 webpack 配置
    configureWebpack: config => {
        //生产与测试环境
        /*let pluginsPro = [
            new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
                threshold: 8192,
                minRatio: 0.8,
            }),
            //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
            new BundleAnalyzerPlugin(),
        ];*/
        //开发环境
        /*let pluginsDev = [
            //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
            new vConsolePlugin({
                filter: [], // 需要过滤的入口文件
                enable: true // 发布代码前记得改回 false
            }),
        ];
        if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
            config.plugins = [...config.plugins, ...pluginsPro];
        } else {
            // 为开发环境修改配置...
            config.plugins = [...config.plugins, ...pluginsDev];
        }*/
    },
    css: {
        /**
         * 启用 CSS modules
         */
        modules: false,
        /**
         * 是否使用css分离插件
         */
        extract: true,
        /**
         * 开启 CSS source maps，一般不开启
         */
        sourceMap: false,
        /**
         * css预设器配置项
         */
        loaderOptions: {
            sass: {
                //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
                data: `
				$baseUrl: "/";
				@import '@/assets/scss/_common.scss';
				`
                //data: `
                //$baseUrl: "/";
                //`
            }
        }
    },
    devServer: {
        proxy: {
            '/api':{
                target: 'http://localhost:8889',// 这里设置调用的域名和端口号，需要http,注意不是https!
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api' //这边如果为空的话，那么发送到后端的请求是没有/api这个前缀的
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}
