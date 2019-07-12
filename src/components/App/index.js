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


import './App.scss';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

////////////////////////////////////////////////////////////////////////////////////  TWZKc8UuVBZi7KcSuD9WaUBQJCYK2XtTCs - mainnet(0)
const contractAddress = 'TVhadi9aa1ryHRYnB776NVB6EgTstUfkMZ';   /// Add your contract address here TTdXi3GmM2Wj9EAcpkGiGyLzpNZ74v6wtN - mainnet(1)  TAdeCTb92LGwEP1QygfdhHb23hydwRbf53 - mainnet(2)  TC5xZKwk8ttafnWt56YB22Ev6NnMyyUm7B - mainnet(3) TXhSWnFWu91Qo4P6Lay5Bbd2q7inBBabVQ -mainnet(now)
////////////////////////////////////////////////////////////////////////////////////  TNXzh6W6i2CTvKexaSeZ6863qZM4dkKog8 - testnet TGCSK1RXuzGvjvBW7j9QBFz5P4fHU48sCj -testnet(2) TVhadi9aa1ryHRYnB776NVB6EgTstUfkMZ - testnet(now)
var isClicked = false;
var period = 120;
var contractBalance;
var profit = [300, 1000, 4000, 8000, 1600];
var prices = [8800, 30000, 100000, 230400, 458800];

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
              TronLinkValue: ''

            }
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


    async checkForClick(){
      if(isClicked){
        clearInterval(this.state.timer);
        if(this.state.TronLinkValue == 1){
          if(!!window.tronWeb && window.tronWeb.ready){
            await this.fetchData();
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
        if(!this.state.TronLinkValue == 1){isClicked = false;}
        this.state.timer = setInterval(() => {
            this.checkForClick();
          }, 200);
	     }
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
        Invested: Math.ceil(result2) + ' TRX',
        PaidOut: Math.ceil(result3) + ' TRX',
        Animals: result4,
        Address: result5
      });
    }

    checkForEntering(){
      if(this.state.Players == "..." || this.state.Invested == "..." || this.state.PaidOut == "..." || this.state.Animals == "..."){
        this.setState({TronLinkValue: 1});
      }
        document.querySelector('.divForLogo').classList.remove('dnone');
    }

    async fetchYourData() {
      contractBalance = await window.tronWeb.trx.getBalance(contractAddress)/12500;
      var contractTime = new Date();
      contractTime = contractTime.getTime()/1000 >> 0;
      var player = new Object();
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
      if(contractBalance>0){
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
    }else{
      this.setState({
      allMoney: 0,
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
    }
  }

  async calcMoney(){
        contractBalance = await window.tronWeb.trx.getBalance(contractAddress)/12500;
        var contractTime = new Date();
        contractTime = contractTime.getTime()/1000 >> 0;
        var player = new Object();
        player = await Utils.contract.players(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
        var playerAllCoins = player.allCoins;
        var timePassed = contractTime-Number(this.state.yourTime);
        var profitOfPlayer=0;
        var animals = new Array();
        animals = [Number(this.state.yourChicks),Number(this.state.yourPigs),Number(this.state.yourSheeps),Number(this.state.yourCows),Number(this.state.yourHorses)];
               for(var f=0; f<5;f++){
                  profitOfPlayer += animals[f]*profit[f];
                }
                profitOfPlayer = profitOfPlayer*Number(this.state.yourCoe)/100;
                if(!profitOfPlayer){profitOfPlayer=0;}
        if(contractBalance>playerAllCoins){
        contractBalance -= playerAllCoins;
                var hoursAdded = Math.floor(timePassed/period);
                var Added = hoursAdded*profitOfPlayer;
                if(Added>=contractBalance){
                  Added = contractBalance
                }
                this.setState({allMoney: Number(playerAllCoins)+Added,
                  yourAllAnimals:animals[0]+animals[1]+animals[2]+animals[3]+animals[4],
                  yourProfit:profitOfPlayer
                });
        }else if(contractBalance==playerAllCoins){}
        else if(contractBalance<playerAllCoins){

          this.setState({allMoney: contractBalance,
            yourAllAnimals:animals[0]+animals[1]+animals[2]+animals[3]+animals[4],
            yourProfit:profitOfPlayer
          });
        }
        var wait = (period - (timePassed % period))*1000;
            const timer = setTimeout(() => {
                this.calcMoney();
              }, wait);
}

    async play(){
        ifPart: if(!!window.tronWeb && window.tronWeb.ready){
          if(this.state.TronLinkValue==1){
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
        if(this.state.TronLinkValue==1){return;}
        await this.fetchYourData();
        isClicked = true;
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
        if(value > 0){
          var yourBalance = window.tronWeb.trx.getBalance(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString()));
            var totalBalance;
           yourBalance.then( async function(result) {
            totalBalance = result;
            if(totalBalance >= value*12500){
            await Utils.contract.deposit().send({
              shouldPollResponse: true,
              callValue: value*12500});
              Swal({
                  title:'Transaction Sent',
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
          const timer = setTimeout(() => this.fetchData(), 6000);
          const timer2 = setTimeout(() => this.fetchYourData(), 6000);
    }
  }

    async buy(type, num){
        this.setState({ivch: '1',ivpg: '1',ivsh: '1',ivco: '1',ivge: '1'});
        if (num > 0){
          if(Number(this.state.allMoney)>=prices[Number(type)]*num){
          await Utils.contract.buy(type, num).send({
              shouldPollResponse:false,
              callValue:0
          });
          Swal({
              title:'Transaction Sent',
              type: 'success'
          });
          const timer = setTimeout(() => this.fetchData(), 6000);
          const timer2 = setTimeout(() => this.fetchYourData(), 6000);
        }else{
          Swal({
              title:'Oops...',
              text: 'Make sure you have enough money in your account',
              type: 'error'

          })
        }
    }
}
    async improveFood(per){
      this.setState({ivper:1});
      if(Number(per) > 0 && Number(per) <=5 && Number(per)+Number(this.state.yourCoe)<=105){
        if(Number(per)*4500<=Number(this.state.allMoney)){
        await Utils.contract.setCoe(per).send({
            shouldPollResponse:false,
            callValue:0
        });
        Swal({
            title:'Transaction Sent',
            type: 'success'

        })
        const timer = setTimeout(() => this.fetchData(), 6000);
        const timer2 = setTimeout(() => this.fetchYourData(), 6000);
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
    }

    async pickUp(coins){
      this.setState({puv: 0,puvTRX: 0});
      if(coins > 0){
        if(Number(coins)<=Number(this.state.allMoney)){
        await Utils.contract.withdraw(coins).send({
          shouldPollResponse: false,
          callValue: 0
        });
        Swal({
            title:'Transaction Sent',
            type: 'success'

        })
        const timer = setTimeout(() => this.fetchData(), 6000);
        const timer2 = setTimeout(() => this.fetchYourData(), 6000);
      }else{Swal({
        title:'Oops...',
        text: 'Make sure you have enough money in your account',
        type: 'error'

      })}
      }
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
              <li className = "abgl ads">Players:<p className = "num">{this.beauty(this.state.Players)}</p></li>
              <li className = "abgl ads">Animals:<p className = "num">{this.beauty(this.state.Animals)}</p></li>
              <li className = "abgl adb">Invested:<p className = "num">{this.beauty(this.state.Invested)}</p></li>
              <li className = "abgl adb">Paid Out:<p className = "num">{this.beauty(this.state.PaidOut)}</p></li>
            </ul>

            <div className = "yourInf">
              <div className = "account">My Account</div>
              <div className = "animal tw bgcn "><div className = "invest"><div className = "about">You have to buy coins to purchase animals</div><button className="improveFood button2" onClick={(event) => {event.preventDefault()
                this.dep(this.state.valueDep)}  }>Buy</button><input min="1" step="1" className = "buLa wa" type="number" name="denumber" placeholder = "0" value = {this.state.valueDep} onChange={e => this.setState({valueDep: e.target.value, valueDepTRX: e.target.value/80})}/><img className = "valCoins1" src = {Coin}/>
              <input min="0" className = "buLa2 wa" placeholder = "0" type = "number"  value = {this.state.valueDepTRX} onChange = {e => this.setState({valueDepTRX: e.target.value, valueDep: e.target.value*80})}/><div className = "TRX">TRX</div><div className = "about mt15 dop">1 TRX = 80
                <img src = {Coin} className= "coin" /></div><p className = "about">You can withdraw money you've earned</p><input min="1" step="1" className = "buLa3 wa" placeholder = "0" type="number" name="pinumber" value = {this.state.puv} onChange={e => this.setState({puv: e.target.value, puvTRX: e.target.value/80})}/>
                <img className = "valCoins2" src = {Coin}/><button className="pickUp" onClick={(event) => {event.preventDefault()
                    this.pickUp(this.state.puv)}  }>Withdraw</button><input className = "wa buLa4" placeholder = "0" min="1" step="1" type = "number" name = "pinumber" value = {this.state.puvTRX} onChange = {e => this.setState({puv: e.target.value*80, puvTRX: e.target.value})}/><div className = "TRX">TRX</div></div></div>

                <div className = "Infbo">
                  <div className="top">
                  <p>Animals on the farm:</p><p className="value">{this.state.yourAllAnimals}</p>
                  <p>Total profit per hour:</p><p className="value">{this.state.yourProfit}</p>
                  </div>
                  <div className="myMoney">
                    <div className="name">My money</div>
                    <div className="myMoneyImg"></div>
                    <p>Available:</p><p className="value">{this.beauty(this.state.allMoney)}</p><img src = {Coin} className = "ym"/>
                    <p>Returned:</p><p className="value">{this.beauty(this.state.returnedMoney)}</p><img src = {Coin} className = "ym"/>
                    <p>Invested:</p><p className="value">{this.beauty(this.state.investedMoney)}</p><img src = {Coin} className = "ym"/>
                  </div>
                  <div className="time"></div>
                </div>
            </div>
            <form className = "allani">
              <div className = "store">Store</div>

              <div className = "animal chick"><div className = "name">Chick</div><img className = "image" src = {Chick}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" readOnly value = {this.state.yourChicks}/></div><div className = "cost"><div>Cost:</div>
              <input className = "costI" defaultValue = "8,800" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" defaultValue = "23" /><img className = "coinfp1" src = {Coin}/>per hour</div></div>
              <button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(0, this.state.ivch)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="chnumber" value = {this.state.ivch} onChange={e => this.setState({ivch: e.target.value})}/></div>

                                                               <div className = "animal pig"><div className = "name">Pig</div><img className = "image" src = {Pig}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" readOnly value = {this.state.yourPigs}/></div><div className = "cost"><div>Cost:</div>
                                                               <input className = "costI" defaultValue = "30,000" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" defaultValue = "80" /><img className = "coinfp2" src = {Coin}/>per hour</div></div>
                                                               <button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(1, this.state.ivpg)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="pgnumber" value = {this.state.ivpg} onChange={e => this.setState({ivpg: e.target.value})}/></div>

                                                               <div className = "animal food"><button className="improveFood button1" onClick={(event) => {event.preventDefault()
                                                                                                                    this.improveFood(this.state.ivper)}  }>Improve Nutrition</button>
                                                                                                                  <input min="1" step="1" max="5" className = "ifi wa" type="number" name="pernumber" value={this.state.ivper} onChange={e => this.setState({ivper: e.target.value})}/><div className = "pers">%</div>
                                                                                                                <p className = "description">If you improve nutrition, you will receive more profit from all of your animals. This can increase profit by up to 5 percent.</p><div className = "cost2"><div>Cost:</div>
                                                                                                                <input className = "costI2" defaultValue = "4,500" /><img className = "coinfa2" src = {Coin}/></div><div className = "youHave">You have:<input className = "thisAnumber" readOnly value = {this.state.yourCoe}/><p className = "Pers">%</p></div></div>



              <div className = "animal sheep"><div className = "name">Sheep</div><img className = "image" src = {Sheep}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" readOnly value = {this.state.yourSheeps}/></div><div className = "cost"><div>Cost:</div>
              <input className = "costI" defaultValue = "100,000" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" defaultValue = "272" /><img className = "coinfp2" src = {Coin}/>per hour</div></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(2, this.state.ivsh)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="shnumber" value = {this.state.ivsh} onChange={e => this.setState({ivsh: e.target.value})}/></div>

                                                               <div className = "animal cow"><div className = "name">Cow</div><img className = "image" src = {Cow}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" readOnly value = {this.state.yourCows}/></div><div className = "cost"><div>Cost:</div>
                                                               <input className = "costI" defaultValue = "230,400" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" defaultValue = "640" /><img className = "coinfp2" src = {Coin}/>per hour</div></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(3, this.state.ivco)}  }>buy</button><input min="1" step="1" className = "wa" type="number" name="conumber" value = {this.state.ivco} onChange={e => this.setState({ivco: e.target.value})}/></div>

                                                               <div className = "animal horse"><div className = "name">Horse</div><img className = "image" src = {Horse}/><div className = "about"><div className = "youHave">You have:<input className = "thisAnumber" readOnly value = {this.state.yourHorses}/></div><div className = "cost"><div>Cost:</div>
                                                               <input className = "costI" defaultValue = "458,800" /><img className = "coinfa" src = {Coin}/></div><div className = "profit"><div className = "profitp">Profit:</div><input className = "profitI" defaultValue = "1,300" /><img className = "coinfp2" src = {Coin}/>per hour</div></div><button className="buy" onClick={(event) => {event.preventDefault()
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
