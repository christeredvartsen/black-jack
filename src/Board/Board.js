import React from 'react';
import PropTypes from 'prop-types';
import Deck from '../Deck/Deck';
import GameResult from '../GameResult/GameResult';
import Player from '../Player/Player';
import RestartGame from '../RestartGame/RestartGame';
import { gameState as s } from '../utils';
import types from '../propTypes';
import './Board.scss';

const Board = ({ drawCard, gameState, reset, deck, player1, player2 }) => (
  <div>
    <Deck cards={deck} />
    <GameResult result={gameState} p1={player1.name} p2={player2.name} />
    <div className="players">
      <Player {...player1} drawCard={() => drawCard('player1')} draw={gameState === s.P1_DRAWS} />
      <Player {...player2} drawCard={() => drawCard('player2')} draw={gameState === s.P2_DRAWS} />
    </div>
    <RestartGame reset={reset} />
  </div>
);
Board.propTypes = {
  deck: types.cards.isRequired,
  gameState: PropTypes.string.isRequired,
  drawCard: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  player1: types.player.isRequired,
  player2: types.player.isRequired
};

export default Board;