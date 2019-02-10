const gameState = {
  BOTH_WINS: 'both win',
  BOTH_LOSE: 'both lose',
  P1_WINS: 'player 1 wins',
  P2_WINS: 'player 2 wins',
  P1_DRAWS: 'player 1 to draw',
  P2_DRAWS: 'player 2 to draw',
};

const getCardValue = ({ value }) => {
  let result;

  switch (value.toLowerCase()) {
    case 'j': // continue
    case 'q': // continue
    case 'k': result = 10; break;
    case 'a': result = 11; break;
    default: result = parseInt(value, 10);
  };

  return result;
};

const getCardsScore = (cards) => cards.reduce((score, card) => score + getCardValue(card), 0);

const getGameState = (p1, p2) => {
  if (p1 === 21 && p2 === 21) {
    return gameState.BOTH_WINS;
  } else if (p1 > 21 && p2 > 21) {
    return gameState.BOTH_LOSE;
  } else if (p2 > 21 || p1 === 21) {
    return gameState.P1_WINS;
  } else if (p1 > 21 || (p1 >= 17 && p2 > p1)) {
    return gameState.P2_WINS;
  } else if (p1 < 17) {
    return gameState.P1_DRAWS;
  } else {
    return gameState.P2_DRAWS;
  }
};

export {
  getCardValue,
  getCardsScore,
  gameState,
  getGameState,
};