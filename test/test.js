const { assert } = chai

suite('choices', () => {
  test('enumerates ROCK, PAPER, SCISSORS', () => {
    const hasChoice = choice => assert.property(choices, choice)
    const expectedChoices = ['ROCK', 'PAPER', 'SCISSORS']
    expectedChoices.forEach(hasChoice)
  })

  test('properties cannot be changed', () => {
    assert(Object.isFrozen(choices), 'choices is not frozen')
  })

  test('properties have unique values', () => {
    const values = Object.values(choices)
    const set = new Set(values)
    assert.deepEqual(values, [...set])
  })

  test('no empty string properties', () => {
    assert.notInclude(Object.values(choices), '')
  })
})

suite('Score', () => {
  test('has wins, losses, and ties', () => {
    const score = createScore()
    const expected = {
      wins: 0,
      losses: 0,
      ties: 0,
    }
    assert.deepEqual(score, expected);
  })
})
