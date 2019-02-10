import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Error from './Error';

describe('<Error />', () => {
  test('matches snapshot', () => {
    const tree = shallow(
      <Error message="some error message" reset={jest.fn()} />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});