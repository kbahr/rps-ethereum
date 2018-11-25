pragma solidity ^0.4.24;

// contracts
import "./RockPaperScissorsCommon.sol";


contract RockPaperScissorsCore is RockPaperScissorsCommon {

  function initialize(
    address _registryAddress,
    uint256 _minBet,
    uint256 _timeoutInSeconds,
    uint256 _referralFeePerMille,
    uint256 _feePerMille
  )
    external
    initOneTimeOnly
  {
    require(isContract(_registryAddress));
    require(_timeoutInSeconds >= 1 * 60);
    require(_referralFeePerMille <= _feePerMille);
    require(_feePerMille >= _referralFeePerMille);

    registry = IRegistry(_registryAddress);
    minBet = _minBet;
    timeoutInSeconds = _timeoutInSeconds;
    referralFeePerMille = _referralFeePerMille;
    feePerMille = _feePerMille;
  }

  function choiceSecretMatches(
    uint256 _gameId,
    Choice _choice,
    bytes _sig
  )
    public
    view
    returns (bool)
  {
    bytes32 _secret;
    Game memory _game = games[_gameId];

    if (msg.sender == _game.addressP1) {
      _secret = _game.choiceSecretP1;
    }

    if (msg.sender == _game.addressP2) {
      _secret = _game.choiceSecretP2;
    }

    return keccak256(
      abi.encodePacked(
        _gameId,
        uint256(_choice),
        _sig
    )) == _secret;
  }

  //
  // start game actions
  //

  function createGame(
    address _referrer,
    address _tokenAddress,
    uint256 _value
  )
    external
    payable
  {
    require(_value > minBet);

    IBank _bank = IBank(registry.getEntry("Bank"));

    if (_tokenAddress != address(0)) {
      _bank.allocateTokensOf(msg.sender, _tokenAddress, _value);
    } else {
      if (msg.value > 0) {
        _bank.depositEther.value(msg.value)();
      }

      _bank.allocateEtherOf(msg.sender, _value);
    }

    if (_referrer != address(0)) {
      referredBy[msg.sender] = _referrer;

      emit ReferralSet(_referrer, msg.sender);

      totalReferralCount++;
    }

    lastGameId++;
    games[lastGameId] = Game(
      msg.sender,
      address(0),
      address(0),
      _tokenAddress,
      _value,
      Choice(0),
      Choice(0),
      0x0,
      0x0,
      Stage.Created
    );
  }

  function cancelGame(
    uint256 _gameId
  )
    external
    atEitherStage(_gameId, Stage.RematchPending, Stage.Created)
  {
    enterStage(_gameId, Stage.Cancelled);
    Game memory _game = games[_gameId];
    uint256 _refundAfterFees = processFee(_game.addressP1, _game.tokenAddress, _game.bet);
    
    IBank _bank = IBank(registry.getEntry("Bank"));

    if (_game.tokenAddress == address(0)) {
      _bank.deAllocateEtherOf(_game.addressP1, _refundAfterFees);
    } else {
      _bank.deAllocateTokensOf(_game.addressP1, _game.tokenAddress, _refundAfterFees);
    }
  }

  function joinGame(
    address _referrer,
    uint256 _gameId
  )
    external
    payable
    atStage(_gameId, Stage.Created)
    canJoinGame(_gameId)
  {
    Game storage _game = games[_gameId];
    
    if (_game.tokenAddress != address(0)) {
      IBank(registry.getEntry("Bank"))
        .allocateTokensOf(msg.sender, _game.tokenAddress, _game.bet);
    }

    if (_referrer != address(0)) {
      referredBy[msg.sender] = _referrer;

      emit ReferralSet(_referrer, msg.sender);

      totalReferralCount++;
    }

    _game.addressP2 = msg.sender;

    enterStage(_gameId, Stage.Ready);
  }

  function commitChoice(
    uint256 _gameId,
    bytes32 _hash
  )
    external
    atEitherStage(_gameId, Stage.Ready, Stage.TimingOut)
    onlyGameParticipant(_gameId)
  {
    Game storage _game = games[_gameId];
    if (msg.sender == _game.addressP1) {
      _game.choiceSecretP1 = _hash;
    } else {
      _game.choiceSecretP2 = _hash;
    }

    if (_game.choiceSecretP1 != 0x0 && _game.choiceSecretP2 != 0x0) {
      enterStage(_gameId, Stage.Committed);
    }

    emit ChoiceCommitted(_gameId, msg.sender);
  }

  function revealChoice(
    uint256 _gameId,
    Choice _choice,
    bytes _sig
  )
    external
    atStage(_gameId, Stage.Committed)
    onlyGameParticipant(_gameId)
  {
    require(choiceSecretMatches(_gameId, _choice, _sig));

    Game memory _game = games[_gameId];
    if (msg.sender == _game.addressP1) {
      _game.choiceP1 = _choice;
    }

    if (msg.sender == _game.addressP2) {
      _game.choiceP2 = _choice;
    }

    if (_game.choiceP1 != Choice.Undecided && _game.choiceP2 != Choice.Undecided) {
      computeWinner(_gameId);
    }

    totalPlayCount++;

    emit ChoiceRevealed(_gameId, msg.sender);
  }

  function rematch(
    uint256 _gameId
  )
    external
    payable
    onlyGameParticipant(_gameId)
  {
    IBank _bank = IBank(registry.getEntry("Bank"));

    if (msg.value > 0) {
      _bank.depositEther.value(msg.value)();
    }

    Game memory _game;

    if (rematchesFrom[_gameId] == 0) {
      _game = games[_gameId];
      require(_game.stage == Stage.WinnerDecided || _game.stage == Stage.Paid);
      rematchesFrom[_gameId] = _gameId;

      lastGameId++;
      games[lastGameId] = Game(
        _game.addressP1,
        _game.addressP2,
        address(0),
        _game.tokenAddress,
        _game.bet,
        Choice(0),
        Choice(0),
        0x0,
        0x0,
        Stage.RematchPending
      );

      emit RematchProposed(_gameId, lastGameId, _game.addressP1, _game.addressP2);
    } else {
      _game = games[rematchesFrom[_gameId]];
      require(_game.stage == Stage.RematchPending);
      enterStage(rematchesFrom[_gameId], Stage.Ready);
    }

    if (_game.tokenAddress != address(0)) {
      _bank.allocateTokensOf(msg.sender, _game.tokenAddress, _game.bet);
    } else {
      _bank.allocateEtherOf(msg.sender, _game.bet);
    }
  }

  //
  // end game actions
  //

  function()
    external
    payable
  {
    assembly {
      // load value using *_slot suffix
      let rpsManagement := sload(rpsManagement_slot)
      // calldatacopy(t, f, s)
      calldatacopy(
        0x0, // t = mem position to
        0x0, // f = mem position from
        calldatasize // s = size bytes
      )

      // delegatecall(g, a, in, insize, out, outsize) => 0 on error 1 on success
      let result := delegatecall(
        gas, // g = gas
        rpsManagement, // a = address
        0x0, // in = mem in  mem[in..(in+insize)
        calldatasize, // insize = mem insize  mem[in..(in+insize)
        0x0, // out = mem out  mem[out..(out+outsize)
        0 // outsize = mem outsize  mem[out..(out+outsize)
      )

      // check if call was a success and return if no errors & revert if errors
      if iszero(result) {
        revert(0, 0)
      }

      // returndatacopy(t, f, s)
      returndatacopy(
        0x0, // t = mem position to
        0x0,  // f = mem position from
        returndatasize // s = size bytes
      )

      return(
        0x0,
        returndatasize
      )
    }
  }
}