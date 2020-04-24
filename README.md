## 洋葱模型实践

```
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

=>:1 2 3 4 5
```
