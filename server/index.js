require('babel-core/register')

var express = require('express')
var compress = require('compression')
var app = module.exports = express()
var path = require('path')
var mockjs = require('express-mockjs')

var config = require('../config').default
var paths = config.get('utils_paths')

console.log(config.get('proxy_env'))
if (config.get('proxy_env') == 'lo') {
    // 启用本地服务后
    /* 设定本地mock服务的端口为8088 */
    var port = 8088
    /* 自定义路径 */
    app.use('/api', mockjs(path.join(__dirname, 'mocks')))
    /* 绑定端口 */
    app.listen(port, () => {
        console.log(`Mock server listening on port${port}`)
    })
}

// Express 中间件
var middleware = ['csrf', 'router', 'proxy', 'static', 'error']
middleware.forEach(function (m) {
    middleware.__defineGetter__(m, function () {
        return require('./middleware/' + m);
    });
})

// 主页
var indexPage = ''
if (config.get('env') === 'development') {
  indexPage = 'http://' + config.get('server_host') + ':' + config.get('webpack_port') + '/index.html'
} else {
  indexPage = paths.dist('index.html')
}

app.set('port', config.get('server_port'))
app.set('root', paths.project())
app.set('logger', console)

// gizp压缩
app.use(compress())
// 设置主页
app.use(middleware.router({index: indexPage}))

// 设置反向代理
var serverAPI = config.get("server_api")
if (serverAPI) {
  for (var i = 0; i < serverAPI.length; i++) {
    var apiRoot = serverAPI[i].root
    for (var p in serverAPI[i].proxy) {
      app.use(path.join(apiRoot, p).replace(/\\/g, '/'), middleware.proxy(serverAPI[i].proxy[p]))
    }
  }
}

// 设置中间件
app.use(middleware.static(paths.dist()))
app.use(middleware.error())

if (require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'))
    })
}
