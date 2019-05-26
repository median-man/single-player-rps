const choices = Object.freeze({
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
})

function createScore() {
  return {
    wins: 0,
    losses: 0,
    ties: 0,
  }
}
