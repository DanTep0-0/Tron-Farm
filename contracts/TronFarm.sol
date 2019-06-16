pragma solidity ^0.4.23;

contract TronFarm {

    uint constant coinPrice = 12500;
    uint constant animals = 5;
    uint constant period = 60 minutes;

    uint[animals] prices = [5760, 11760, 24000, 61200, 312000];
    uint[animals] profit = [25, 50, 100, 250, 1250];
    uint perPrice = 3000;
    uint startCoe = 100;

    uint public totalPlayers;
    uint public totalInvested;
    uint public totalAnimals;
    uint public totalPayout;

    address owner;

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
    }

    function deposit() public payable returns(bool success){
        require(msg.value >= coinPrice);

        Player storage player = players[msg.sender];
        player.allCoins = player.allCoins + msg.value / coinPrice;
        player.coe = startCoe;

        if (player.time == 0) {
            player.time = now;
            totalPlayers++;
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
        player.usedCoins = player.usedCoins + paymentCoins;

        player.Animals[_type] = player.Animals[_type] + _number;
        players[owner].allCoins = players[owner].allCoins +  (paymentCoins / 10);
        totalInvested = totalInvested + (paymentCoins / 10 * 9);

        totalAnimals = totalAnimals + _number;
        return true;
    }

    function withdraw(uint _coins) public returns (bool success){
        require(_coins > 0);
        collect(msg.sender);
        require(_coins <= players[msg.sender].allCoins);

        players[msg.sender].allCoins = players[msg.sender].allCoins - _coins;
        transfer(msg.sender, _coins * coinPrice);
        return true;
    }

    function collect(address _addr) internal {
        Player storage player = players[_addr];
        require(player.time > 0);

        uint hoursAdded = (now - player.time) / period;
        if (hoursAdded > 0) {
            uint hourlyProfit;
            for (uint i = 0; i < animals; i++) {
                hourlyProfit = hourlyProfit + (player.Animals[i] * profit[i]);
            }
            player.coinsReturned = player.coinsReturned + (hoursAdded * hourlyProfit * player.coe / 100);
            player.allCoins = player.allCoins + (hoursAdded * hourlyProfit * player.coe / 100);
            player.time = player.time + (hoursAdded * period);
        }
    }

    function transfer(address _to, uint _amount) internal {
        if (_amount > 0 && _to != address(0)) {
            uint contractBalance = address(this).balance;
            if (contractBalance > 0) {
                uint payout = _amount > contractBalance ? contractBalance : _amount;
                totalPayout = totalPayout + payout;
                msg.sender.transfer(payout);
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

        player.coe = player.coe + _per;
    }

}
