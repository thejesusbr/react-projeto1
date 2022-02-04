/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
const { default: userEvent } = require('@testing-library/user-event');
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchString', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchString="test value" />);
    const input = screen.getByPlaceholderText(/search.../i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test value');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchString="" />);

    const input = screen.getByPlaceholderText(/search.../i);
    const value = 'test value';
    userEvent.type(input, value);
    expect(input.value).toBe('');

    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();

    const { container } = render(<TextInput handleChange={fn} searchString="" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
