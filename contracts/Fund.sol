pragma solidity ^0.4.2;

import "./zeppelin/ownership/Shareable.sol";
import "./zeppelin/payment/PullPayment.sol";

contract Fund is Shareable, PullPayment {

  mapping(address => uint) public shares;
  mapping(address => bool) isAccount;
  address [] accounts;
  uint public totalShares;

  struct Pass {
    uint block,
    uint daysLeft
  }

  mapping(address => Pass) public passHolders;

  struct PassType {
    uint price,
    uint days
  }

  mapping(string => PassType) passTypes;
  event PassTypeCreated(string type);

  function Fund(address[] _owners, uint _required, address[] _accounts) Shareable(_owners, _required) {
    accounts = _accounts;
    totalShares = accounts.length;
    for(uint i = 0; i < accounts.length; i++) {
      isAccount[accounts[i]] = true;
      shares[accounts[i]] = 1;
    }

    passTypes["daily"].price = 1 ether;
    passTypes["daily"].days = 1;
    PassTypeCreated("daily");
    passTypes["monthly"].price = 20 ether;
    passTypes["monthly"].days = 31;
    PassTypeCreated("monthly");
    passTypes["festival"].price = 40 ether;
    passTypes["festival"].days = 90;
    PassTypeCreated("festival");
  }

  function () payable {
    if(msg.value == 0)
      throw;

    for(uint i = 0; i < accounts.length; i++) {
      uint percentage = (shares[accounts[i]] * 100000) / totalShares;
      uint dividend = (msg.value * percentage) / 100000;
      asyncSend(accounts[i], dividend);
    }
  }

  function buyPass(string type) payable {
    if(msg.value == 0 || !passTypes[type] || msg.value != passTypes[type].price)
      throw;

    if(passHolders[msg.sender].days == 0)
      passHolders[msg.sender].block = block.number;
    passHolders[msg.sender].days += passTypes[type].days;

    for(uint i = 0; i < accounts.length; i++) {
      uint percentage = (shares[accounts[i]] * 100000) / totalShares;
      uint dividend = (msg.value * percentage) / 100000;
      asyncSend(accounts[i], dividend);
    }
  }

  function setPass(string type, uint price, uint days) onlymanyowners(sha3(msg.data)) {
    if(!passTypes[type])
      PassTypeCreated(type);
    passTypes[type].price = price;
    passTypes[type].days = days;
  }

  function addShares(uint amount, address account) checkAccount(account) onlymanyowners(sha3(msg.data)) external {
    shares[account] += amount;
    totalShares += amount;
  }

  function removeShares(uint amount, address account) checkAccount(account) onlymanyowners(sha3(msg.data)) external {
    shares[account] -= amount;
    totalShares -= amount;
  }

  function changeAccount(address oldAddress, address newAddress) checkAccount(oldAddress) onlymanyowners(sha3(msg.data)) {
    for(uint i = 0; i < accounts.length; i++) {
      if(accounts[i] == oldAddress) {
        accounts[i] = newAddress;
        isAccount[oldAddress] = false;
        isAccount[newAddress] = true;
        shares[newAddress] = shares[oldAddress];
        shares[oldAddress] = 0;
      }
    }
  }

  modifier checkAccount(address account) {
    if(!isAccount[account])
      throw;
    _;
  }

}
