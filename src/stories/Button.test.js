import { render,screen } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as Stories from './Button.stories'

const { Primary } = composeStories(Stories)

describe( 'Basic Functionality', () => {
  test('test the story ', async () => {
    const onClickSpy = jest.fn();
    const { container } = render(Primary({ onClick: onClickSpy }));
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(onClickSpy).toHaveBeenCalled()
  })

  test.todo('boom')


})
