// 只针对具体的某个包进行打包

// 把package目录下所有包进行打包

const fs = require("fs");
const execa = require("execa"); // 开启子进程，进行打包， 最终还是使用rollup打包

const target = 'reactivity'
build(target)
async function build(target) {
  await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {
    stdio: "inherit", //把子进程打包的信息共享给父进程
  });
}

