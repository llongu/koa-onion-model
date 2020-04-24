const EventEmitter = require("events");
const http = require("http");
class App extends EventEmitter {
  constructor() {
    super()
    this.middlewares = []
  }

  use(fn) {
    this.middlewares.push(fn)
  }
  callback() {
    return async (req, res) => {
      const fn = async () => {
        const midLen = this.middlewares.length - 1
        // next = ()=>{}
        // next = 3()
        // next = 2(next) //思路 把后置函数保存起来 传入前置函数 实现依次调用
        // next = 1(next)
        // next()
        function createNextFn(midFn, next) {
          return async () => {
            await midFn(res, next)
          }
        }

        let next = async () => { return await Promise.resolve() }
        for (let i = midLen; i >= 0; i--) {
          next = createNextFn(this.middlewares[i], next)
        }
        await next()
      }
      fn().catch(e => {
        this.onerror(e, res)
      })

    }
  }
  onerror(err, res) {
    res.end(err.message);
    this.emit("error", err);
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = App