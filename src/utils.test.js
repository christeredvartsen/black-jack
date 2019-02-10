import { getCardValue, getCardsScore, getGameState, gameState } from './utils';
import each from 'jest-each';

each([
  [{ value: 'A' }, 11],
  [{ value: 'K' }, 10],
  [{ value: 'Q' }, 10],
  [{ value: 'J' }, 10],
  [{ value: '10' }, 10],
  [{ value: '2' }, 2],
]).test('Can get card value', (card, expectedValue) => {
  expect(getCardValue(card)).toBe(expectedValue);
});

each([
  [21, 21, gameState.BOTH_WINS],
  [22, 23, gameState.BOTH_LOSE],
  [21, 17, gameState.P1_WINS],
  [21, 22, gameState.P1_WINS],
  [22, 10, gameState.P2_WINS],
  [18, 19, gameState.P2_WINS],
  [18, 18, gameState.P2_DRAWS],
  [16, 18, gameState.P1_DRAWS],
]).test('Can pick correct game state', (p1, p2, expectedState) => {
  expect(getGameState(p1, p2)).toBe(expectedState);
});

each([
  [
    [],
    0
  ],
  [
    [{ suit: 'HEARTS', value: '10' }],
    10
  ],
  [
    [{ suit: 'SPADES', value: 'A' }, { suit: 'HEARTS', value: 'A' }],
    22
  ],
  [
    [{ suit: 'SPADES', value: 'A' }, { suit: 'HEARTS', value: 'K' }],
    21
  ],
  [
    [{ suit: 'SPADES', value: '2' }, { suit: 'HEARTS', value: '3' }],
    5
  ],
]).test('Can calculate correct score for a set of cards', (cards, expectedScore) => {
  expect(getCardsScore(cards)).toBe(expectedScore);
});