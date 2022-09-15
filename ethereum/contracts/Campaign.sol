pragma solidity ^0.4.21;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event TokensSent(address deployedContract);


    function createCampaign() public payable  {
        require(msg.value == 0.0004 ether);
        address newCampaign = new Campaign(msg.sender, msg.value);
        deployedCampaigns.push(newCampaign);
        0x29712BB596518b292595BD5620cb2d5b73Dad899.transfer(msg.value);
        emit TokensSent(newCampaign);
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

    uint public installment;
    uint public responseCounter;
    uint public skipCounter;
    uint public remainingPayment = 0.0006 ether;
    uint public auctionPrice;
    uint i;

    address[] public winningBids;
    address public bidWinner;

    mapping(address => bool) public repossesed;
    mapping(address => bool) public bidders;
    mapping(address => bool) public owner;

    address public leasedBy;

    address public manager = 0x29712BB596518b292595BD5620cb2d5b73Dad899;

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
        remainingPayment = remainingPayment - installment;  
        if(remainingPayment == 0) {
            owner[manager] = true;
        }    
    }

    function skipPayment() restricted public{
        require(!repossesed[this]);
        responseCounter++;
        skipCounter++;
        if(skipCounter >=3){
            repossesed[this] = true;
        }
    }
    
    function makeBid(uint userBid) public{
        require(repossesed[this]);
        require(userBid >= remainingPayment);
        Request memory newRequest = Request({
            biddingPrice: userBid,
            bidders: msg.sender
        });
        requests.push(newRequest);
    }

    function pickHighestBid() public {
        for (i = 0; i < requests.length; i++){
            Request storage request = requests[i];
            if(request.biddingPrice >= auctionPrice){
                auctionPrice = request.biddingPrice;
            }
        } 
       for (i = 0; i < requests.length; i++){
            Request storage secondTest = requests[i];
            if(secondTest.biddingPrice == auctionPrice){
                winningBids.push(request.bidders);
            }
       } 
    }

    function getWinners() public view returns (address[], uint) {
        return (
            winningBids,
            auctionPrice
        );
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, winningBids));
    }
    
    function pickRandomWinner() public {
        require(winningBids.length >=2 );
        uint index = random() % winningBids.length;
        bidWinner = winningBids[index];
    }

    function getSummary() public view returns (
      address, uint, uint, uint, uint
      ) {
        return (
          leasedBy,
          address(this).balance,
          responseCounter,
          skipCounter,
          remainingPayment
        );
    }

    function buyContract() public payable{
        require(msg.sender == bidWinner);
        installment = auctionPrice;
        require(msg.value == installment);
        manager.transfer(remainingPayment);
        leasedBy.transfer(address(this).balance); 
        owner[msg.sender] = true;     
    } 
}