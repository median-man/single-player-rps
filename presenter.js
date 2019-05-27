;(function() {
  const state = {
    game: createGame(randomChoice),
    outcome: null,
  }

  initEventListeners()
  render()

  function initEventListeners() {
    document.onkeyup = ({ key }) => {
      const userChoice = getUserChoice(key)
      if (userChoice) handleUserChoice(userChoice)
    }
  }

  function getUserChoice(key) {
    const keyChoiceMap = {
      r: choices.ROCK,
      p: choices.PAPER,
      s: choices.SCISSORS,
    }
    return keyChoiceMap[key.toLowerCase()]
  }

  function handleUserChoice(userChoice) {
    state.outcome = state.game.evaluateUserChoice(userChoice)
    render()
  }

  function render() {
    const { game, outcome } = state
    const wins = game.wins()
    const losses = game.losses()
    const ties = game.ties()
    document.getElementById('game').innerHTML = `
      Wins: ${wins}<br>
      Losses: ${losses}<br>
      Ties: ${ties}
      ${outcome ? renderOutcome() : ''}
    `
    function renderOutcome() {
      return `<br><br>
      Outcome: ${outcome}`
    }
  }
})()
