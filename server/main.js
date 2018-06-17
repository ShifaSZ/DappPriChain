import { Meteor } from 'meteor/meteor';
var Web3 = require('web3');
//var web3 = new Web3('http://localhost:8000');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8000'));

var Tx = require('ethereumjs-tx');

//var net = require('net');
//var web3ipc = new Web3(new Web3.providers.IpcProvider('/home/genetank/mychain/Ethereum/geth.ipc', net));

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  sendEther(src, dst, amount) {
    const syncUnlockAcc = Meteor.wrapAsync(web3.eth.personal.unlockAccount)
    const unlock_ret = syncUnlockAcc(src,"xdgxdg204")
    const syncSendTx = Meteor.wrapAsync(web3.eth.sendTransaction)
    const result = syncSendTx({"from":src,"to":dst,"value":amount})
    return result
  },

  getBlock(num){
    const syncGetBlock = Meteor.wrapAsync(web3.eth.getBlock)
    const result = syncGetBlock(num,true)
    return (result)
  },

  importRawKey(key,password) {
    const syncAddPriKey = Meteor.wrapAsync(web3.eth.personal.importRawKey)
    const result = syncAddPriKey(key,password)
    return result
  }

})

