import compileDonation from './compileDonation';
const fs = require('fs');
const solc = require('solc');
const path = require("path");
const Tx = require('ethereumjs-tx')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');


const provider = new HDWalletProvider(
    'scare mother derive fragile defense network aim fence spatial ankle odor vendor',
    'https://rinkeby.infura.io/v3/e4b5fe045fea4d79afa58aaf33f46c6c'
  );

// Private key to use to sign the transactions
// To decrypt your private key, use e.g. https://www.myetherwallet.com/#view-wallet-info
// You will find your private key file in e.g. .ethereum/keystore or .parity/keys
// In this example the key should correspond to the web3.eth.coinbase address
const privateKey = new Buffer('0c809c0658b0a4979f59ffcef372b47d4d7fad115d359856db382f9d3d3ca9a6', 'hex')

// Connect to local Ethereum node
const web3 = new Web3(provider);

// Compile the source code
// const campaignPath = path.resolve(__dirname, "contracts", "DonationBag.sol");
// const source = fs.readFileSync(campaignPath, "utf8");
// const output = solc.compile(source, 1).contracts;
// const bytecode = output.contracts[':DonationBag'].bytecode;
// const abi = JSON.parse(output.contracts[':DonationBag'].interface);

// Contract object
const contract = web3.eth.contract(abi);

// Get contract data
const contractData = contract.new.getData({
    data: '0x' + bytecode
});

// Construct the raw transaction
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(gasPrice);
const gasLimitHex = web3.toHex(300000);

const nonce = web3.eth.getTransactionCount(web3.eth.coinbase);
const nonceHex = web3.toHex(nonce);

const rawTx = {
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    data: contractData,
    from: web3.eth.coinbase
};

console.log(rawTx);

// Sign and serialize the transaction
const tx = new Tx(rawTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();

// Send the transaction
web3.eth.sendRawTransaction(serializedTx.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }

    // Log the tx, you can explore status manually with eth.getTransaction()
    console.log('contract creation tx: ' + hash);

    // Wait for the transaction to be mined
    waitForTransactionReceipt(hash);
});

// Wait for the transaction to be mined

function waitForTransactionReceipt(hash) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(hash);
    // If no receipt, try again in 1s
    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(hash);
        }, 1000);
    } else {
        // The transaction was mined, we can retrieve the contract address
        console.log('contract address: ' + receipt.contractAddress);
        testContract(receipt.contractAddress);
    }
}

// Quick test the contract
// NOTE: this part does not sign the transaction on the client

// function testContract(address) {
//     // Reference to the deployed contract
//     const token = contract.at(address);
//     // Destination account for test
//     const dest_account = '0x002D61B362ead60A632c0e6B43fCff4A7a259285';

//     // Assert initial account balance, should be 100000
//     const balance1 = token.balances.call(web3.eth.coinbase);
//     console.log(balance1 == 1000000);

//     // Call the transfer function
//     token.transfer(dest_account, 100, {from: web3.eth.coinbase}, (err, res) => {
//         if (err) { console.log(err); return; }

//         // Log transaction, in case you want to explore
//         console.log('tx: ' + res);
//         // Assert destination account balance, should be 100 
//         const balance2 = token.balances.call(dest_account);
//         console.log(balance2 == 100);
//     });
// }