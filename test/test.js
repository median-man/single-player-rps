const { assert } = chai

assert.valuesAreUnique = obj => {
  const values = Object.values(obj)
  const set = new Set(values)
  assert.deepEqual(values, [...set])
}
assert.noEmptyStrings = obj => assert.notInclude(Object.values(obj), '')
assert.scoreHasExpectedState = (score, expectedState) => {
  const { wins, losses, ties } = expectedState
  const testProp = (prop, expected) => {
    assert.equal(score[prop](), expected, `score.${prop}()`)
  }

  testProp('wins', wins)
  testProp('losses', losses)
  testProp('ties', ties)
}

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
    assert.scoreHasExpectedState(score, { wins: 0, losses: 0, ties: 0 })
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
      assert.scoreHasExpectedState(score, expectedState)
    }
  })
})

suite('EvaluateOutcome', () => {
  let evaluateOutcome
  setup(() => {
    evaluateOutcome = createEvaluateOutcome(choices, outcomes)
  })

  test('rock beats scissors', testOutcomes(choices.ROCK, choices.SCISSORS))
  test('scissors beats paper', testOutcomes(choices.SCISSORS, choices.PAPER))
  test('paper beats rock', testOutcomes(choices.PAPER, choices.ROCK))
  test('ties', testTies())

  function testOutcomes(winningChoice, losingChoice) {
    return () => {
      let userChoice = winningChoice
      let opponentChoice = losingChoice
      let actual = evaluateOutcome.execute(userChoice, opponentChoice)
      assert.equal(actual, outcomes.WIN, 'outcomes.WIN')

      userChoice = losingChoice
      opponentChoice = winningChoice
      actual = evaluateOutcome.execute(userChoice, opponentChoice)
      assert.equal(actual, outcomes.LOSS, 'outcomes.LOSS')
    }
  }

  function testTies() {
    return () =>
      Object.values(choices).forEach(choice =>
        assert.equal(
          evaluateOutcome.execute(choice, choice),
          outcomes.TIE,
          choice
        )
      )
  }
})

suite('handleUserChoice', () => {
  let score
  let evaluateOutcome
  let getOpponentChoice
  let handleUserChoice

  setup(() => {
    evaluateOutcome = createEvaluateOutcome(choices, outcomes)
    getOpponentChoice = () => choices.SCISSORS
    score = createScore()
    handleUserChoice = createHandleUserChoice({
      score,
      evaluateOutcome,
      getOpponentChoice,
    })
  })

  test('increments wins when user wins', () => {
    const userChoice = choices.ROCK
    handleUserChoice.execute(userChoice)
    assert.scoreHasExpectedState(score, { wins: 1, losses: 0, ties: 0 })
  })

  test('increments losses when user loses', () => {
    const userChoice = choices.PAPER
    handleUserChoice.execute(userChoice)
    assert.scoreHasExpectedState(score, { wins: 0, losses: 1, ties: 0 })
  })

  test('returns outcome object', () => {
    const userChoice = choices.PAPER
    const expected = {
      userChoice,
      opponentChoice: getOpponentChoice(),
      outcome: outcomes.LOSS
    }
    assert.deepEqual(handleUserChoice.execute(userChoice), expected)
  })
})
