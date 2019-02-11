import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import each from 'jest-each';
import waitUntil from 'async-wait-until';
import mockAxios from 'axios';
import App from './App';
import { gameState as s } from '../utils';

describe('<App />', () => {
  each([
    [
      'player1',
      [],
      0,
      [
        { value: 'A', suit: 'SPADES' }
      ],
      [],
      [
        { value: 'A', suit: 'SPADES' }
      ],
      11,
    ],
    [
      'player2',
      [
        { value: 'A', suit: 'SPADES' }
      ],
      11,
      [
        { value: 'K', suit: 'HEARTS' },
        { value: 'J', suit: 'CLUBS' },
      ],
      [
        { value: 'J', suit: 'CLUBS' },
      ],
      [
        { value: 'A', suit: 'SPADES' },
        { value: 'K', suit: 'HEARTS' },
      ],
      21,
    ],
  ]).test('players draws card', (player, currentPlayerCards, currentScore, deck, expectedRemainingDeck, expectedPlayerCards, expectedScore) => {
    const app = mount(<App />);
    app.setState({
      deck,
      [player]: {
        name: 'Christer',
        score: currentScore,
        cards: currentPlayerCards,
      }
    });
    app.instance().drawCard(player);
    expect(app.state('deck')).toEqual(expectedRemainingDeck);
    expect(app.state(player).score).toBe(expectedScore);
    expect(app.state(player).cards).toEqual(expectedPlayerCards);
  });

  test('displays error message', () => {
    const tree = mount(<App />);
    tree.setState({ error: 'some error' });
    expect(tree.find('.errorMessage').text()).toBe('some error');
  });

  test('matches snapshot', () => {
    const tree = shallow(<App />);
    expect(
      toJson(tree)
    ).toMatchSnapshot();
  });

  test('can reset game', () => {
    const app = mount(<App />);
    app.setState({ error: 'some error' });
    app.instance().reset();
    expect(app.state('error')).toBe(undefined);
  });

  each([
    [
      [
        { value: 'A', suit: 'SPADES' },
        { value: 'A', suit: 'HEARTS' },
        { value: 'A', suit: 'CLUBS' },
        { value: 'A', suit: 'DIAMONDS' },
        { value: '2', suit: 'CLUBS' },
        { value: '3', suit: 'CLUBS' },
      ],
      s.BOTH_LOSE
    ],
    [
      [
        { value: 'A', suit: 'SPADES' },
        { value: 'K', suit: 'HEARTS' },
        { value: 'A', suit: 'CLUBS' },
        { value: 'K', suit: 'DIAMONDS' },
        { value: '2', suit: 'CLUBS' },
        { value: '3', suit: 'CLUBS' },
      ],
      s.BOTH_WINS
    ],
    [
      [
        { value: 'A', suit: 'SPADES' },
        { value: 'K', suit: 'HEARTS' },
        { value: 'A', suit: 'CLUBS' },
        { value: 'A', suit: 'DIAMONDS' },
        { value: '2', suit: 'CLUBS' },
        { value: '3', suit: 'CLUBS' },
      ],
      s.P1_WINS
    ],
    [
      [
        { value: 'A', suit: 'SPADES' },
        { value: 'A', suit: 'HEARTS' },
        { value: 'A', suit: 'CLUBS' },
        { value: 'K', suit: 'DIAMONDS' },
        { value: '2', suit: 'CLUBS' },
        { value: '3', suit: 'CLUBS' },
      ],
      s.P2_WINS
    ],
  ]).test('can start game', async (deck, expectedGameState) => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: deck
    }));
    const app = mount(<App />);
    await waitUntil(() => app.state('deck').length !== 0);
    expect(app.state('gameState')).toBe(expectedGameState);
  });
});