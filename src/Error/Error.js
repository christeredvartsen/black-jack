import React from 'react';
import PropTypes from 'prop-types';
import RestartGame from '../RestartGame/RestartGame';
import './Error.scss';

const Error = ({ message, reset }) => (
  <React.Fragment>
    <p>An error occurred: <span className="errorMessage">{message}</span>.</p>
    <RestartGame reset={reset} />
  </React.Fragment>
);
Error.propTypes = {
  message: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Error;