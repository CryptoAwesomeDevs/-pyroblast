// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IBlast {
  // Note: the full interface for IBlast can be found below
  function configureClaimableGas() external;
  function claimAllGas(address contractAddress, address recipient) external returns (uint256);
}

contract TestClaimableGas {
  IBlast public constant BLAST = IBlast(0x4300000000000000000000000000000000000002);
  uint256 public counter;

  constructor() {
    // This sets the Gas Mode for MyContract to claimable
    BLAST.configureClaimableGas(); 
  }

  function setChanges(uint256 _newCounter) external {
    counter = _newCounter;
    claimGas();
  }

  // Note: in production, you would likely want to restrict access to this
  function claimGas() private {
    BLAST.claimAllGas(address(this), msg.sender);
  }
}