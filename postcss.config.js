var cssnano = require('cssnano');

module.exports = {
  plugins: [
    cssnano({
      autoprefixer: {add: true},
    }),
  ]
};
