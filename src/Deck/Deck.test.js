import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Deck from './Deck';

describe('<Deck />', () => {
  test('matches snapshot', () => {
    const cards = [
      { suit: 'HEARTS', value: '10' },
      { suit: 'SPADES', value: '8' },
      { suit: 'HEARTS', value: '9' },
    ];
    const tree = shallow(<Deck cards={cards} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});