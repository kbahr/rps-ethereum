const {
  setupContracts,
  addressZero,
  ethUser,
  tokenUser,
  assertRevert,
  timeWarp
} = require('./helpers/general')
const { testDepositTokens } = require('./helpers/bnk')
const {
  defaultTimeoutInSeconds,
  choices,
  testInitialization,
  testJoinGame,
  testCommitChoice,
  testRevealChoice,
  testSettleBetWinner,
  testSettleBetTied,
  testCancelGame,
  testStartGameTimeout,
  testTimeoutGame,
  createJoinedGame
} = require('./helpers/rps')
const { toBN } = require('web3-utils')

describe('when a game is at timingOut stage', () => {
  contract('RockPaperScissors', () => {
    const betAmount = toBN(1e17)
    let contracts
    let gameId

    beforeEach('setup contracts', async () => {
      contracts = await setupContracts()
      await testInitialization(contracts)
      await testDepositTokens(
        contracts.bnk,
        contracts.tst.address,
        betAmount.mul(toBN(5)),
        {
          from: tokenUser
        }
      )
      await testDepositTokens(
        contracts.bnk,
        contracts.tst.address,
        betAmount.mul(toBN(5)),
        {
          from: ethUser
        }
      )
      gameId = await createJoinedGame(
        contracts,
        betAmount,
        tokenUser,
        ethUser,
        addressZero,
        addressZero
      )
      await testCommitChoice(contracts, gameId, choices.rock, {
        from: tokenUser
      })
      await testStartGameTimeout(contracts, gameId, {
        from: tokenUser
      })
    })

    it('should NOT cancel game', async () => {
      await assertRevert(
        testCancelGame(contracts, gameId, {
          from: tokenUser
        })
      )
    })

    it('should NOT joinGame', async () => {
      await assertRevert(
        testJoinGame(contracts, addressZero, gameId, {
          from: tokenUser
        })
      )
    })

    it('should NOT commitChoice for already committed player', async () => {
      await assertRevert(
        testCommitChoice(contracts, gameId, choices.rock, {
          from: tokenUser
        })
      )
    })

    it('should commitChoice for uncommitted player', async () => {
      await testCommitChoice(contracts, gameId, choices.rock, {
        from: ethUser
      })
    })

    it('should NOT revealChoice for committed player', async () => {
      const choice = choices.rock
      const sigParams = await web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [gameId.toString(), choice]
      )
      const sig = await web3.eth.sign(sigParams, tokenUser)
      await assertRevert(
        testRevealChoice(contracts, gameId, choice, sig, {
          from: tokenUser
        })
      )
    })

    it('should NOT revealChoice for non-committed player', async () => {
      const choice = choices.rock
      const sigParams = await web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [gameId.toString(), choice]
      )
      const sig = await web3.eth.sign(sigParams, tokenUser)
      await assertRevert(
        testRevealChoice(contracts, gameId, choice, sig, {
          from: ethUser
        })
      )
    })

    it('should NOT startGameTimeout again', async () => {
      await assertRevert(
        testStartGameTimeout(contracts, gameId, {
          from: tokenUser
        })
      )
    })

    it('should NOT timeoutGame if NOT enough time has passed', async () => {
      await assertRevert(
        testTimeoutGame(contracts, gameId, {
          from: tokenUser
        })
      )
    })

    it('should timeoutGame if enough time has passed', async () => {
      await timeWarp(defaultTimeoutInSeconds.toNumber())
      await testTimeoutGame(contracts, gameId, {
        from: tokenUser
      })
    })

    it('should NOT settleBet', async () => {
      await assertRevert(
        testSettleBetTied(contracts, gameId, {
          from: tokenUser
        })
      )
      await assertRevert(
        testSettleBetWinner(contracts, gameId, {
          from: tokenUser
        })
      )
    })
  })
})
