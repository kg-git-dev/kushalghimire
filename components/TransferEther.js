import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Header, Modal, Icon, List } from 'semantic-ui-react';


import MetaIndicator from './metamaskSteps/MetaIndicator';
import detectEthereumProvider from '@metamask/detect-provider'
import compileDonation from '../ethereum/compileDonation';
const EthCrypto = require('eth-crypto');

class TransferEther extends Component {
    state = {
        stepMeta: 1,
        loading: false,
        errorMessage: false,
        open: false,
        loading: false,
        alreadyReceived: false,
    }

    modalEtherTransfer = async () => {
        this.setState({ errorMessage: false });
        const provider = await detectEthereumProvider();
        const chainId = await provider.request({
            method: 'eth_chainId',
        })
        if (chainId == '0x5') {
            try {
                const accounts = await web3.eth.getAccounts();
                const receivedStatus = await compileDonation.methods.alreadyRecieved(accounts[0]).call();
                this.setState({ alreadyReceived: receivedStatus })
            } catch (err) {
                console.log(err.message);
            }

            if (!this.state.alreadyReceived) {
                this.setState({ loading: true });
                const subscriberData = this.props.subscriberName + ' from ' + this.props.subscriberIp;
                console.log(subscriberData);
                const owner = await compileDonation.methods.owner().call();
                const myNonce = await web3.eth.getTransactionCount(owner);
                const accounts = await web3.eth.getAccounts();
                const contractAddress = '0x9DB85729f29a3f4861D60c83992d6c85AcEc8cFd';
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
                        subscriberData,
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

                console.log('here');

                // Sending the transaction to the network
                const receipt = await web3.eth
                    .sendTransaction(tx)
                    .once("transactionHash", (txhash) => {
                        console.log(`Mining transaction ...`);
                        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
                    });
                // The transaction is now on chain!
                console.log(`Mined in block ${receipt.blockNumber}`);
                this.setState({ loading: false })
                this.setModalOff();
                this.props.modalControlNext();
            } else {
                this.setModalOff();
                this.props.modalControlNext();
            }

        } else {
            this.setState({ errorMessage: true })
            // this.props.nextStepTest();
        }

    }

    nextStepMeta = (e) => {
        e.preventDefault();
        const { stepMeta } = this.state
        this.setState({
            stepMeta: stepMeta + 1,
            open: true,
            loading: true
        })
    }

    prevStepMeta = (e) => {
        e.preventDefault();
        const { stepMeta } = this.state
        this.setState({
            stepMeta: stepMeta - 1,
            errorMessage: false,
            open: false
        })
    }

    setModalOff = () => {
        this.setState({ open: false, errorMessage: false })
    }

    setModalOn = () => {
        this.setState({ open: true })
    }

    render() {

        const { stepMeta, open } = this.state;

        return (
            <div>
                {/* <Button onClick={this.nextStepMeta}>Test</Button>
                {stepMeta} */}
                <div>
                    <Modal
                        basic
                        onClose={this.setModalOff}
                        onOpen={this.setModalOn}
                        open={open}
                        trigger={<Grid>
                            <Grid.Column textAlign="center">
                                <Button animated positive>
                                    <Button.Content visible>Continue</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button></Grid.Column></Grid>}
                    >
                        <Modal.Header>Switching to the Goerli Ethereum Network</Modal.Header>
                        <Header as='h2'><Icon name='arrow alternate circle right' /><Header.Content>Click on the Meta Mask browser extension and navigate to "Settings"</Header.Content></Header>
                        <Modal.Content image>
                            <Image size='big' src='metaMask.png' wrapped />
                            <Modal.Description>
                                <List>
                                    <List.Item icon='arrow alternate circle right' content='Click on "Settings".' />
                                    <List.Item icon='arrow alternate circle right' content='Click on "Advanced".' />
                                    <List.Item><List.Icon name='arrow alternate circle right' />
                                        <List.Content>
                                            <List.Description>
                                                <p style={{ color: "white" }}>Scroll Down to find a toggle for "Show test networks".
                                                    <br />Toggle the switch to "ON".</p>
                                            </List.Description>
                                        </List.Content></List.Item>
                                    <List.Item icon='arrow alternate circle right' content='Switch from "Ethereum Mainnet" to "Goerli Ethereum Network".' />
                                </List>
                                <div>
                                    {this.state.errorMessage ?
                                        <div><p></p><Message negative>
                                            <Message.Header>Please Select the Goerli Ethereum Network</Message.Header>
                                            <p>Since this is just a demonstration, we will not be using real money. Goerli is built specifically for testing purposes.</p>
                                        </Message></div> : ''}
                                </div>
                            </Modal.Description>
                        </Modal.Content>
                        <br /><br />
                        {this.state.loading ? <Message icon>
                            <Icon name='circle notched' loading />
                            <Message.Content>
                                <Message.Header>Whoa! Is that a loading screen?</Message.Header>
                                Every data alteration in the blockchain creates a new block with the modified data. This takes aboout 20 seconds and costs real money.
                            </Message.Content>
                        </Message> : ''}
                        <Modal.Actions>
                            {!this.state.loading ? <div><Button basic color='red' inverted onClick={this.setModalOff}>
                                <Icon name='remove' /> No
                            </Button>
                                <Button color='green' inverted onClick={this.modalEtherTransfer}>
                                    <Icon name='checkmark' /> Yes
                                </Button></div> : ''}
                        </Modal.Actions>
                    </Modal>
                </div>

            </div>
        )
    }
}

export default TransferEther;