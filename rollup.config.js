import { terser } from 'rollup-plugin-terser';

const pkgName = process.env.npm_package_name;
const outputCommon = {
  format: 'umd',
  globals: {
    jquery: '$',
  },
}

export default {
  external: ['jquery'],
  input: `./src/${pkgName}.js`,
  output: [
    {
      file: `./js/${pkgName}.js`,
    },
    {
      file: `./js/${pkgName}.min.js`,
      plugins: [terser()]
    },
  ].map(opts => Object.assign({}, outputCommon, opts)),
};
