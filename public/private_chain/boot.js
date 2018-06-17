
function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in eth.accounts) {
        var acct = eth.accounts[acctNum];
        var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
        totalBal += parseFloat(acctBal);
        console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
    }
    console.log("  Total balance: " + totalBal + " ether");
};

var mining_threads = 1

    function checkWork() {
        if (eth.getBlock("pending").transactions.length > 0) {
            if (eth.mining) return;
            console.log("== Pending transactions! Mining...");
            miner.start(mining_threads);
        } else {
            miner.stop();
            console.log("== No transactions! Mining stopped.");
        }
    }
    console.log("checkWork() is defined");
    eth.filter("latest", function(err, block) { checkWork(); });
    eth.filter("pending", function(err, block) { checkWork(); });

    checkWork();

