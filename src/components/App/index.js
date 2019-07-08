import React from 'react';
import TronLinkGuide from '../TronLinkGuide/index.js';
import TronWeb from 'tronweb';
import Utils from '../../utils/index.js';
import Swal from 'sweetalert2';
import Chick from './chick.png';
import Pig from './pig.png';
import Sheep from './sheep.png';
import Cow from './cow.png';
import GoldenChicken from './goldenChicken.png';
import Coin from './coin.png';


import './App.scss';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

////////////////////////////////////////////////////////////////////////////////////  TWZKc8UuVBZi7KcSuD9WaUBQJCYK2XtTCs - mainnet(0)
const contractAddress = 'TGCSK1RXuzGvjvBW7j9QBFz5P4fHU48sCj';   /// Add your contract address here TTdXi3GmM2Wj9EAcpkGiGyLzpNZ74v6wtN - mainnet(1)  TAdeCTb92LGwEP1QygfdhHb23hydwRbf53 - mainnet(2)  TC5xZKwk8ttafnWt56YB22Ev6NnMyyUm7B - mainnet
////////////////////////////////////////////////////////////////////////////////////  TNXzh6W6i2CTvKexaSeZ6863qZM4dkKog8 - testnet TGCSK1RXuzGvjvBW7j9QBFz5P4fHU48sCj -trstnet(now)
var isClicked = false;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

              tronWeb: {
                  installed: false,
                  loggedIn: false
              },
              Players: '...',
              Invested: '...',
              PaidOut: '...',
              Animals: '...',
              Address: '...',
              ivch: '1',
              ivpg: '1',
              ivsh: '1',
              ivco: '1',
              ivge: '1',
              ivper: '1',
              improveFoodval: '100',
              puv: '0',
              puvTRX: '0',
              valueDep: '0',
              valueDepTRX: '0',
              allMoney: 0,
              investedMoney: '0',
              returnedMoney: '0',
              yourCoe: '100',
              yourChicks: '0',
              yourPigs: '0',
              yourSheeps: '0',
              yourCows: '0',
              yourGoldenChickens: '0',
              yourTime: '0',
              val: 0,
              yourAddressMoney: 0,
              timer: '',
              timer2: '',
              TronLinkValue: '',
              FYDB: true

            }
        // this.changeSide = this.changeSide.bind(this)
        // this.init = this.init.bind(this)
        // this.updateBetValue = this.updateBetValue.bind(this)
        // document.getElementById('name-0').textContent = 'Player1';
        // document.getElementById('name-1').textContent = 'Player2';
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.remove('active');
        // document.querySelector('.player-0-panel').classList.add('active');
        // document.querySelector('.dice').classList.remove('displaynone');
        // cube.classList.add('animation-1');
        // document.getElementById("dice-game").style.display = "block";
        // document.getElementById("roll-button").style.display = "block";
        // <button className="btn btn-primary" onClick={(event) => {event.preventDefault()
        //                                                   this.init()}  }>Start New game </button>

                //  <input style={{ width:"100px" }} value='0' onChange={this.updateBetValue}/>
                //
                // <button className="btn-roll" onClick={(event) => {event.preventDefault()
                //                     this.roll()}  }><i className="fas fa-dice fa-5x"></i></button>
                this.state.timer = setInterval(() => {
                    this.checkForClick();
                  }, 200);
    }

    async componentDidMount() {

        this.setState({loading:true})
        await new Promise(resolve => {
            const tronWebState = {
                installed: !!window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if(tronWebState.installed) {
                this.setState({
                    tronWeb:
                    tronWebState
                });

                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if(tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if(!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if(!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
                base58: FOUNDATION_ADDRESS
            };

            window.tronWeb.on('addressChanged', () => {
                if(this.state.tronWeb.loggedIn)
                    return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }

        await Utils.setTronWeb(window.tronWeb, contractAddress);
    }

    checkForClick(){
      if(isClicked){
        clearInterval(this.state.timer);
        if(this.state.TronLinkValue == 1 || this.state.TronLinkValue == 2){
          if(!!window.tronWeb && window.tronWeb.ready){
            this.setState({TronLinkValue: 0});
              this.play();
          }
        }else{
          this.play();
        }
        const timer = setTimeout(() => {
          this.state.timer2 = setInterval(() => {
              this.checkForLogo();
            }, 1000);
          }, 300);
	     }
      }

    checkForLogo(){
      if (!document.querySelector('.divForLogo').classList.contains('dnone')) {
        clearInterval(this.state.timer2);
        if(!this.state.TronLinkValue == 1 || !this.state.TronLinkValue == 2){isClicked = false;}
        this.state.timer = setInterval(() => {
            this.checkForClick();
          }, 200);
	     }
    }

    async ohrDop(){
      var player = new Object();
      player = await Utils.contract.players(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
      var animals = [];
      animals = await Utils.contract.animalsOf(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
      var result10 = player.time;
      var contractTime = await Utils.contract.getTime().call();
      var timePassed = contractTime - result10;
      var hours = (timePassed / 3600) >> 0;
      var result4 = animals[0];
      var result5 = animals[1];
      var result6 = animals[2];
      var result7 = animals[3];
      var result8 = animals[4];

      var profit = [25, 50, 100, 250, 1250];
      var hourlyProfit = 0;
      for (var i = 0; i < 5; i++) {
          hourlyProfit = hourlyProfit + (animals[i] * profit[i]);
      }
      var allMoneyBefore = player.allCoins;
      var returnedMoneyBefore = player.coinsReturned;
      var newAllCoins = allMoneyBefore + (hourlyProfit*hours);
      var newReturnedMoney = returnedMoneyBefore + (hourlyProfit*hours);
      this.setState({
        allCoins: newAllCoins,
        returnedMoney: newReturnedMoney
      });
    }

    oneHourReload(){
      const timer = setInterval(() => {
          this.ohrDop();
        }, 3600000);
    }

    async fetchData(){
      var result1 = (await Utils.contract.totalPlayers().call()).toNumber();
      var result2 = (await Utils.contract.totalInvested().call()).toNumber() / 80;
      var result3 = (await Utils.contract.totalPayout().call()).toNumber() / 1000000;
      var result4 = (await Utils.contract.totalAnimals().call()).toNumber();
      var result5 = Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString());
      result5 = result5.slice(0, 12);
      this.setState({
        Players: result1,
        Invested: result2 + ' TRX',
        PaidOut: result3 + ' TRX',
        Animals: result4,
        Address: result5 + '...'
      });
    }
    async fetchYourData() {
      var player = new Object();
      player = await Utils.contract.players(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
      var result1 = player.allCoins;
      var result2 = player.usedCoins;
      var result3 = player.coinsReturned;
      var result9 = player.coe;
      var result10 = player.time;
      // var contractBalance = window.tronWeb.trx.getBalance(contractAddress);
      // var contractTime = new Date();
      // contractTime = contractTime.getTime()/1000 >> 0;
      // var timePassed = contractTime - result10;
      // var 2minutes = ((timePassed / 3600)/30) >> 0;
      var animals = [];
      animals = await Utils.contract.animalsOf(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
      var result4 = animals[0];
      var result5 = animals[1];
      var result6 = animals[2];
      var result7 = animals[3];
      var result8 = animals[4];
      // var profit = [25, 50, 100, 250, 1250];
      // var hourlyProfit = 0;
      // for (var i = 0; i < 5; i++) {
      //     hourlyProfit = hourlyProfit + (animals[i] * profit[i]);
      // }
      // result1 = Number(result1);
      // result3 = Number(result3);
      // result1 = result1 + (hourlyProfit*2minutes);
      // result3 = result3 + (hourlyProfit*2minutes);

      // var wait = (3600 - (timePassed - (hours*3600)))*1000;
      this.setState({
      allMoney: result1,
      investedMoney: result2,
      returnedMoney: result3,
      yourCoe: result9,
      yourChicks: result4,
      yourPigs: result5,
      yourSheeps: result6,
      yourCows: result7,
      yourGoldenChickens: result8,

    });
      // const timer = setTimeout(() => {
      //     this.oneHourReload();
      //   }, wait);
      await this.calcMoney(this.state.FYDB);
      this.state.FYDB = false;
  }

  async calcMoney(b){
    var allPlayers = await Utils.contract.getAllPlayers().call();
    var allProfit;
    for(var i=0; i<allPlayers.length; i++){
      var player = await Utils.contract.players(allPlayers[i]).call();
      var playerCoe = player.coe;
      var playerAnimals = player.Animals;
      var profitOfPlayer;
      var profit = [25, 50, 100, 250, 1250];
      // for(var f=0; f<5;f++){
      //   profitOfPlayer = playerAnimals[f]*profit[f];
      // }
    }
    if(b){

    }

  }

    play(){
        if(!!window.tronWeb && window.tronWeb.ready){
        document.querySelector('.forButton').classList.add('dnone');
        document.querySelector('.BTP').classList.add('dnone');
        document.querySelector('.game').classList.remove('dnone');
        document.querySelector('.divForLogo').classList.add('dnone');
        document.querySelector('.cover').classList.add('dnone');
        document.querySelector('.menuBottom').classList.remove('dnone');
      }else{
        if(!!window.tronWeb){
          this.setState({TronLinkValue: 2});
          isClicked = true;
          return;
      }else {
        this.setState({TronLinkValue: 1});
        isClicked = true;
        return;
      }
      }

        this.fetchData();
        this.fetchYourData();
        isClicked = true;
    }

    async dep(value){
      // if(Number.isInteger(value)){
        if(value > 0){
          var yourBalance = window.tronWeb.trx.getBalance(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString()));

           yourBalance.then( async function(result) {
            var totalBalance;
            totalBalance = result;
            if(totalBalance >= value*12500){
            await Utils.contract.deposit().send({
              shouldPollResponse: false,
              callValue: value*12500});
              Swal({
                  title:'Transaction Send',
                  type: 'success'

              });

          }else{
          Swal({
              title:'Make sure your value > 0',
              type: 'error'

          });
        }
          });
    }
    this.fetchData();
    this.fetchYourData();
  }

    async buy(type, num){

        if (num > 0){

          var yourBalance = window.tronWeb.trx.getBalance(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString()));

           yourBalance.then( async function(result) {

          await Utils.contract.buy(type, num).send({
              shouldPollResponse:false,
              callValue:0
          });
          Swal({
              title:'Transaction Send',
              type: 'success'

          })
          });
        }
        this.fetchData();
        this.fetchYourData();
    }

    async improveFood(per){
      if(per > 0 && per <=5){

        var yourBalance = window.tronWeb.trx.getBalance(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString()));

         yourBalance.then( async function(result) {

        await Utils.contract.setCoe(per).send({
            shouldPollResponse:false,
            callValue:0
        });
        Swal({
            title:'Transaction Send',
            type: 'success'

        })
        });
      } else {
      Swal(
          {
               title:'Oops...',
               text: 'Make sure your value > 0 and < 6',
               type: 'error'
          }
       );

     }
     this.fetchYourData();
    }

    async pickUp(coins){

      var yourBalance = window.tronWeb.trx.getBalance(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString()));

       yourBalance.then( async function(result) {

      if(coins > 0){
        await Utils.contract.withdraw(coins).send({
          shouldPollResponse: false,
          callValue: 0
        });
        Swal({
            title:'Transaction Send',
            type: 'success'

        })

      }

});

      this.fetchYourData();
    }

    visible(){
      if(Number(this.state.val) == 0 ){
      document.querySelector('.cover').classList.remove('dnone');
      document.querySelector('.BTP').classList.remove('dnone');
      document.querySelector('.menuBottom').classList.remove('dnone');
    }
      this.state.val = 5;
    }


        render() {
        if(Number(this.state.TronLinkValue) === 1){
          document.querySelector('.cover').classList.add('dnone');
          document.querySelector('.BTP').classList.add('dnone');
          document.querySelector('.menuBottom').classList.add('dnone');
            return <TronLinkGuide />;
        }
        if(Number(this.state.TronLinkValue) === 2){
          document.querySelector('.cover').classList.add('dnone');
          document.querySelector('.BTP').classList.add('dnone');
          document.querySelector('.menuBottom').classList.add('dnone');
            return <TronLinkGuide installed />;
        }
        return (
          <div className = "allReact">
            {this.visible()}
          <div className = "forButton">
            <button className="play" onClick={(event) => {event.preventDefault()
                                                               this.play()}  }>Play</button>
          </div>
          <div className="fixed-bg"></div>
          <div className = "game dnone">
            <ul className = "aboutGame">
              <li className = "abgl adm">Your Address:<p className = "num">{this.state.Address}</p></li>
              <li className = "abgl ads">Players:<p className = "num">{this.state.Players}</p></li>
              <li className = "abgl ads">Animals:<p className = "num">{this.state.Animals}</p></li>
              <li className = "abgl adb">Invested:<p className = "num">{this.state.Invested}</p></li>
              <li className = "abgl adb">Paid Out:<p className = "num">{this.state.PaidOut}</p></li>
            </ul>
            <div className = "yourInf">
              <div className = "account">My Account</div>
              <div className = "animal tw bgcn "><div className = "invest"><div className = "about">You have to buy coins to purchase animals</div><button className="improveFood button2" onClick={(event) => {event.preventDefault()
                this.dep(this.state.valueDep)}  }>Buy</button><input min="1" step="1" className = "buLa wa" type="number" name="denumber" value = {this.state.valueDep} onChange={e => this.setState({valueDep: e.target.value, valueDepTRX: e.target.value/80})}/><img className = "valCoins1" src = {Coin}/>
              <input className = "buLa2 wa" type = "number"  value = {this.state.valueDepTRX} onChange = {e => this.setState({valueDepTRX: e.target.value, valueDep: e.target.value*80})}/><div className = "TRX">TRX</div><div className = "about mt15 dop">1 TRX = 80
                <img src = {Coin} className= "coin" /></div><p className = "about">You can withdraw money you've earned</p><input min="1" step="1" className = "buLa3 wa" type="number" name="pinumber" value = {this.state.puv} onChange={e => this.setState({puv: e.target.value, puvTRX: e.target.value/80})}/>
                <img className = "valCoins2" src = {Coin}/><button className="pickUp" onClick={(event) => {event.preventDefault()
                    this.pickUp(this.state.puv)}  }>Withdraw</button><input className = "wa buLa4" value = {this.state.puvTRX} onChange = {e => this.setState({puv: e.target.value*80, puvTRX: e.target.value})}/><div className = "TRX">TRX</div></div></div>

                  <table className = "Infbo">
                    <tr className = "yourInftr1">
                      <td className = "yitd" ><div className = "top">My Money(<img src = {Coin} className = "ym"/>)</div><input className = "bottom" value = {this.state.allMoney} /></td>
                      <td className = "yitd" ><div className = "top">Invested Money(<img src = {Coin} className = "ym"/>)</div><input className = "bottom" value = {this.state.investedMoney}/></td>
                      <td className = "yitd" ><div className = "top">Returned Money(<img src = {Coin} className = "ym"/>)</div><input className = "bottom" value = {this.state.returnedMoney}/></td>
                    </tr>
                  </table>
            </div>
            <form className = "allani">
              <div className = "store">Store</div>

              <div className = "animal chick"><div className = "name">Chick</div><img className = "image" src = {Chick}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" value = {this.state.yourChicks}/></div><div className = "cost"><div>Cost:</div>
              <input className = "costI" value = "5760" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" value = "25" /><img className = "coinfp1" src = {Coin}/>per hour</div></div>
              <button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(0, this.state.ivch)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="chnumber" value = {this.state.ivch} onChange={e => this.setState({ivch: e.target.value})}/></div>

                                                               <div className = "animal pig"><div className = "name">Pig</div><img className = "image" src = {Pig}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" value = {this.state.yourPigs}/></div><div className = "cost"><div>Cost:</div>
                                                               <input className = "costI" value = "11760" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" value = "50" /><img className = "coinfp2" src = {Coin}/>per hour</div></div>
                                                               <button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(1, this.state.ivpg)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="pgnumber" value = {this.state.ivpg} onChange={e => this.setState({ivpg: e.target.value})}/></div>

                                                               <div className = "animal food"><button className="improveFood button1" onClick={(event) => {event.preventDefault()
                                                                                                                    this.improveFood(this.state.ivper)}  }>Improve Nutrition</button>
                                                                                                                  <input min="1" step="1" className = "ifi wa" type="number" name="pernumber" value={this.state.ivper} onChange={e => this.setState({ivper: e.target.value})}/><div className = "pers">%</div>
                                                                                                                <p className = "description">If you improve nutrition, you will receive more profit from all of your animals. This can increase profit by up to 5 percent.</p><div className = "cost2"><div>Cost:</div>
                                                                                                                <input className = "costI2" value = "3000" /><img className = "coinfa2" src = {Coin}/></div><div className = "youHave">You have:<input className = "thisAnumber" value = {this.state.yourCoe}/><p className = "Pers">%</p></div></div>



              <div className = "animal sheep"><div className = "name">Sheep</div><img className = "image" src = {Sheep}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" value = {this.state.yourSheeps}/></div><div className = "cost"><div>Cost:</div>
              <input className = "costI" value = "24000" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" value = "100" /><img className = "coinfp2" src = {Coin}/>per hour</div></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(2, this.state.ivsh)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="shnumber" value = {this.state.ivsh} onChange={e => this.setState({ivsh: e.target.value})}/></div>

                                                               <div className = "animal cow"><div className = "name">Cow</div><img className = "image" src = {Cow}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" value = {this.state.yourCows}/></div><div className = "cost"><div>Cost:</div>
                                                               <input className = "costI" value = "61200" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" value = "250" /><img className = "coinfp2" src = {Coin}/>per hour</div></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(3, this.state.ivco)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="conumber" value = {this.state.ivco} onChange={e => this.setState({ivco: e.target.value})}/></div>

                                                               <div className = "animal goldenEgg"><div className = "name">Golden Chicken</div><img className = "image" src = {GoldenChicken}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" value = {this.state.yourGoldenChickens}/></div><div className = "cost"><div>Cost:</div>
                                                               <input className = "costI" value = "312000" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" value = "1250" /><img className = "coinfp2" src = {Coin}/>per hour</div></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(4, this.state.ivge)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="genumber" value = {this.state.ivge} onChange={e => this.setState({ivge: e.target.value})}/></div>
            </form>
            </div>
          </div>
        );
    }
}

class ButtonPlay extends React.Component {

  click(){
    isClicked = true;
  }

  render(){return(
    <div className = "forButton2">
      <button className="play play2" onClick={(event) => {event.preventDefault()
                                                         this.click()}  }>Play</button>
    </div>
    );
  }
}

export default {App: App, ButtonPlay: ButtonPlay};
