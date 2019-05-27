const choices = Object.freeze({
  ROCK: 'rock',
  PAPER: 'paper',
})

const outcomes = Object.freeze({
  WIN: 'wins',
  LOSS: 'loss',
  TIE: 'tie',
})

function createGame(getOpponentChoice) {
  return {
    wins: () => 0,
    losses: () => 0,
    ties: () => 0,
    evaluateUserChoice: userChoice => {
      const opponentChoice = getOpponentChoice()
      if (userChoice === opponentChoice) return outcomes.TIE
      return isWin(userChoice, opponentChoice) ? outcomes.WIN : outcomes.LOSS
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
