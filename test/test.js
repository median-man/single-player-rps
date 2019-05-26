const { assert } = chai

assert.valuesAreUnique = obj => {
  const values = Object.values(obj)
  const set = new Set(values)
  assert.deepEqual(values, [...set])
}
assert.noEmptyStrings = obj => assert.notInclude(Object.values(obj), '')

suite('choices', () => {
  test('enumerates ROCK, PAPER, SCISSORS', () => {
    assert.hasAllKeys(choices, ['ROCK', 'PAPER', 'SCISSORS'])
  })

  test('is frozen', () => {
    assert.frozen(choices)
  })

  test('properties have unique values', () => {
    assert.valuesAreUnique(choices)
  })

  test('no empty string properties', () => assert.noEmptyStrings(choices))
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
