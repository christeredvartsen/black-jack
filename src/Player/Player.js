import React from 'react';
import PropTypes from 'prop-types';
import types from '../propTypes';
import './Player.scss';

const cardKey = (c) => c.value + c.suit.charAt(0);

const Player = ({ drawCard, name, score, cards, draw }) => {
  return (
    <fieldset className="player">
      <legend>{name}</legend>
      <dl>
        <dt>Score</dt>
        <dd className="playerScore">{score}</dd>
        <dt>Cards</dt>
        <dd className="playerCards">
          {cards.length > 0 ? (
            <ol>{cards.map((card) => <li key={cardKey(card)}>{cardKey(card)}</li>)}</ol>
          ) : <p>The player has no cards.</p>}
        </dd>
      </dl>
      {draw ? <button onClick={drawCard}>Draw</button> : null}
    </fieldset>
  );
};
Player.propTypes = {
  drawCard: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  cards: types.cards.isRequired,
  draw: PropTypes.bool.isRequired,
};

export default Player;