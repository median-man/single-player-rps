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

    test('returns outcome when user loses', testReturnsLoss)
    test('returns outcome when user ties', testReturnsTie)
    test('scissors beats paper', testScissorsBeatsPaper)
    test('paper beats rock', testPaperBeatsRock)
    test('rock beats scissors', testRockBeatsScissors)

    function testReturnsLoss() {
      const actual = game.evaluateUserChoice(choices.SCISSORS)
      assert.equal(actual, outcomes.LOSS, 'outcomes.LOSS')
    }

    function testReturnsTie() {
      const actual = game.evaluateUserChoice(choices.ROCK)
      assert.equal(actual, outcomes.TIE, 'outcomes.TIE')
    }

    function assertReturnsWin(userChoice, opponentChoice) {
      getOpponentChoice = () => opponentChoice
      game = createGame(getOpponentChoice)
      const actual = game.evaluateUserChoice(userChoice)
      assert.equal(actual, outcomes.WIN, 'outcomes.WIN')
    }

    function testScissorsBeatsPaper() {
      assertReturnsWin(choices.SCISSORS, choices.PAPER)
    }

    function testPaperBeatsRock() {
      assertReturnsWin(choices.PAPER, choices.ROCK)
    }

    function testRockBeatsScissors() {
      assertReturnsWin(choices.ROCK, choices.SCISSORS)
    }
  }
}
