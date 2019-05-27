const choices = Object.freeze({
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
})

const outcomes = Object.freeze({
  WIN: 'win',
  LOSS: 'loss',
  TIE: 'tie',
})

function createGame(getOpponentChoice) {
  let wins = 0
  let losses = 0
  let ties = 0
  return {
    wins: () => wins,
    losses: () => losses,
    ties: () => ties,
    evaluateUserChoice: userChoice => {
      const opponentChoice = getOpponentChoice()
      if (userChoice === opponentChoice) {
        ties += 1
        return outcomes.TIE
      }
      if (isWin(userChoice, opponentChoice)) {
        wins += 1
        return outcomes.WIN
      }
      losses += 1
      return outcomes.LOSS
    },
  }

  function isWin(userChoice, opponentChoice) {
    const { PAPER, ROCK, SCISSORS } = choices
    return (
      (userChoice === PAPER && opponentChoice === ROCK) ||
      (userChoice === SCISSORS && opponentChoice === PAPER) ||
      (userChoice === ROCK && opponentChoice === SCISSORS)
    )
  }
}

function randomChoice() {
  const values = Object.values(choices)
  const index = Math.floor(Math.random() * values.length)
  return values[index]
}
