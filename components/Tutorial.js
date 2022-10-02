import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Icon } from 'semantic-ui-react';


import MetaIndicator from './metamaskSteps/MetaIndicator';
import detectEthereumProvider from '@metamask/detect-provider'
import compileDonation from '../ethereum/compileDonation';
const EthCrypto = require('eth-crypto');

class Tutorial extends Component {
    state = {
        stepMeta: 1,
        loading: false,
        errorMessage: false
    }

    nextStepMetaTest = async () => {
        const { errorMessage } = this.state;
        const provider = await detectEthereumProvider();
        const chainId = await provider.request({
            method: 'eth_chainId',
        })
        if (chainId == '0x4') {
            this.setState({ loading: true });
            console.log(this.props.subscriberCountry);
            const owner = await compileDonation.methods.owner().call();
            const myNonce = await web3.eth.getTransactionCount(owner);
            const accounts = await web3.eth.getAccounts();
            // const contractAddress = '0x3D3E3a0767045f4f05CAB6cecA24325F234e3058';
            // const privateKey = '6ffc83620b302d5a4b3c7c28975e984ac298e94b5c7ff5c37c08bf2cf4c8eb63';

            // const signHash = EthCrypto.hash.keccak256([
            //     { // prefix
            //         type: 'string',
            //         value: 'Signed for DonationBag:'
            //     }, { // contractAddress
            //         type: 'address',
            //         value: contractAddress
            //     }, { // owner Address
            //         type: 'address',
            //         value: owner
            //     }
            // ]);
            // const signature = EthCrypto.sign(
            //     privateKey,
            //     signHash
            // );
            // const vrs = EthCrypto.vrs.fromString(signature);

            // const recieveCode = compileDonation
            //     .methods.recieveDonation(
            //         accounts[0],
            //         'Testing if ip Shows',
            //         vrs.v,
            //         vrs.r,
            //         vrs.s
            //     ).encodeABI();
            // // Creating a signing account from a private key
            // const signer = web3.eth.accounts.privateKeyToAccount(
            //     privateKey
            // );
            // web3.eth.accounts.wallet.add(signer);

            // const tx = {
            //     from: owner,
            //     to: contractAddress,
            //     nonce: myNonce,
            //     data: recieveCode
            // };
            // // Assigning the right amount of gas
            // tx.gas = await web3.eth.estimateGas(tx);

            // // Sending the transaction to the network
            // const receipt = await web3.eth
            //     .sendTransaction(tx)
            //     .once("transactionHash", (txhash) => {
            //         console.log(`Mining transaction ...`);
            //         console.log(`https://goerli.etherscan.io/tx/${txhash}`);
            //     });
            // // The transaction is now on chain!
            // console.log(`Mined in block ${receipt.blockNumber}`);
            this.props.nextStepTest();
        } else {
            this.setState({ errorMessage: true })
            // this.props.nextStepTest();
        }

    }

    nextStepMeta = (e) => {
        e.preventDefault();
        const { stepMeta } = this.state
        this.setState({
            stepMeta: stepMeta + 1
        })
    }

    prevStepMeta = (e) => {
        e.preventDefault();
        const { stepMeta } = this.state
        this.setState({
            stepMeta: stepMeta - 1,
            errorMessage: false
        })
    }

