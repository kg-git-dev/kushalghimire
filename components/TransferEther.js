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
        loading: false
    }

    modalEtherTransfer = async () => {
        this.setState({ errorMessage: false });
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
            //         console.log(`https://rinkeby.etherscan.io/tx/${txhash}`);
            //     });
            // // The transaction is now on chain!
            // console.log(`Mined in block ${receipt.blockNumber}`);
            this.setState({ loading: false })
            this.setModalOff();
            this.props.modalControlNext();
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
                        <Modal.Header>Switching to the Rinkeby Test Network</Modal.Header>
                        <Header icon='arrow alternate circle right
' content='Click on the Meta Mask browser extension and navigate to "Settings".' />
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
                                    <List.Item icon='arrow alternate circle right' content='Switch from "Ethereum Mainnet" to "Rinkeby Test Network".' />
                                </List>
                                <div>
                            {this.state.errorMessage ?
                                <Message negative>
                                    <Message.Header>We're sorry we can't apply that discount</Message.Header>
                                    <p>That offer has expired</p>
                                </Message> : ''}
                        </div>
                            </Modal.Description>
                        </Modal.Content>
                        <br /><br />
                        {this.state.loading ? <Message icon>
                            <Icon name='circle notched' loading />
                            <Message.Content>
                                <Message.Header>Whoa! Is that a loading screen?</Message.Header>
                                Every data altering action in the ethereum blockchain takes between 15-30 seconds and costs money. Hence, blockchain is not entirely favorable for cases such as social media where waiting for 15 seconds and paying to tweet is simply unfathomable. 
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