import { addDecorator } from '@storybook/vue3'
import { withTests } from '@storybook/addon-jest'

import results from '../.jest-test-results.json'
addDecorator(
  withTests({
    results,
  })
)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
