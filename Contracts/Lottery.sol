// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Lottery{

    address payable[] public players;
    address public manager;
    address payable public winner;

    constructor(){
        manager = msg.sender;  // Deployer's address
    }

    function random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function participate() public payable{
        require(msg.value  == 3 ether, "Ehter value must be exactly 3 ether to participate in the lottery");
        players.push(payable(msg.sender));

    }

    function getBalance() public view returns(uint){
        require(manager==msg.sender,"You are not authorized to call this function");
        return address(this).balance;
    }

    function pickWinner() public{
        require(manager==msg.sender,"");
        require(players.length >= 3);
        uint r = random();
        uint index = r%players.length;
        winner = players[index];
        winner.transfer(getBalance());
        players = new address payable[](0);
    }
}
