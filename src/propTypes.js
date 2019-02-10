import PropTypes from 'prop-types';

const card = PropTypes.shape({
  suit: PropTypes.oneOf(['HEARTS', 'SPADES', 'CLUBS', 'DIAMONDS']).isRequired,
  value: PropTypes.oneOf(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']).isRequired,
});
const cards = PropTypes.arrayOf(card);
const player = PropTypes.shape({
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  cards: cards.isRequired,
});

export default {
  card,
  cards,
  player,
};