const { mergeConfig } = require('vite')
const AutoImport = require('unplugin-auto-import/vite')


const Unocss = require('unocss/vite');

module.exports = {
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
          AutoImport({
            imports: [
                'vue',
                'vue-router',
            ],
            dts: 'src/auto-import.d.ts',
          })
      ],
      resolve: {
        alias: {
          path: require.resolve('path-browserify'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve("stream-browserify")
        }
      }
    })
  },
  "stories": [
    "../__stories__/*.stories.mdx",
    "../__stories__/*.stories.js"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "@storybook/addon-a11y",
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "buildStoriesJson": true,
    "interactionsDebugger": true,
  },
}
