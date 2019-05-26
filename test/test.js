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

suite('outcomes', () => {
  test('enumerates WIN, LOSS, TIE', () => {
    assert.hasAllKeys(outcomes, ['WIN', 'LOSS', 'TIE'])
  })

  test('is frozen', () => {
    assert.frozen(outcomes)
  })

  test('properties have unique values', () => {
    assert.valuesAreUnique(outcomes)
  })

  test('no empty string properties', () => assert.noEmptyStrings(outcomes))
})

suite('Score', () => {
  let score
  setup(() => {
    score = createScore()
  })

  test('initial wins, losses, ties are each 0', () => {
    scoreHasExpectedState({ wins: 0, losses: 0, ties: 0 })
  })

  suite('increment', () => {
    test('increment wins', () => {
      testIncrement(outcomes.WIN, { wins: 1, losses: 0, ties: 0 })
    })

    test('increment losses', () => {
      testIncrement(outcomes.LOSS, { wins: 0, losses: 1, ties: 0 })
    })

    test('increment ties', () => {
      testIncrement(outcomes.TIE, { wins: 0, losses: 0, ties: 1 })
    })

    function testIncrement(outcome, expectedState) {
      score.increment(outcome)
      scoreHasExpectedState(expectedState)
    }
  })

  function scoreHasExpectedState({ wins, losses, ties }) {
    const testProp = (prop, expected) => {
      assert.equal(score[prop](), expected, `score.${prop}()`)
    }

    testProp('wins', wins)
    testProp('losses', losses)
    testProp('ties', ties)
  }
})
