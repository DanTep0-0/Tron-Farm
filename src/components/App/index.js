import React from 'react';
import TronLinkGuide from '../TronLinkGuide/index.js';
import TronWeb from 'tronweb';
import Utils from '../../utils/index.js';
import Swal from 'sweetalert2';
import Chick from './chick.png';
import Pig from './pig.png';
import Sheep from './sheep.png';
import Cow from './cow.png';
import Horse from './horse.png';
import Coin from './coin.png';
import Money from './money.png';
import AnimalsP from './animals.png';

import './App.scss';
import WOW from 'wowjs';
import Info from './info-icon.png';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

////////////////////////////////////////////////////////////////////////////////////  TWZKc8UuVBZi7KcSuD9WaUBQJCYK2XtTCs - mainnet(0)
const contractAddress = 'TE7NUHHtgmzJGhuRxcq1RdkA7vw37rUFJb';   /// Add your contract address here TTdXi3GmM2Wj9EAcpkGiGyLzpNZ74v6wtN - mainnet(1)  TAdeCTb92LGwEP1QygfdhHb23hydwRbf53 - mainnet(2)  TC5xZKwk8ttafnWt56YB22Ev6NnMyyUm7B - mainnet(3) TXhSWnFWu91Qo4P6Lay5Bbd2q7inBBabVQ -mainnet(now)
////////////////////////////////////////////////////////////////////////////////////  TNXzh6W6i2CTvKexaSeZ6863qZM4dkKog8 - testnet TGCSK1RXuzGvjvBW7j9QBFz5P4fHU48sCj -testnet(2) TVhadi9aa1ryHRYnB776NVB6EgTstUfkMZ - testnet(3) TQUfVzJXs2u99uY4XHxdd4656y6bSv3Yzr - testnet(4) TE7NUHHtgmzJGhuRxcq1RdkA7vw37rUFJb - testnet(now)
var isClicked = false;
var period = 60;
var contractBalance;
var contractTime;
var profit = [22, 80,272, 640, 1300];
var prices = [8400, 30000, 100000, 230400, 458800];
var perPrice = 2500;
var vall;

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
              puv: '',
              puvTRX: '',
              valueDep: '',
              valueDepTRX: '',
              allMoney: 0,
              investedMoney: '0',
              returnedMoney: '0',
              yourCoe: '100',
              yourChicks: '0',
              yourPigs: '0',
              yourSheeps: '0',
              yourCows: '0',
              yourHorses: '0',
              yourTime: '0',
              yourAllAnimals: '0',
              yourProfit: '0',
              val: 0,
              yourAddressMoney: 0,
              timer: '',
              timer2: '',
              timer3: '',
              TronLinkValue: '',
              timeLeft: '',
              isEnd: false,
              MOTH: true,
            }
                    this.state.timer = setInterval(() => {
                    this.checkForClick();
                  }, 200);
                  setTimeout(() => {
                    this.setT();
                },1000);
                if(!!window.tronWeb && window.tronWeb.ready){
                setTimeout(() => {this.fetchData();},1000);
                if(!(this.state.Players === "...") || !(this.state.Invested === "...") || !(this.state.PaidOut === "...") || !(this.state.Animals === "...")){
                setTimeout(() => {this.fetchYourData();},2000);
              }
              }
    }

    setT(){
      this.setState({
        timer2: setInterval(() => {
      this.fetchData();
        }, 7000)
      });
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

        new WOW.WOW({
          live: false
        }).init();

        this.visible();
    }

    async checkForClick(){
      if(isClicked){
        clearInterval(this.state.timer);
        if(this.state.TronLinkValue === 1){
          if(!!window.tronWeb && window.tronWeb.ready){
            await this.fetchData();
              this.play();
          }
        }else{
          this.play();
        }
        setTimeout(() => {
          this.state.timer2 = setInterval(() => {
              this.checkForLogo();
            }, 1000);
          }, 300);
	     }
      }

    checkForLogo(){
      if (!document.querySelector('.divForLogo').classList.contains('dnone')) {
        clearInterval(this.state.timer2);
        if(!this.state.TronLinkValue === 1){isClicked = false;}
        this.setState({timer: setInterval(() => {
            this.checkForClick();
          }, 200)
	     })}
    }

      async fetchData(){
      try{
      var result1 = (await Utils.contract.totalPlayers().call()).toNumber();
    }catch(e){
      this.checkForEntering();
      return;
    }
      var result3 = (await Utils.contract.totalPayout().call()).toNumber() / 1000000;
      var result4 = (await Utils.contract.totalAnimals().call()).toNumber();
      var result5 = Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString());
      contractBalance = await window.tronWeb.trx.getBalance(contractAddress)/12500;
      var result2 = contractBalance/80 + result3;
      this.setState({
        Players: result1,
        Invested: Math.ceil(result2),
        PaidOut: Math.ceil(result3),
        Animals: result4,
        Address: result5,
        href: "https://tronscan.org/#/address/" + result5.toString(),
      });
    }

    checkForEntering(){
      if(document.querySelector('.cover').classList.contains('dnone')){
      if(this.state.Players === "..." || this.state.Invested === "..." || this.state.PaidOut === "..." || this.state.Animals === "..."){
        this.setState({TronLinkValue: 1});
        document.querySelector('.divForLogo').classList.remove('dnone');
      }}
    }

    async fetchYourData() {
      contractTime = new Date();
      this.checkForEnd();
      var player = {};
      player = await Utils.contract.players(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
      var result1 = player.allCoins;
      var result2 = player.usedCoins;
      var result3 = player.coinsReturned;
      var result9 = player.coe;
      var result10 = player.time;
      var animals = [];
      animals = await Utils.contract.animalsOf(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
      var result4 = animals[0];
      var result5 = animals[1];
      var result6 = animals[2];
      var result7 = animals[3];
      var result8 = animals[4];
      this.setState({
      allMoney: result1,
      investedMoney: result2,
      returnedMoney: result3,
      yourCoe: result9,
      yourChicks: result4,
      yourPigs: result5,
      yourSheeps: result6,
      yourCows: result7,
      yourHorses: result8,
      yourTime: result10
    });
      await this.calcMoney();
  }

  async calcMoney(){
        contractBalance = await window.tronWeb.trx.getBalance(contractAddress)/12500;
        contractTime = new Date();
        contractTime = contractTime.getTime()/1000 >> 0;
        if(this.state.isEnd){contractTime = (await Utils.contract.last().call()).toNumber(); document.querySelector('.info').classList.remove('dnone');}
        var player = {};
        player = await Utils.contract.players(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
        var playerAllCoins = player.allCoins;
        var timePassed = contractTime-Number(this.state.yourTime);
        var profitOfPlayer=0;
        var animals = [];
        animals = [Number(this.state.yourChicks),Number(this.state.yourPigs),Number(this.state.yourSheeps),Number(this.state.yourCows),Number(this.state.yourHorses)];
               for(var f=0; f<5;f++){
                  profitOfPlayer += animals[f]*profit[f];
                }
                profitOfPlayer = profitOfPlayer*Number(this.state.yourCoe)/100;
                if(!profitOfPlayer){profitOfPlayer=0;}
        var contractBalance2 = contractBalance -= playerAllCoins;
                var hoursAdded = Math.floor(timePassed/period);
                var Added = hoursAdded*profitOfPlayer;
                if(Added>contractBalance2){
                  if(!this.state.isEnd && !this.state.MOTH){
                  Swal({
                      html: "There are less money in the smart-contract than in your game account so you can't withdraw all of them! You can track smart-contract's balance online in 'My Money' section by hovering the money bags",
                      type: 'warning'

                  });
                    this.setState({MOTH: true});
                  }
                  document.querySelector('.info').classList.remove('dnone');
                }

                this.setState({allMoney: Number(playerAllCoins)+Added,
                  yourAllAnimals:animals[0]+animals[1]+animals[2]+animals[3]+animals[4],
                  yourProfit:profitOfPlayer,
                  allMoneyTRX: this.beauty(this.minO((Number(playerAllCoins)+Added)/80)) + " TRX",
                  investedMoneyTRX: this.beauty(this.minO(Number(this.state.investedMoney)/80)) + " TRX",
                  returnedMoneyTRX: this.beauty(this.minO(Number(this.state.returnedMoney)/80)) + " TRX"
                });
                if(!this.state.Timer){
                  if(!this.state.isEnd){
          if(contractBalance!==0 && profitOfPlayer>0){
            this.state.Timer = setInterval(() => {
              this.calcTime();
            }, 1000);
          }else{this.setState({timeLeft: ''});}
        }
        }
        var wait = (period - (timePassed % period))*1000;
              setTimeout(() => {
                this.calcMoney();
              }, wait);
}

      async checkForEnd(){
        contractBalance = await window.tronWeb.trx.getBalance(contractAddress)/12500;
        if(Number(this.state.Players)!==0){
          if(contractBalance===0){
            this.setState({isEnd: true});
            if(!this.state.MOTH){
            this.gameEnd();
          }
            contractTime = (await Utils.contract.last().call()).toNumber();

        }}
      }

      minO(x){
        x=(Number(x).toFixed(2)).toString();
        var y;
        for(var j=0;j<3;j++){
      if(x[x.length-1-j]==="0" || x[x.length-1-j]==="."){
        y = "";
      for(var i = 0;i<(x.length-1-j);i++){
        y = y + x[i];
      }
    }else {
      if(!y){y=x}
      return y;
    }
  }
    return Number(y);
      }

        calcTime(){
          contractTime = new Date();
          contractTime = contractTime.getTime()/1000 >> 0;
          var timePassed = contractTime-Number(this.state.yourTime);
          var timeLeft = (period - (timePassed % period));
          var minutesLeft = timeLeft/60>>0;
          var secondsLeft = timeLeft-(minutesLeft*60);
          if(secondsLeft<10){secondsLeft = "0"+secondsLeft}
          this.setState({timeLeft: minutesLeft + " : " + secondsLeft});
        }


    async play(){
        ifPart: if(!!window.tronWeb && window.tronWeb.ready){
          if(this.state.TronLinkValue===1){
          if(!(this.state.Players === "...") || !(this.state.Invested === "...") || !(this.state.PaidOut === "...") || !(this.state.Animals === "...")){
            this.setState({TronLinkValue: 0});
            this.playVisible();
            break ifPart;
      }else{return;}
    }
    this.playVisible();
      }else{
        if(!(await window.tronWeb) || !(await window.tronWeb.ready)){
          this.setState({TronLinkValue: 1});
          isClicked = true;
          return;
      }
    }
        await this.fetchData();
        if(this.state.TronLinkValue===1){return;}
        this.setState({MOTH: false});
        await this.fetchYourData();
        isClicked = false;
    }

    playVisible(){
      document.querySelector('.forButton').classList.add('dnone');
      document.querySelector('.BTP').classList.add('dnone');
      document.querySelector('.game').classList.remove('dnone');
      document.querySelector('.divForLogo').classList.add('dnone');
      document.querySelector('.cover').classList.add('dnone');
      document.querySelector('.menuBottom').classList.remove('dnone');
    }

      beauty(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

    async dep(value){
      this.setState({valueDep: '',valueDepTRX: '',});
      if(!this.state.isEnd){
        if(value > 0){
          var yourBalance = window.tronWeb.trx.getBalance(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString()));
            var totalBalance;
            vall = false;
           yourBalance.then( async function(result) {
            totalBalance = result;
            if(totalBalance >= Number(value)*12500){
            await Utils.contract.deposit().send({
              shouldPollResponse: false,
              callValue: value*12500});
              vall = true;
              Swal({
                  title:'Transaction sent',
                  type: 'success'

              });
          }else{
          Swal({
              title: 'Oops...',
              text: 'Make sure you have enough money in your wallet',
              type: 'error'

          });
        }
          });
          this.state.timeR = setInterval(() => this.depDop(value),200);
    }
  }else{this.gameEnd();}
  }

  depDop(value){
    if(vall){
      this.setState({allMoney: Number(this.state.allMoney) + Number(value),
        investedMoney: Number(this.state.investedMoney) + Number(value),
        Invested: Math.floor(Number(this.state.Invested) + Number(value)/80)
      });
      if(!Number(this.state.yourTime)){
        this.setState({Players: Number(this.state.Players)+1});
      }
      clearInterval(this.state.timeR);
      setTimeout(() => this.fetchData(), 7500);
      setTimeout(() => this.fetchYourData(), 8000);
    }
  }

    async buy(type, num){
        this.setState({ivch: '1',ivpg: '1',ivsh: '1',ivco: '1',ivge: '1'});
        if(!this.state.isEnd){
        if (num > 0){
          if(Number(this.state.allMoney)>=prices[Number(type)]*num){
          await Utils.contract.buy(type, num).send({
              shouldPollResponse:false,
              callValue:0
          });
          Swal({
              title:'Transaction sent',
              type: 'success'
          });
          var coins = prices[type]*num;
          this.setState({allMoney: Number(this.state.allMoney)-coins,
            totalAnimals: Number(this.state.totalAnimals)+num
          });
          setTimeout(() => this.fetchData(), 7500);
          setTimeout(() => this.fetchYourData(), 8000);
        }else{
          Swal({
              title:'Oops...',
              text: 'Make sure you have enough money in your account',
              type: 'error'

          })
        }
    }
  }else{this.gameEnd();}
}

    async improveFood(per){
      this.setState({ivper:1});
      if(!this.state.isEnd){
      if(Number(per) > 0 && Number(per) <=5 && Number(per)+Number(this.state.yourCoe)<=105){
        if(Number(per)*perPrice<=Number(this.state.allMoney)){
        await Utils.contract.setCoe(per).send({
            shouldPollResponse:false,
            callValue:0
        });
        Swal({
            title:'Transaction sent',
            type: 'success'

        })
        var coins = Number(per)*perPrice;
        this.setState({
          allMoney: Number(this.state.allMoney)-coins,
          yourCoe: Number(this.state.yourCoe)+Number(per)
        });
        setTimeout(() => this.fetchData(), 7500);
        setTimeout(() => this.fetchYourData(), 8000);
      }else{
        Swal({
                 title:'Oops...',
                 text: 'Make sure you have enough money in your account',
                 type: 'error'
            });
      }
      } else {
      Swal(
          {
               title:'Oops...',
               text: 'Make sure the final percentage is less than 106%',
               type: 'error'
          }
       );

     }
   }else{this.gameEnd();}
    }

    async pickUp(coins){
      coins = Number(coins);
      this.setState({puv: '',puvTRX: ''});
      await this.checkForEnd();
      if(!this.state.isEnd){
      if(coins > 0){
        if(Number(coins)<=Number(this.state.allMoney)){
        await Utils.contract.withdraw(coins).send({
          shouldPollResponse: false,
          callValue: 0
        });
        Swal({
            title:'Transaction sent',
            type: 'success'

        });
        contractBalance = await window.tronWeb.trx.getBalance(contractAddress)/12500;
        coins = coins > contractBalance ? contractBalance : coins;
        this.setState({allMoney: Number(this.state.allMoney)-coins,
          totalPayout: Number(this.state.totalPayout)+coins/80>>0,
          returnedMoney: Number(this.state.returnedMoney)+coins
        });
        setTimeout(() => this.fetchData(), 7500);
        setTimeout(() => this.fetchYourData(), 8000);
      }else{Swal({
        title:'Oops...',
        text: 'Make sure you have enough money in your account',
        type: 'error'

      })}
      }
    }else{this.gameEnd();}
    }

    gameEnd(){
      Swal({
          title:'Game over',
          text: 'Smart-contract has no more money :(',
          type: 'error'

      });
    }

    visible(){
      if(Number(this.state.val) === 0 ){
      document.querySelector('.cover').classList.remove('dnone');
      document.querySelector('.BTP').classList.remove('dnone');
      document.querySelector('.menuBottom').classList.remove('dnone');
    }
      this.setState({val: 5});
    }


        render() {
        if(Number(this.state.TronLinkValue) === 1){
          document.querySelector('.cover').classList.add('dnone');
          document.querySelector('.BTP').classList.add('dnone');
          document.querySelector('.menuBottom').classList.add('dnone');
            return <TronLinkGuide />;
        }
        return (
          <div className = "allReact">
          <div className = "forButton">
            <button className="play wow zoomIn" onClick={(event) => {event.preventDefault()
                                                               this.play()}  }>Play</button>
          </div>
          <div className="fixed-bg"></div>
          <div className = "game dnone">
            <ul className = "aboutGame wow fadeIn">
              <li className = "abgl adm">Your Address:<p className = "num"><a href={this.state.href} target="_blank" rel="noopener noreferrer" title="Click to see your transactions">{this.state.Address}</a></p></li>
              <li className = "abgl ads">Players:<p className = "num">{this.beauty(this.state.Players)}</p></li>
              <li className = "abgl ads">Animals:<p className = "num">{this.beauty(this.state.Animals)}</p></li>
              <li className = "abgl adb">Invested:<p className = "num">{this.beauty(this.state.Invested)+" TRX"}</p></li>
              <li className = "abgl adb">Paid Out:<p className = "num">{this.beauty(this.state.PaidOut)+" TRX"}</p></li>
            </ul>

            <div className = "account wow fadeIn" data-wow-delay="0.3s">My Account</div>

            <div className = "yourInf wow fadeIn" data-wow-delay="0.5s">

              <div className = "animal tw bgcn ">
                <div className = "invest">
                  <div className = "about">You have to buy coins to purchase animals</div>
                  <button className="improveFood button2" onClick={(event) => {event.preventDefault()
                    this.dep(this.state.valueDep)}  }>Buy</button>
                  <input min="1" step="1" className = "buLa wa" type="number" name="denumber" placeholder = "0" value = {this.state.valueDep} onChange={e => this.setState({valueDep: e.target.value, valueDepTRX: e.target.value/80})}/>
                    <img className = "valCoins1" alt="coin" src = {Coin}/>
                  <input min="0" className = "buLa2 wa" placeholder = "0" type = "number"  value = {this.state.valueDepTRX} onChange = {e => this.setState({valueDepTRX: e.target.value, valueDep: e.target.value*80})}/>
                    <div className = "TRX">TRX</div>
                  <div className = "about mt15 dop">1 TRX = 80<img src = {Coin} alt="coin" className= "coin" /></div>
                  <p className = "about">You can withdraw money you've earned</p><input min="1" step="1" className = "buLa3 wa" placeholder = "0" type="number" name="pinumber" value = {this.state.puv} onChange={e => this.setState({puv: e.target.value, puvTRX: e.target.value/80})}/>
                  <img className = "valCoins2" src = {Coin} alt="coin"/><button className="pickUp" onClick={(event) => {event.preventDefault()
                    this.pickUp(this.state.puv)}  }>Withdraw</button><input className = "wa buLa4" placeholder = "0" min="1" step="1" type = "number" name = "pinumber" value = {this.state.puvTRX} onChange = {e => this.setState({puv: e.target.value*80, puvTRX: e.target.value})}/>
                    <div className = "TRX">TRX</div></div>
                </div>


                <div className = " animal tw infbo">
                  <div className="top">
                    <p className="p">Animals on the farm:</p><p className="value f">{this.state.yourAllAnimals}<img src = {AnimalsP} alt="animals" className = "ym"/></p><hr></hr>
                    <p className="p">Total profit / hour:</p><p className="value">{this.state.yourProfit}<img src = {Coin} alt="coin" className = "ym"/></p><hr></hr>
                  </div>
                  <div className="myMoney">
                    <div className="name">My money</div>
                    <div className="myMoneyImg"><img src = {Money} alt="money bags"/></div>
                    <p className="info dnone">Smart-contract's balance: {this.beauty(this.minO(Number(contractBalance)))} Coins</p>
                    <p className="p"><img src = {Info} className="ym" alt="Tip" data-tooltip="The money you can freely use to buy animals or to withdraw. They are all yours!"/> Available:</p><p className="value" data-tooltip={this.state.allMoneyTRX}>{this.beauty(this.state.allMoney)}<img src = {Coin} className = "ym" alt="coin"/></p><hr></hr>
                    <p className="p"><img src = {Info} className="ym" alt="Tip" data-tooltip="The money you've withdrawed."/> Returned:</p><p className="value" data-tooltip={this.state.returnedMoneyTRX}>{this.beauty(this.state.returnedMoney)}<img src = {Coin} className = "ym" alt="coin"/></p><hr></hr>
                    <p className="p"><img src = {Info} className="ym" alt="Tip" data-tooltip="The money you've invested to the game by buying coins."/> Invested:</p><p className="value" data-tooltip={this.state.investedMoneyTRX}>{this.beauty(this.state.investedMoney)}<img src = {Coin} className = "ym" alt="coin"/></p><hr></hr>
                  </div>
                  <div className="time">{this.state.timeLeft}</div>
                </div>

            </div>
            <div className = "store wow fadeIn" data-wow-delay="0.5s">Store</div>
            <form className = "allani wow fadeIn" data-wow-delay="0.8s">

              <div className = "animal chick">
                <div className = "name"><span className="Name">Chick</span><small className="payback">&asymp;94%<span className="small"> /mo</span></small></div>
                <div className = "forImage"><img className = "image" src = {Chick} alt="chick"/></div>
                <div className = "about">
                  <p className = "p">You have:</p><p className="value f">{this.beauty(this.state.yourChicks)}</p><hr></hr>
                  <p className = "p">Cost:</p><p className="value">8,400<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                  <p className = "p">Profit / hour:</p><p className="value">11<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                </div>
                <button className="buy" onClick={(event) => {event.preventDefault();this.buy(0, this.state.ivch)}  }>buy</button>
                <input min="1" step="1" className = "wa" type="number" name="chnumber" value = {this.state.ivch} onChange={e => this.setState({ivch: e.target.value})}/>
              </div>

              <div className = "animal pig">
                <div className = "name"><span className="Name">Pig</span><small className="payback">&asymp;96%<span className="small"> /mo</span></small></div>
                <div className = "forImage"><img className = "image" src = {Pig} alt="pig"/></div>
                <div className = "about">
                  <p className = "p">You have:</p><p className="value f">{this.beauty(this.state.yourPigs)}</p><hr></hr>
                  <p className = "p">Cost:</p><p className="value">30,000<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                  <p className = "p">Profit / hour:</p><p className="value">40<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                </div>
                <button className="buy" onClick={(event) => {event.preventDefault();this.buy(1, this.state.ivpg)}  }>buy</button>
                <input min="1" step="1" className = "wa" type="number" name="pgnumber" value = {this.state.ivpg} onChange={e => this.setState({ivpg: e.target.value})}/>
              </div>

              <div className = "animal food">
                <button className="improveFood button1" onClick={(event) => {event.preventDefault();this.improveFood(this.state.ivper)}  }>Improve Nutrition</button>
                <input min="1" step="1" max="5" className = "ifi wa" type="number" name="pernumber" value={this.state.ivper} onChange={e => this.setState({ivper: e.target.value})}/>
                <div className = "pers">%</div>
                <p className = "description">If you improve nutrition, you will receive more profit from all of your animals. This can increase profit by up to 5 percent.</p>
                <div className = "about">
                  <p className = "p">Cost:</p><p className = "value f">{this.beauty(perPrice)}<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                  <p className = "p">You have:</p><p className = "value">{this.beauty(this.state.yourCoe)}%</p><hr></hr>
                </div>
              </div>

              <div className = "animal sheep"><
                div className = "name"><span className="Name">Sheep</span><small className="payback">&asymp;98%<span className="small"> /mo</span></small></div>
                <div className = "forImage"><img className = "image" src = {Sheep} alt="sheep"/></div>
                <div className = "about">
                  <p className = "p">You have:</p><p className = "value">{this.beauty(this.state.yourSheeps)}</p><hr></hr>
                  <p className = "p">Cost:</p><p className = "value">100,000<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                  <p className = "p">Profit / hour:</p><p className = "value">136<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                </div>
                  <button className="buy" onClick={(event) => {event.preventDefault();this.buy(2, this.state.ivsh)}  }>buy</button>
                  <input min="1" step="1" className = "wa" type="number" name="shnumber" value = {this.state.ivsh} onChange={e => this.setState({ivsh: e.target.value})}/>
              </div>

              <div className = "animal cow">
                <div className = "name"><span className="Name">Cow</span><small className="payback">100%<span className="small"> /mo</span></small></div>
                <div className = "forImage"><img className = "image" src = {Cow} alt="cow"/></div>
                <div className = "about">
                  <p className = "p">You have:</p><p className = "value">{this.beauty(this.state.yourCows)}</p><hr></hr>
                  <p className = "p">Cost:</p><p className = "value">230,400<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                  <p className = "p">Profit / hour:</p><p className = "value">320<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                </div>
                  <button className="buy" onClick={(event) => {event.preventDefault();this.buy(3, this.state.ivco)}  }>buy</button>
                  <input min="1" step="1" className = "wa" type="number" name="conumber" value = {this.state.ivco} onChange={e => this.setState({ivco: e.target.value})}/>
              </div>

              <div className = "animal horse">
                <div className = "name"><span className="Name">Horse</span><small className="payback">&asymp;102%<span className="small"> /mo</span></small></div>
                <div className = "forImage"><img className = "image" src = {Horse} alt="horse"/></div>
                <div className = "about">
                  <p className = "p">You have:</p><p className = "value">{this.beauty(this.state.yourHorses)}</p><hr></hr>
                  <p className = "p">Cost:</p><p className = "value">458,800<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                  <p className = "p">Profit / hour:</p><p className = "value">650<img className = "ym" src = {Coin} alt="coin"/></p><hr></hr>
                </div>
                  <button className="buy" onClick={(event) => {event.preventDefault();this.buy(4, this.state.ivge)}  }>buy</button>
                  <input min="1" step="1" className = "wa" type="number" name="honumber" value = {this.state.ivge} onChange={e => this.setState({ivge: e.target.value})}/>
              </div>
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
