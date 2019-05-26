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

function createHandleUserChoice({ score, evaluateOutcome, getOpponentChoice }) {
  return {
    execute: userChoice => {
      const opponentChoice = getOpponentChoice()
      const outcome = evaluateOutcome.execute(userChoice, opponentChoice)
      score.increment(outcome)
      return {
        userChoice,
        outcome,
        opponentChoice,
      }
    },
  }
}

function createGame() {
  const score = createScore()
  const handleUserChoice = createHandleUserChoice({
    score,
    evaluateOutcome: createEvaluateOutcome(choices, outcomes),
    getOpponentChoice: randomChoice(),
  })

  return {
    wins: () => score.wins(),
    losses: () => score.losses(),
    ties: () => score.ties(),
    handleUserChoice: choice => handleUserChoice.execute(choice),
  }

  function randomChoice() {
    return () => {
      const values = Object.values(choices)
      const index = Math.floor(Math.random() * values.length)
      return values[index]
    }
  }
}

function createBrowserView(rootElement) {
  const game = createGame()

  document.onkeyup = ({ key }) => {
    const choice = getChoice(key)
    if (choice) {
      const result = game.handleUserChoice(choice)
      render(result)
    }
  }
  render({})

  function getChoice(key) {
    const keyChoiceMap = {
      r: choices.ROCK,
      p: choices.PAPER,
      s: choices.SCISSORS,
    }
    return keyChoiceMap[key.toLowerCase()]
  }

  function render({
    userChoice = null,
    opponentChoice = null,
    outcome = null,
  }) {
    rootElement.innerHTML = `
      <p>wins: ${game.wins()}</p>
      <p>losses: ${game.losses()}</p>
      <p>ties: ${game.ties()}</p>
      ${userChoice ? `<p>you chose: ${userChoice}</p>` : ''}
      ${opponentChoice ? `<p>opponent chose: ${opponentChoice}</p>` : ''}
      ${outcome ? `<p>You ${outcome}</p>` : ''}
    `
  }
}
