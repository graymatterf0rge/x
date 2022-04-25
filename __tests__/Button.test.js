import { render,screen } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import { axe, toHaveNoViolations } from 'jest-axe'
import * as Stories from '../__stories__/Button.stories'

const { Primary } = composeStories(Stories)

expect.extend(toHaveNoViolations)

describe( 'Basic Functionality', () => {
  test('test the story ', async () => {
    const onClickSpy = jest.fn();
    const { container } = render(Primary({ onClick: onClickSpy }));
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(onClickSpy).toHaveBeenCalled()
  })

  test('should demonstrate this matcher`s usage', async () => {
    const { container } = render(Primary({ label: 'Button'}))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test.todo('boom')


})
