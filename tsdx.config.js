const images = require("@rollup/plugin-image");
const postcss = require("rollup-plugin-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  rollup(config) {
    config.plugins = [
      images({ incude: ["**/*.png", "**/*.jpg"] }),
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: "default",
          }),
        ],
        inject: true,
        extract: false,
      }),
      ...config.plugins,
    ];

    return config;
  },
};