    render() {

        const { stepMeta } = this.state;

        switch (stepMeta) {
            case 1:
                return (
                    <div>
                        <div>
                            <MetaIndicator
                                currentStepMeta="first"
                            />
                        </div>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={9}>
                                        <img className="ui fluid image" src="0.png"></img>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <div className="ui vertical divider"></div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <br /><br />
                                        <div className="ui items">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="header">Intro to MetaMask</div>
                                                    <div className="description">MetaMask is your crypto wallet. Your private key associated with the newly created account will serve as your identity.
                                                        <br />Access metamask by following the instructions on the left. </div>
                                                </div></div></div>
                                        <div>
                                            <Button onClick={this.nextStepMeta} content='Continue' icon='right arrow' labelPosition='right' />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                );
        }
        switch (stepMeta) {
            case 2:
                return (
                    <div>
                        <div>
                            <MetaIndicator
                                currentStepMeta="second"
                            />
                        </div>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={9}>
                                        <img className="ui fluid image" src="1.png"></img>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <div className="ui vertical divider"></div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <br /><br />
                                        <div className="ui items">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="header">Second Step</div>
                                                    <div className="description">We now need to access Metamask settings. Instructions on the left. </div>
                                                </div></div></div>
                                        <div>
                                            <Button onClick={this.prevStepMeta} content='Back' icon='left arrow' labelPosition='left' />
                                            <Button onClick={this.nextStepMeta} content='Continue' icon='right arrow' labelPosition='right' />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                );
        }
        switch (stepMeta) {
            case 3:
                return (
                    <div>
                        <div>
                            <MetaIndicator
                                currentStepMeta="third"
                            />
                        </div>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={9}>
                                        <img className="ui fluid image" src="2.png"></img>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <div className="ui vertical divider"></div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <br /><br />
                                        <div className="ui items">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="header">Third Step</div>
                                                    <div className="description">Click on Advanced Settings.</div>
                                                </div></div></div>
                                        <div>
                                            <Button onClick={this.prevStepMeta} content='Back' icon='left arrow' labelPosition='left' />
                                            <Button onClick={this.nextStepMeta} content='Continue' icon='right arrow' labelPosition='right' />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                );
        }
        switch (stepMeta) {
            case 4:
                return (
                    <div>
                        <div>
                            <MetaIndicator
                                currentStepMeta="fourth"
                            />
                        </div>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={9}>
                                        <img className="ui fluid image" src="3.png"></img>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <div className="ui vertical divider"></div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <br /><br />
                                        <div className="ui items">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="header">Fourth Step</div>
                                                    <div className="description">Scroll a little below to find an option called 'Show test networks'. Toggle to 'on'.
                                                        <br />I have conditionally required the application to only authorize Goerli transactions since the application will work fine on the main Ether network as well.
                                                    </div>
                                                </div></div></div>
                                        <div>
                                            <Button onClick={this.prevStepMeta} content='Back' icon='left arrow' labelPosition='left' />
                                            <Button onClick={this.nextStepMeta} content='Continue' icon='right arrow' labelPosition='right' />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>

                );
        }
        switch (stepMeta) {
            case 5:
                return (
                    <div>
                        <div>
                            <MetaIndicator
                                currentStepMeta="fifth"
                            />
                        </div>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={9}>
                                        <img className="ui fluid image" src="4.png"></img>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <div className="ui vertical divider"></div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <br /><br />
                                        <div className="ui items">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="header">Second Step</div>
                                                    <div className="description">Click on 'Ethereum Mainnet'. There will be an option called 'Goerli Ethereum Network'. </div>
                                                </div></div></div>
                                        <div>
                                        <Button onClick={this.prevStepMeta} content='Back' icon='left arrow' labelPosition='left' />
                                            <Button onClick={this.nextStepMetaTest} positive content='Transfer Ether' icon='right arrow' labelPosition='right'/>                                           <div>
                                                {this.state.loading ? <Message icon>
                                                    <Icon name='circle notched' loading />
                                                    <Message.Content>
                                                        <Message.Header>Just one second</Message.Header>
                                                        We are fetching that content for you.
                                                    </Message.Content>
                                                </Message> : ''}
                                            </div>
                                            <div>
                                                {this.state.errorMessage ?
                                                    <Message negative>
                                                        <Message.Header>We're sorry we can't apply that discount</Message.Header>
                                                        <p>That offer has expired</p>
                                                    </Message> : ''}
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                );
        }
    }
}

export default Tutorial;