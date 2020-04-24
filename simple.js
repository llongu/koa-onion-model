function a(next) { console.log(1); next(); console.log(5); }
function b(next) { console.log(2); next(); console.log(4) }
function c(next) { console.log(3); }

const arr = [a, b, c]

let next = () => { }
function createFn(fn, next) {
  return () => fn(next)
}
for (let i = arr.length - 1; i >= 0; i--) {
  next = createFn(arr[i], next)
}
next()