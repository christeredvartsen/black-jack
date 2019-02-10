import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Player from './Player';

describe('<Player />', () => {
  const cards = [
    { suit: 'HEARTS', value: '10' },
    { suit: 'HEARTS', value: 'A' },
    { suit: 'SPADES', value: 'A' },
  ];

  test('does not render draw button for all players', () => {
    expect(
      shallow(
        <Player cards={cards} draw={false} drawCard={jest.fn()} name="some name" score={0} />
      ).find('button').exists()
    ).toBe(false);
  });

  test('can draw cards', () => {
    const draw = jest.fn();
    const component = shallow(
      <Player cards={cards} draw={true} drawCard={draw} name="some name" score={0} />
    );
    component.find('button').simulate('click');
    expect(draw).toHaveBeenCalledTimes(1);
  });

  test('generates unique keys for cards', () => {
    const component = shallow(
      <Player cards={cards} draw={true} drawCard={jest.fn()} name="some name" score={32} />
    );
    ['10H', 'AH', 'AS'].forEach(
      (expectedKey, i) => expect(
        component.find('ol li').at(i).key()
      ).toBe(expectedKey)
    );
  });

  test('matches snapshot', () => {
    const tree = shallow(
      <Player draw={true} drawCard={jest.fn()} name="Some name" score={0} cards={cards} />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});