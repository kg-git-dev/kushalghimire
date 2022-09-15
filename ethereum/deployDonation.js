const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/DonationBag.json');

const EthCrypto = require('eth-crypto');
const { default: createRouteLoader } = require('next/dist/client/route-loader');

// const creatorIdentity = EthCrypto.createIdentity();

const provider = new HDWalletProvider(
  'scare mother derive fragile defense network aim fence spatial ankle odor vendor',
  'https://rinkeby.infura.io/v3/e4b5fe045fea4d79afa58aaf33f46c6c'
);
const web3 = new Web3(provider);

const identity = EthCrypto.createIdentity();
/* > {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
} */

// web3.eth.accounts.wallet.add(signer);

const myAddress = '0x29712BB596518b292595BD5620cb2d5b73Dad899';



const main = async () => {
  // const myNonce = await web3.eth.getTransactionCount(myAddress, 'latest');
  // console.log(myNonce);
  // const contract = new web3.eth.Contract(
  //   JSON.parse(compiledFactory.interface));
  // contract.options.data = compiledFactory.bytecode;

  // create contract-create-code

const abi = JSON.parse(compiledFactory.interface);
const bytecode = compiledFactory.bytecode;

const createCode = EthCrypto.txDataByCompiled(
  JSON.parse(compiledFactory.interface), // abi
  compiledFactory.bytecode, // bytecode
  [myAddress] // constructor-arguments
);

// const rawTx = {
//   from: myAddress,
//   nonce: 0,
//   gasLimit: 5000000,
//   gasPrice: 5000000000,
//   // data: createCode,
// };

  // Creating a signing account from a private key
// const signer = web3.eth.accounts.privateKeyToAccount(
//   '6ffc83620b302d5a4b3c7c28975e984ac298e94b5c7ff5c37c08bf2cf4c8eb63'
//   );
// web3.eth.accounts.wallet.add(signer);

// const serializedTx = EthCrypto.signTransaction(
//   rawTx,
//   identity.privateKey
// );


try {
  const accounts = await web3.eth.getAccounts();
  const privateKey =  '6ffc83620b302d5a4b3c7c28975e984ac298e94b5c7ff5c37c08bf2cf4c8eb63';

  const rawTx = {
    from: myAddress,
    nonce: 0,
    gasLimit: 5000000,
    gasPrice: 5000000000,
    data: createCode,
    chain: 'rinkeby'
};
const serializedTx = EthCrypto.signTransaction(
    rawTx,
    '0x' + privateKey.toString('hex')
);

// submit to local chain
const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
const contractAddress = receipt.contractAddress;

console.log(contractAddress);

  // const contract = new web3.eth.Contract(abi);
  // contract.options.data = bytecode;
  // const deployTx = contract.deploy();

  // const deployedContract = await deployTx
  //   .send({
  //     from: signer.address,
  //     gas: await deployTx.estimateGas(),
  //   })
  //   .once("transactionHash", (txhash) => {
  //     console.log(`Mining deployment transaction ...`);
  //     console.log(`https://${network}.etherscan.io/tx/${txhash}`);
  //   });
  // // The contract is now deployed on chain!
  // console.log(`Contract deployed at ${deployedContract.options.address}`);
  // console.log(
  //   `You can update DEMO_CONTRACT in .env to use the new contract address`
  // );

  // const deployedContract = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // const contractAddress = deployedContract.contractAddress;
  // console.log(contractAddress);
  
}catch(err){
  console.log(err);
};

  provider.engine.stop();
};
main();

