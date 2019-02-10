import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import each from 'jest-each';
import Board from './Board';
import { gameState as s } from '../utils';

describe('<Board />', () => {
  const player1 = {
    name: 'name1',
    score: 0,
    cards: [],
  };
  const player2 = {
    name: 'name2',
    score: 0,
    cards: [],
  };

  each([
    [s.P1_DRAWS, 'player1'],
    [s.P2_DRAWS, 'player2'],
  ]).test('players can draw cards', (state, callbackArgument) => {
    const draw = jest.fn();
    const component = mount(
      <Board
        deck={[]}
        player1={player1}
        player2={player2}
        drawCard={draw}
        reset={jest.fn()}
        gameState={state}
      />
    );
    component.find('Player button').simulate('click');

    expect(draw).toHaveBeenCalledTimes(1);
    expect(draw).toHaveBeenCalledWith(callbackArgument);

  });

  test('matches snapshot', () => {
    const tree = shallow(
      <Board
        deck={[]}
        player1={player1}
        player2={player2}
        drawCard={jest.fn()}
        reset={jest.fn()}
        gameState={s.P1_WINS}
      />
    )
    expect(toJson(tree)).toMatchSnapshot();
  });
});