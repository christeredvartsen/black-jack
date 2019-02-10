import React from 'react';
import PropTypes from 'prop-types';

const RestartGame = ({ reset }) => (
  <button onClick={reset}>Restart game</button>
);
RestartGame.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default RestartGame;