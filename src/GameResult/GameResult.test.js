import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import each from 'jest-each';
import GameResult from './GameResult';
import { gameState as s } from '../utils';

describe('<GameResult />', () => {
  each([
    [
      s.BOTH_WINS,
      'name 1',
      'name 2',
      'Both won!'
    ],
    [
      s.BOTH_LOSE,
      'name 1',
      'name 2',
      'Both lose!'
    ],
    [
      s.P1_WINS,
      'name 1',
      'name 2',
      'name 1 won!'
    ],
    [
      s.P2_WINS,
      'name 1',
      'name 2',
      'name 2 won!'
    ],
  ]).test('renders as expected', (result, p1, p2, expectedText) => {
    expect(
      shallow(
        <GameResult result={result} p1={p1} p2={p2} />
      ).find('h2').text()
    ).toBe(expectedText);
  });

  test('does not render for all results', () => {
    expect(
      shallow(
        <GameResult result={s.P1_DRAWS} p1="name 1" p2="name 2" />
      ).find('h2').exists()
    ).toBe(false);
  });

  test('matches snapshot', () => {
    const tree = shallow(
      <GameResult result={s.BOTH_WINS} p1="name1" p2="name2" />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});