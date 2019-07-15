pragma solidity ^0.4.23;

contract TronFarm {

    uint constant coinPrice = 12500;
    uint constant animals = 5;
    uint constant period = 10 seconds ;

    uint[animals] prices = [8400, 30000, 100000, 230400, 458800];
    uint[animals] profit = [22, 80,272, 640, 1300];
    uint perPrice = 4500;
    uint startCoe = 100;

    uint public last;
    uint public totalPlayers;
    uint public totalAnimals;
    uint public totalPayout;
    address public owner;

    struct Player {
        uint coinsReturned;
        uint usedCoins;
        uint allCoins;
        uint time;
        uint[animals] Animals;
        uint coe;
    }

    mapping(address => Player) public players;

    constructor() public {
        owner = msg.sender;
        last = now;
    }

    function deposit() public payable returns(bool success){
        require(msg.value >= coinPrice);

        Player storage player = players[msg.sender];
        uint startCoins = player.allCoins;
        player.allCoins = startCoins + (msg.value / coinPrice);
        player.usedCoins = player.usedCoins + msg.value / coinPrice;

        if (player.time == 0) {
            player.time = now;
            totalPlayers++;
            player.coe = startCoe;
        }
        return true;
    }

    function buy(uint _type, uint _number) public returns(bool success){
        require(_type < animals && _number > 0);
        collect(msg.sender);

        uint paymentCoins = prices[_type] * _number;
        Player storage player = players[msg.sender];

        require(paymentCoins <= player.allCoins);
        player.allCoins = player.allCoins - paymentCoins;

        player.Animals[_type] = player.Animals[_type] + _number;
        players[owner].allCoins = players[owner].allCoins +  (paymentCoins / 10);

        totalAnimals = totalAnimals + _number;
        return true;
    }

    function withdraw(uint _coins) public returns (bool success){
        require(_coins > 0);
        collect(msg.sender);
        require(_coins <= players[msg.sender].allCoins);

        transfer(msg.sender, _coins * coinPrice);
        return true;
     }

    function collect(address _addr) internal {
        Player storage player = players[_addr];
        require(player.time > 0);
        require(address(this).balance >= 0);

        uint hoursAdded = (now - player.time) / period;
        if (hoursAdded > 0) {
            uint hourlyProfit;
            for (uint i = 0; i < animals; i++) {
                hourlyProfit = hourlyProfit + (player.Animals[i] * profit[i]);
            }
            player.allCoins = player.allCoins + (hoursAdded * hourlyProfit * player.coe / 100);
            player.time = player.time + (hoursAdded * period);
        }
    }

    function transfer(address _to, uint _amount) internal returns(bool success){
        if (_amount > 0 && _to != address(0)) {
            uint contractBalance = address(this).balance;
            if (contractBalance > 0) {
                uint payout = _amount > contractBalance ? contractBalance : _amount;
                totalPayout = totalPayout + payout;
                players[msg.sender].allCoins = players[msg.sender].allCoins - payout/coinPrice;
                players[msg.sender].coinsReturned = players[msg.sender].coinsReturned + payout/coinPrice;
                msg.sender.transfer(payout);
                last = now;
                return true;
            }
        }
    }

    function animalsOf(address _addr) public view returns (uint [animals]) {
        return players[_addr].Animals;
    }

    function setCoe(uint _per) public{
        Player storage player = players[msg.sender];
        collect(msg.sender);

        require(_per > 0);
        require(_per * perPrice <= player.allCoins);
        require(_per + player.coe <= 105);
        player.allCoins = player.allCoins - (_per * perPrice);
        players[owner].allCoins = players[owner].allCoins +  (_per * perPrice)/10;

        player.coe = player.coe + _per;
    }

}
