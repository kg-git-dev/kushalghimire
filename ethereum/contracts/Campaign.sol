pragma solidity ^0.4.21;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event TokensSent(address deployedContract);
    event ContractCreation(uint256 timestamp);

    function createCampaign() public payable  {
        require(msg.value == 0.00004 ether);
        address newCampaign = new Campaign(msg.sender, msg.value);
        deployedCampaigns.push(newCampaign);
        0x29712BB596518b292595BD5620cb2d5b73Dad899.transfer(msg.value);
        emit TokensSent(newCampaign);
        emit ContractCreation(block.timestamp);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        uint biddingPrice;
        address bidders;
    }

    Request[] public requests;

    struct NextInstallment {
        uint nextInstallment;
    }

    NextInstallment[] public getNextInstallment;

    uint[] public transactionDate;
    bool[] public paymentStatus;
    uint[] public lastPayment;

    uint public installment;
    uint public responseCounter;
    uint public skipCounter;
    uint public remainingPayment = 0.00006 ether;
    uint public auctionPrice;
    uint i;

    address[] public winningBids;
    address public bidWinner;
    uint public bidCounter;

    mapping(address => bool) public repossesed;
    mapping(address => bool) public owner;

    address[] public availableForBid;
    bool public resold;

    address public leasedBy;

    address public manager = 0x29712BB596518b292595BD5620cb2d5b73Dad899;

    address public ownerAddress;

    modifier restricted() {
        require(msg.sender == leasedBy);
        _;
    }

    function Campaign(address creator, uint downPayment) public {
        leasedBy = creator;  
        downPayment = 0.0004 ether;
        installment = downPayment;
    }

    function getNextInstallment() public view returns (uint){
        NextInstallment memory installmentAmount = NextInstallment({
            nextInstallment: installmentAmount.nextInstallment
        });
        if(responseCounter == 0) {
            installmentAmount.nextInstallment = (remainingPayment/6);
        }
        else if(responseCounter == 1){
            installmentAmount.nextInstallment = (remainingPayment/5);
        }
        else{
            installmentAmount.nextInstallment = (remainingPayment/(6 - responseCounter));
        }return(
            installmentAmount.nextInstallment
        );
    }

    function makePayment() public restricted payable{
        require(!repossesed[this]);
        responseCounter++;
        installment = remainingPayment/(7 - responseCounter);
        require(msg.value == installment);
        lastPayment.push(msg.value);
        transactionDate.push(now);
        paymentStatus.push(true);
        remainingPayment = remainingPayment - installment;  
        if(remainingPayment == 0) {
            owner[manager] = true;
        }    
    }

    function skipPayment() restricted public{
        require(!repossesed[this]);
        transactionDate.push(now);
        paymentStatus.push(false);
        lastPayment.push(0);
        responseCounter++;
        skipCounter++;
        if(skipCounter >=3 || responseCounter ==6){
            repossesed[this] = true;
            availableForBid.push(this);

        }
    }
    
    function makeBid(uint userBid) public{
        require(userBid >= remainingPayment);
        bidCounter++;
        Request memory newRequest = Request({
            biddingPrice: userBid,
            bidders: msg.sender
        });
        requests.push(newRequest);
        
    }

    function buyContract() public payable{
        require(repossesed[this]);
        require(msg.value == 0.0006 ether);
        manager.transfer(remainingPayment);
        leasedBy.transfer(address(this).balance); 
        owner[msg.sender] = true; 
        ownerAddress = msg.sender;   
        resold = true;
    } 



    function highestBidTransfer(uint bidNumber) public payable{
        require(repossesed[this]);
        require(!resold);
        require(msg.sender == requests[bidNumber].bidders);
        require(msg.value == requests[bidNumber].biddingPrice);
        manager.transfer(remainingPayment);
        leasedBy.transfer(address(this).balance);
        owner[msg.sender] = true; 
        ownerAddress = msg.sender;   
        resold = true;
    }


    function getSummary() public view returns (
      address, uint, uint, uint, uint, address, bool, uint
      ) {
        return (
          leasedBy,
          address(this).balance,
          responseCounter,
          skipCounter,
          remainingPayment,
          ownerAddress, 
          resold,
          bidCounter
        );
    }

    function getAvailableForBids() public view returns (address[]) {
        return availableForBid;
    }
}