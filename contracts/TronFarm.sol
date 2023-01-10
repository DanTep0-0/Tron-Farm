// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract TronFarm {
    uint256 constant coinPrice = 12500;
    uint256 constant animals = 5;
    uint256 constant period = 1 hours;

    uint256[animals] prices = [8400, 30000, 100000, 230400, 458800];
    uint256[animals] profit = [11, 40, 136, 320, 650];
    uint256 perPrice = 2400;
    uint256 startCoe = 100;

    uint256 public last;
    uint256 public totalPlayers;
    uint256 public totalAnimals;
    uint256 public totalPayout;
    address public owner;

    struct Player {
        uint256 coinsReturned;
        uint256 usedCoins;
        uint256 allCoins;
        uint256 time;
        uint256[animals] Animals;
        uint256 coe;
        uint256 frac;
    }

    mapping(address => Player) public players;

    constructor() public {
        owner = msg.sender;
        last = block.timestamp;
    }

    function deposit() public payable returns (bool success) {
        require(msg.value >= coinPrice);

        Player storage player = players[msg.sender];
        uint256 startCoins = player.allCoins;
        player.allCoins = startCoins + (msg.value / coinPrice);
        player.usedCoins = player.usedCoins + msg.value / coinPrice;

        if (player.time == 0) {
            player.time = block.timestamp;
            totalPlayers++;
            player.coe = startCoe;
        }
        return true;
    }

    function buy(uint256 _type, uint256 _number) public returns (bool success) {
        require(_type < animals && _number > 0);
        collect(msg.sender);

        uint256 paymentCoins = prices[_type] * _number;
        Player storage player = players[msg.sender];

        require(paymentCoins <= player.allCoins);
        player.allCoins = player.allCoins - paymentCoins;

        player.Animals[_type] = player.Animals[_type] + _number;
        players[owner].allCoins = players[owner].allCoins + (paymentCoins / 10);

        totalAnimals = totalAnimals + _number;
        return true;
    }

    function withdraw(uint256 _coins) public returns (bool success) {
        require(_coins > 0);
        collect(msg.sender);
        require(_coins <= (players[msg.sender].allCoins));

        transfer(msg.sender, _coins * coinPrice);
        return true;
    }

    function collect(address _addr) internal {
        Player storage player = players[_addr];
        require(player.time > 0);
        require(address(this).balance >= 0);

        uint256 hoursAdded = (block.timestamp - player.time) / period;
        if (hoursAdded > 0) {
            uint256 hourlyProfit;
            for (uint256 i = 0; i < animals; i++) {
                hourlyProfit = hourlyProfit + (player.Animals[i] * profit[i]);
            }
            uint256 earned = ((hoursAdded * hourlyProfit * player.coe) / 100);
            uint256 q = (hoursAdded * hourlyProfit * player.coe) % 100;
            if (player.frac + q >= 100) {
                player.frac -= (100 - q);
                earned += 1;
            } else {
                player.frac += q;
            }
            player.allCoins = player.allCoins + earned;
            player.time = player.time + (hoursAdded * period);
        }
    }

    function transfer(address _to, uint256 _amount)
        internal
        returns (bool success)
    {
        if (_amount > 0 && _to != address(0)) {
            uint256 contractBalance = address(this).balance;
            if (contractBalance > 0) {
                uint256 payout = _amount > contractBalance
                    ? contractBalance
                    : _amount;
                totalPayout = totalPayout + payout;
                players[msg.sender].allCoins =
                    players[msg.sender].allCoins -
                    payout /
                    coinPrice;
                players[msg.sender].coinsReturned =
                    players[msg.sender].coinsReturned +
                    payout /
                    coinPrice;
                payable(msg.sender).transfer(payout);
                last = block.timestamp;
                return true;
            }
        }
    }

    function animalsOf(address _addr)
        public
        view
        returns (uint256[animals] memory)
    {
        return players[_addr].Animals;
    }

    function setCoe(uint256 _per) public {
        Player storage player = players[msg.sender];
        collect(msg.sender);

        require(_per > 0);
        require(_per * perPrice <= player.allCoins);
        require(_per + player.coe <= 105);
        player.allCoins = player.allCoins - (_per * perPrice);
        players[owner].allCoins =
            players[owner].allCoins +
            (_per * perPrice) /
            10;

        player.coe = player.coe + _per;
    }
}
