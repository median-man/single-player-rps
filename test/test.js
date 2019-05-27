const { assert } = chai

suite('Game', gameSuite)

function gameSuite() {
  test('initial game state', testInitialState)
  suite('evaluateUserChoice', evaluateUserChoiceSuite)

  function testInitialState() {
    const game = createGame()
    assert.equal(game.wins(), 0, 'wins')
    assert.equal(game.losses(), 0, 'losses')
    assert.equal(game.ties(), 0, 'ties')
  }

  function evaluateUserChoiceSuite() {
    let getOpponentChoice
    let game
    setup(() => {
      getOpponentChoice = () => choices.ROCK
      game = createGame(getOpponentChoice)
    })

    suite('user wins', userWinsSuite)
    suite('user loses', userLosesSuite)
    suite('user ties', userTiesSuite)

    function userWinsSuite() {
      test('scissors beats paper', () =>
        assertReturnsWin(choices.SCISSORS, choices.PAPER))

      test('paper beats rock', () =>
        assertReturnsWin(choices.PAPER, choices.ROCK))

      test('rock beats scissors', () =>
        assertReturnsWin(choices.ROCK, choices.SCISSORS))

      test('updates wins', () => {
        getOpponentChoice = () => choices.SCISSORS
        game = createGame(getOpponentChoice)
        game.evaluateUserChoice(choices.ROCK)
        assert.equal(game.wins(), 1, 'wins')
      })

      function assertReturnsWin(userChoice, opponentChoice) {
        getOpponentChoice = () => opponentChoice
        game = createGame(getOpponentChoice)
        const actual = game.evaluateUserChoice(userChoice)
        assert.equal(actual, outcomes.WIN, 'outcomes.WIN')
      }
    }

    function userLosesSuite() {
      test('returns outcome when user loses', () => {
        const actual = game.evaluateUserChoice(choices.SCISSORS)
        assert.equal(actual, outcomes.LOSS, 'outcomes.LOSS')
      })

      test('updates losses', () => {
        game.evaluateUserChoice(choices.SCISSORS)
        assert.equal(game.losses(), 1, 'losses')
      })
    }

    function userTiesSuite() {
      test('returns outcome when user ties', () => {
        const actual = game.evaluateUserChoice(choices.ROCK)
        assert.equal(actual, outcomes.TIE, 'outcomes.TIE')
      })

      test('updates ties', () => {
        game.evaluateUserChoice(choices.ROCK)
        assert.equal(game.ties(), 1, 'ties')
      })
    }
  }
}
