// console.log(process.env.TARGET, 'rolluppppppppppppppppp')
import path from "path";
import json from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";

const packagesDir = path.resolve(__dirname, "packages");
// 找到要打包的某个包
const packageDir = path.resolve(packagesDir, process.env.TARGET);
// 永远拼接的是某个模块  针对于某个模块
const resolve = (p) => path.resolve(packageDir, p);

const pkg = require(resolve("package.json"));

const name = path.basename(packageDir);
// 对打包类型先做一个映射表，根据提供的formats 来格式化需要打包的内容
const outputConfig = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  },
};

const options = pkg.buildOpitons;
/**
 * 创建一个打包配置文件
 * @param {*} format
 * @param {*} output 打包输出的配置
 */
function createConfig(format, output) {
  output.name = options.name;
  output.sourcemap = true;

  return {
    input: resolve("src/index.ts"),
    output,
    plugins: [
      json(),
      ts({ // ts 插件
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      resolvePlugin() // 解析第三方模块插件
    ],
  };
}

export default options.formats.map((format) =>
  createConfig(format, outputConfig[format])
);
