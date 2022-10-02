import React, { Component } from 'react';
import { Flag, Grid, Header, Segment, Form, Button, Message, Divider } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Tutorial from '../Tutorial';
import TransferEther from '../TransferEther';

import detectEthereumProvider from '@metamask/detect-provider'
import compileDonation from '../../ethereum/compileDonation';
const EthCrypto = require('eth-crypto');

class SecondStep extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  modalControlNext = () => {
    this.props.nextStep();
  }

  nextStepTest = () => {
    this.props.nextStep();
  }

  saveAndContinue = async (e) => {
    this.setState({ errorMessage: "" });
    const provider = await detectEthereumProvider();
    const contractAddress = '0x041538C7E3343BDb8C5600b2e7AA7F683cE85860'
    const owner = await compileDonation.methods.owner().call();
    const accounts = await web3.eth.getAccounts();
    const myNonce = await web3.eth.getTransactionCount(owner);
    const privateKey = '6ffc83620b302d5a4b3c7c28975e984ac298e94b5c7ff5c37c08bf2cf4c8eb63';

    const signHash = EthCrypto.hash.keccak256([
      { // prefix
        type: 'string',
        value: 'Signed for DonationBag:'
      }, { // contractAddress
        type: 'address',
        value: contractAddress
      }, { // owner Address
        type: 'address',
        value: owner
      }
    ]);

    const signature = EthCrypto.sign(
      privateKey,
      signHash
    );

    const vrs = EthCrypto.vrs.fromString(signature);

    const recieveCode = compileDonation
      .methods.recieveDonation(
        accounts[0],
        vrs.v,
        vrs.r,
        vrs.s
      ).encodeABI();


    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      privateKey
    );
    web3.eth.accounts.wallet.add(signer);

    const tx = {
      from: owner,
      to: contractAddress,
      nonce: myNonce,
      data: recieveCode
    };
    // Assigning the right amount of gas
    tx.gas = await web3.eth.estimateGas(tx);


    // Sending the transaction to the network
    const receipt = await web3.eth
      .sendTransaction(tx)
      .once("transactionHash", (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
      });
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);



    if (provider) {

      this.props.nextStep();

      const chainId = await provider.request({
        method: 'eth_chainId',
      });
    } else {

      // if the provider is not detected, detectEthereumProvider resolves to null
      this.setState({ errorMessage: 'Please activate metamask' })

    }
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;

    const { values: { subscriberIp, subscriberName, subscriberCountry } } = this.props;


    return (
      <div>
        <Grid.Column>
          <Segment>

            <div>
              <h1 className="ui header">
                <p> Hello <span style={{ color: '#4183c4' }}>{subscriberName ? subscriberName : 'Kind Stranger'}</span> from {subscriberCountry}!! <Flag name={subscriberCountry.toLowerCase()} />
                </p>
              </h1>
              <b>In web 1.0 I was building card games and static html sites for experimentation.
                <br/>In web 2.0 I built multiple companies with wordpress, PHP and javascript.
                <br/>In web 3.0 I have started with this demonstration.
                <br/>Similar to Baseball, this feels like a new innings.  
              </b>
              <p><br /></p>
            </div>
            <div>
              <h3 className="ui block header">
                TERMS AND CONDITIONS FOR THE SALE OF CYBERTRUCK (HYPOTHETICAL)!
              </h3>
            </div>
            <div>
              <div>
                <br/><p>KG Motors is proud to announce our partnership with Tesla Cyber Truck. As authorized sellers, we are offering a specialized financing package of 40% downpayment and 4 to 6 even payments.</p>
                <p>Signees will make a downpayment of 40,000 to initialize the lease and make total payment of 60,000 over the next 6 months.</p>
                <p>In lieu of transparency, missing more than 2 or the final payment will result in the car being repossesed and sold in auction.</p>
                <p>Signees are requested to review the terms carefully since the path will be executed exactly as defined in the contract and cannot be altered or intervened with.</p>
               </div>
              <div className="ui list">
                <div className="item">
                  <div className="header">Key Details: </div>
                  <ul>
                    <li>The contract can be initialized by making a downpayment of 40,000 Gwei (0.00004 ether). The deposit is non refundable and paid directly to KG Motors.</li>
                    <li>The remaining balance of 60,000 to be paid in between 4 to 6 installments.</li>
                    <li>Lease Owner is permitted a maximum of 2 missed payments. Third miss results in forfeiture.</li>
                    <li>Payment of first installment is mandatory.</li>
                    <li>Missing the final payment results in forfeiture.</li>
                    <li>Forfeited vehicles to be offered in auction with the revenue from sale transfered to KG motors for balance owed. Surplus balance transfered to forfeiting party.</li>
                    <li>In auction, bids have to exceed prior bids to be registered.</li>
                    <li>In auction, contracts can be bought out if matched the buy out clause. </li>
                    <li>In order to interact with the ethereum blockchain network, an initializing balance of 0.01 Goerli Ethereum will be transfered into your account.</li>
                    <li>A user can request ether once with one wallet key.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Segment>
          <Segment>
            <div>
              <TransferEther
                modalControlNext={this.modalControlNext}
                subscriberName={subscriberName}
                subscriberIp={subscriberIp}
                subscriberCountry={subscriberCountry}
              />
            </div>
          </Segment>
        </Grid.Column>
      </div>
    )
  }
}

export default SecondStep; 