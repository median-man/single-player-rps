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

function createScore() {
  let wins = 0
  let losses = 0
  let ties = 0
  return {
    wins: () => wins,
    losses: () => losses,
    ties: () => ties,
    increment: outcome => {
      if (outcome === outcomes.WIN) wins += 1
      if (outcome === outcomes.LOSS) losses += 1
      if (outcome === outcomes.TIE) ties += 1
    },
  }
}

function createEvaluateOutcome(choices, outcomes) {
  const { ROCK, PAPER, SCISSORS } = choices
  const { WIN, LOSS, TIE } = outcomes

  return {
    execute: (userChoice, opponentChoice) => {
      return isTie(userChoice, opponentChoice)
        ? TIE
        : isWin(userChoice, opponentChoice)
        ? WIN
        : LOSS
    },
  }

  function isTie(userChoice, opponentChoice) {
    return userChoice === opponentChoice
  }

  function isWin(userChoice, opponentChoice) {
    return (
      (userChoice === ROCK && opponentChoice === SCISSORS) ||
      (userChoice === SCISSORS && opponentChoice === PAPER) ||
      (userChoice === PAPER && opponentChoice === ROCK)
    )
  }
}
