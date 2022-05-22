import { render,screen } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import { axe, toHaveNoViolations } from 'jest-axe'

import * as Stories from '../__stories__/MyButton.stories'

const { Primary } = composeStories(Stories)


describe( 'Basic Functionality', () => {
  test('test the story ', async () => {
    const onClickSpy = jest.fn();
    const { container } = render(Primary({ onClick: onClickSpy }));
    const buttonElement = screen.getByRole('button')
    buttonElement.click();
    expect(onClickSpy).toHaveBeenCalled()
  })

  test('should demonstrate this matcher`s usage', async () => {
    const { container } = render(Primary({ label: 'Button'}))
    const results = await axe(container)
  })

  test.todo('boom')


})
