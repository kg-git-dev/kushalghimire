pragma solidity ^0.4.21;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event TokensSent(address deployedContract);
    event ContractCreation(uint256 timestamp);

    function createCampaign() public payable {
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
        uint256 biddingPrice;
        address bidders;
    }

    Request[] public requests;

    struct NextInstallment {
        uint256 nextInstallment;
    }

    NextInstallment[] public getNextInstallment;

    uint256[] public transactionDate;
    bool[] public paymentStatus;
    uint256[] public lastPayment;

    uint256 public bidWinnerDate;

    uint256 public installment;
    uint256 public responseCounter;
    uint256 public skipCounter;
    uint256 public remainingPayment = 0.00006 ether;
    uint256 public auctionPrice;
    uint256 i;

    address[] public winningBids;
    address public bidWinner;
    uint256 public bidCounter;

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

    function Campaign(address creator, uint256 downPayment) public {
        leasedBy = creator;
        downPayment = 0.00004 ether;
        installment = downPayment;
    }

    function getNextInstallment() public view returns (uint256) {
        NextInstallment memory installmentAmount = NextInstallment({
            nextInstallment: installmentAmount.nextInstallment
        });
        if (responseCounter == 0) {
            installmentAmount.nextInstallment = (remainingPayment / 6);
        } else if (responseCounter == 1) {
            installmentAmount.nextInstallment = (remainingPayment / 5);
        } else {
            installmentAmount.nextInstallment = (remainingPayment /
                (6 - responseCounter));
        }
        return (installmentAmount.nextInstallment);
    }

    function makePayment() public payable restricted {
        require(!repossesed[this]);
        responseCounter++;
        installment = remainingPayment / (7 - responseCounter);
        require(msg.value == installment);
        lastPayment.push(msg.value);
        transactionDate.push(now);
        paymentStatus.push(true);
        remainingPayment = remainingPayment - installment;
        if (remainingPayment == 0) {
            owner[msg.sender] = true;
            ownerAddress = msg.sender;
        }
    }

    function skipPayment() public restricted {
        require(!repossesed[this]);
        transactionDate.push(now);
        paymentStatus.push(false);
        lastPayment.push(0);
        responseCounter++;
        skipCounter++;
        if (skipCounter >= 3 || responseCounter == 6) {
            repossesed[this] = true;
            availableForBid.push(this);
        }
    }

    function makeBid(uint256 userBid) public {
        bidCounter++;
        Request memory newRequest = Request({
            biddingPrice: userBid,
            bidders: msg.sender
        });
        requests.push(newRequest);
    }

    function buyContract() public payable {
        require(repossesed[this]);
        require(msg.value == 0.00006 ether);
        manager.transfer(remainingPayment);
        leasedBy.transfer(address(this).balance);
        owner[msg.sender] = true;
        ownerAddress = msg.sender;
        resold = true;
        bidWinnerDate = now;
    }

    function highestBidTransfer(uint256 bidNumber) public payable {
        require(repossesed[this]);
        require(!resold);
        require(msg.sender == requests[bidNumber].bidders);
        require(msg.value == requests[bidNumber].biddingPrice);
        manager.transfer(remainingPayment);
        leasedBy.transfer(address(this).balance);
        owner[msg.sender] = true;
        ownerAddress = msg.sender;
        resold = true;
        bidWinnerDate = now;
    }

    function getSummary()
        public
        view
        returns (
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            bool,
            uint256
        )
    {
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
