var Fund = artifacts.require("./Fund.sol");

contract("Fund", function(accounts){

  it("starts everyone with an equal share", async function() {
    var owners = [accounts[0], accounts[1], accounts[2], accounts[3]];
    let fund = await Fund.new(owners, 2, owners);
    assert.equal((await fund.shares(owners[0])).toNumber(), (await fund.shares(owners[1])).toNumber());
    assert.equal(await fund.shares(owners[0]), 1);

    await web3.eth.sendTransaction({from: web3.eth.coinbase, to: fund.address, value: web3.toWei(4, 'ether'), gas: 600000});
    assert.equal((await fund.payments(owners[0])).toNumber(), (await fund.payments(owners[1])).toNumber());
  })

  it("splits payments among accounts correctly", async function() {
    var owners = [accounts[0], accounts[1], accounts[2]];
    let fund = await Fund.new(owners, 2, owners);
    let shares0 = (await fund.shares(owners[0])).toNumber();
    let totalShares = (await fund.totalShares()).toNumber();
    console.log("shares0: " + shares0);
    console.log("totalShares: " + totalShares);
    assert.equal(shares0, (await fund.shares(owners[1])).toNumber());
    assert.equal(shares0, 1);
    //assert.equal(totalShares, owners.length);

    await web3.eth.sendTransaction({from: web3.eth.coinbase, to: fund.address, value: web3.toWei(1, 'ether')});

    let payment0 = await fund.payments(owners[0]);
    let payment1 = await fund.payments(owners[1]);
    let payment2 = await fund.payments(owners[2]);
    console.log("payment0: " + web3.fromWei(payment0, 'ether') + " ether");
    console.log("payment1: " + payment1);
    console.log("payment2: " + payment2);

    assert.equal(payment0.toNumber(), payment1.toNumber());
  })


})
