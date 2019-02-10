import React, { Component } from 'react';
import axios from 'axios';
import Board from '../Board/Board';
import Error from '../Error/Error';
import { getCardsScore, gameState as s, getGameState } from '../utils';

const DECK_URL = 'https://nav-deckofcards.herokuapp.com/shuffle';

const initialState = {
  error: undefined,
  deck: [],
  player1: {
    name: 'Christer',
    score: 0,
    cards: [],
  },
  player2: {
    name: 'Magnus',
    score: 0,
    cards: [],
  },
  gameState: s.P1_DRAWS,
};

class App extends Component {
  requestSource = axios.CancelToken.source();
  state = Object.assign({}, initialState);

  drawCard = (currentPlayer) => {
    const [card, ...rest] = this.state.deck;
    const playersCards = [...this.state[currentPlayer].cards, card];
    const newScore = getCardsScore(playersCards);
    const updatedPlayer = Object.assign({}, this.state[currentPlayer], {
      cards: playersCards,
      score: newScore,
    });

    const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    const gameState = currentPlayer === 'player1'
      ? getGameState(updatedPlayer.score, this.state[otherPlayer].score)
      : getGameState(this.state[otherPlayer].score, updatedPlayer.score);

    this.setState({
      deck: rest,
      [currentPlayer]: updatedPlayer,
      gameState,
    });
  };

  reset = () => {
    this.setState(Object.assign({}, initialState));
    this.startGame();
  };

  startGame = () => {
    axios.get(DECK_URL, {
      timeout: 5000,
      cancelToken: this.requestSource.token
    }).then(({ data: deck }) => {
      const [c1, c2, c3, c4, ...rest] = deck;
      const player1Cards = [c1, c2];
      const player1Score = getCardsScore(player1Cards);
      const player2Cards = [c3, c4];
      const player2Score = getCardsScore(player2Cards);

      const player1 = Object.assign({}, this.state.player1, {
        cards: player1Cards,
        score: player1Score,
      });
      const player2 = Object.assign({}, this.state.player2, {
        cards: player2Cards,
        score: player2Score,
      });
      const gameState = getGameState(player1Score, player2Score);

      this.setState({
        deck: rest,
        player1,
        player2,
        gameState,
      });
    }).catch((error) => {
      this.setState({
        error: error.message
      });
    });
  };

  componentDidMount() {
    this.startGame();
  }

  componentWillUnmount() {
    this.requestSource && this.requestSource.cancel('Request cancelled');
  }

  render() {
    return typeof this.state.error !== 'undefined' ? (
      <Error message={this.state.error} reset={this.reset} />
    ) : this.state.deck.length > 0 ?
        <Board
          gameState={this.state.gameState}
          reset={this.reset}
          deck={this.state.deck}
          player1={this.state.player1}
          player2={this.state.player2}
          drawCard={this.drawCard}
        />
        : <p>Loading deck...</p>;
  }
}

export default App;
