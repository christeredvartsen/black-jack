import React from 'react';
import types from '../propTypes';

const Deck = ({ cards }) => (
  <p>There are {cards.length} cards left in the deck.</p>
);
Deck.propTypes = {
  cards: types.cards.isRequired,
};

export default Deck;