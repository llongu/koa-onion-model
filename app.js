const Koa = require("./main");
const app = new Koa();
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(5);
})
app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(4);
})
app.use(async (ctx, next) => {
  console.log(3);
  ctx.end('200')
})


app.on('error', (err) => {
  console.log('error=>\n', err);
})
app.listen(3000, () => {
  console.log('service is running');
})

