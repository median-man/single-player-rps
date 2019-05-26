const choices = Object.freeze({
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
})

const outcomes = Object.freeze({
  WIN: 'win',
  LOSS: 'loss',
  TIE: 'tie'
})

function createScore() {
  return {
    wins: 0,
    losses: 0,
    ties: 0,
  }
}
