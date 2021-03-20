const { effectWatch, reactivity } = require("../core/reactivity/index.js");

const a = reactivity({ age: 18 });
let b;
effectWatch(() => {
  b = a.age + 100;
  console.log(b);
});
a.age = 20;
