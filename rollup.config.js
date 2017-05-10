import babel from 'rollup-plugin-babel';
import multidest from 'rollup-plugin-multidest';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

const pkgName = process.env.npm_package_name;

export default {
  entry: `./src/${pkgName}.js`,
  external: ['jquery'],
  globals: {
    jquery: '$',
  },
  format: 'umd',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['es2015-rollup'],
    }),
    multidest([
      {
        dest: `./js/${pkgName}.min.js`,
        plugins: [
          uglify({}, minify),
        ],
      },
    ]),
  ],
  dest: `./js/${pkgName}.js`,
};
