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
  let wins = 0

  return {
    wins: () => wins,
    losses: () => 0,
    ties: () => 0,
    evaluateUserChoice: userChoice => {
      const opponentChoice = getOpponentChoice()
      if (userChoice === opponentChoice) {
        return outcomes.TIE
      }
      if (isWin(userChoice, opponentChoice)) {
        wins += 1
        return outcomes.WIN
      }
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
