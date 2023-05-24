import { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/react-webpack5",
    "@storybook/addon-interactions",
  ],
  docs: {
    autodocs: "tag",
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  babel: async options => ({
    // Update your babel configuration here

    ...options,
  }),

  webpackFinal: async config => {
    if (config && config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      });
    }

    return config;
  },
};

export default config;
