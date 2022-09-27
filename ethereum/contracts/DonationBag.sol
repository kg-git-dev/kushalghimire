pragma solidity ^0.4.21;

contract DonationBag {

    string[] public subscribers;

    function getSubscribersDetails() public view returns (
      uint, uint
      ) {
        return (
          address(this).balance,
          subscribers.length
        );
    }

    // donation-signatures must be created by the owner
    address public owner;

    // each donation contains this amount of wei
    uint public amountPerDonation = 0.01 ether; 

    // one address can recieve only one donation
    // the ones already recieved one, are stored here
    mapping (address => bool) public alreadyRecieved;

    // constructor
    function DonationBag() public {
        owner = msg.sender;
    }

    /**
     * default function
     * Whenever ether is send to the contract without
     * transaction data, the default function is called.
     * If you do not have a default-function and send ether to this contract,
     * the transaction will be reverted with 'VM Exception while processing transaction: revert'
     */
    function() public payable {
        // got money
    }

    /**
     * to ensure the signatures for this contract cannot be
     * replayed somewhere else, we add this prefix to the signed hash
     */
    string public signPrefix = "Signed for DonationBag:";

    /**
     * generates a prefixed hash of the address
     * We hash the following together:
     * - signPrefix
     * - address of this contract
     * - the recievers-address
     */
    function prefixedHash(
        address 
    ) public constant returns(bytes32) {
        bytes32 hash = keccak256(
            signPrefix,
            address(this),
            owner
        );
        return hash;
    }

    /**
     * validates if the signature is valid
     * by checking if the correct message was signed
     */
    function isSignatureValid(
        address,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public constant returns (bool correct) {
        bytes32 mustBeSigned = prefixedHash(owner);
        address signer = ecrecover(
            mustBeSigned,
            v, r, s
        );
        return (signer == owner);
    }

    /**
     * checks if the signature and message is valid
     * if yes we send some wei to the submitter
     */
    function recieveDonation(
        address donationReceiver,
        string ipDetails,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public {

        // already recieved donation -> revert
        if (alreadyRecieved[donationReceiver] == true) revert();

        // signature not valid -> revert
        if (isSignatureValid(
            msg.sender,
            v, r, s
        ) == false) {
            revert();
        }

        // all valid -> send wei
        alreadyRecieved[donationReceiver] = true;
        donationReceiver.transfer(amountPerDonation);
        subscribers.push(ipDetails);
    }

    /**
     * returns the current contract-balance
     */
    function getBalance() public constant returns (uint256 balance) {
        return address(this).balance;
    }
}