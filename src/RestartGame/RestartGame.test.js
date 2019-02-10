import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RestartGame from './RestartGame';

describe('<RestartGame />', () => {
  test('can reset game', () => {
    const reset = jest.fn();
    shallow(
      <RestartGame reset={reset} />
    ).find('button').simulate('click');
    expect(reset).toHaveBeenCalledTimes(1);
  });

  test('matches snapshot', () => {
    const tree = shallow(
      <RestartGame reset={jest.fn()} />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});