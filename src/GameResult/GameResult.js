import React from 'react';
import PropTypes from 'prop-types';
import { gameState as s } from '../utils';

const GameResult = ({ result, p1, p2 }) => {
  switch (result) {
    case s.BOTH_WINS: return <h2>Both won!</h2>;
    case s.BOTH_LOSE: return <h2>Both lose!</h2>;
    case s.P1_WINS: return <h2>{p1} won!</h2>;
    case s.P2_WINS: return <h2>{p2} won!</h2>;
    default: return null;
  }
}
GameResult.propTypes = {
  result: PropTypes.string.isRequired,
  p1: PropTypes.string.isRequired,
  p2: PropTypes.string.isRequired,
};

export default GameResult;