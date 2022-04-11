import { render } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as Stories from '../stories/Button'

const { Primary } = composeStories(Stories)

describe( 'Basic Functionality', () => {
  test('test the story ', async () => {
    const { container } = render(Primary());
    await Stories.Primary.play?.({ canvasElement: container });
  })

  test.todo('boom')


})
