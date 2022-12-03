// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract Token {
    string public name = "Kanak Token";
    string public symbol = "KNK";
    uint public totalSupply = 10000000;

    address public owner;

    mapping(address=>uint) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint256 _amount) external {
        require(balances[msg.sender] > _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;

        // using Hardhat 
        console.log("*=============* Sender balance id %s tokens", balances[msg.sender]);
    }

    function balanceOf(address _account) external view returns(uint256) {
        return balances[_account];
    }
    

}