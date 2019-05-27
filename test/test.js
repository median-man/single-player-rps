const { assert } = chai

suite('Game', gameTestSuite)

function gameTestSuite() {
  test('initial game state', testInitialState)

  function testInitialState() {
    const game = createGame()
    assert.equal(game.wins(), 0, 'wins')
    assert.equal(game.losses(), 0, 'losses')
    assert.equal(game.ties(), 0, 'ties')
  }
}
