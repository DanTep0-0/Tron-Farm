import React from 'react';
import TronLinkGuide from 'components/TronLinkGuide';
import TronWeb from 'tronweb';
import Utils from 'utils';
import Swal from 'sweetalert2';
import Chick from './chick.png';
import Pig from './pig.png';
import Sheep from './sheep.png';
import Cow from './cow.png';
import GoldenChicken from './goldenChicken.png';
import Coin from './coin.png';


import './App.scss';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

////////////////////////////////////////////////////////////////////////////////////
const contractAddress = 'TNXzh6W6i2CTvKexaSeZ6863qZM4dkKog8';   /// Add your contract address here TPffVQcdLNqMExcXTnuASPM5EYX4NpzVB5 deployed
////////////////////////////////////////////////////////////////////////////////////

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
              ivch: '0',
              ivpg: '0',
              ivsh: '0',
              ivco: '0',
              ivge: '0',
              ivper: '0',
              improveFoodval: '0',
              puv: '0',
              valueDep: '0',
              allMoney: '0',
              investedMoney: '0',
              returnedMoney: '0',
              yourChicks: '0',
              yourPigs: '0',
              yourSheeps: '0',
              yourCows: '0',
              yourGoldenChickens: '0'

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

    async fetchData(){
      var result1 = (await Utils.contract.totalPlayers().call()).toNumber();
      var result2 = (await Utils.contract.totalInvested().call()).toNumber() / 80;
      var result3 = (await Utils.contract.totalPayout().call()).toNumber() / 1000000;
      var result4 = (await Utils.contract.totalAnimals().call()).toNumber();
      var result5 = Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString());
      result5 = result5.slice(0, 10);
      this.setState({
        Players: result1,
        Invested: result2 + ' TRX',
        PaidOut: result3 + ' TRX',
        Animals: result4,
        Address: result5 + '...'
      });
    }
    async fetchYourData(){
      var player = new Object();
    player = await Utils.contract.players(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
    var result1 = player.allCoins;
    var result2 = player.usedCoins;
    var result3 = player.coinsReturned;
    console.log(result1 + "  " + result2 + "  " + result3 + "  ");
    var animals = [];
    animals = await Utils.contract.animalsOf(Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())).call();
    var result4 = animals[0];
    var result5 = animals[1];
    var result6 = animals[2];
    var result7 = animals[3];
    var result8 = animals[4];
    console.log("animals: " + animals);
    this.setState({allMoney: result1,
      investedMoney: result2,
      returnedMoney: result3,
      yourChicks: result4,
      yourPigs: result5,
      yourSheeps: result6,
      yourCows: result7,
      yourGoldenChickens: result8
    });
    }

    play(){
        if(!!window.tronWeb && window.tronWeb.ready){
        document.querySelector('.forButton').classList.add('dnone');
        document.querySelector('.game').classList.remove('dnone');}

        this.fetchData();
        this.fetchYourData();
    }

    async dep(value){
      console.log(value);
      // if(Number.isInteger(value)){
        console.log('in dep()');
        if(value > 0){
          console.log('value > 0');
          await Utils.contract.deposit().send({
            shouldPollResponse: true,
            callValue: value*1000000})
            .then(res => Swal({
                title:'Transaction Successful',
                type: 'success'

            })).catch(err => Swal(
                {
                     title:'Transaction Failed',
                     type: 'error'
                }
            ));
          this.fetchData();
          this.fetchYourData();
        // }
      }
    }

    async buy(type, num){

        if (num > 0){
          await Utils.contract.buy(type, num).send({
              shouldPollResponse:true,
              callValue:0
          }).then(res => Swal({
              title:'Transaction Successful',
              type: 'success'

          })).catch(err => Swal(
              {
                   title:'Transaction Failed',
                   type: 'error'
              }
          ));
          this.fetchData();
          this.fetchYourData();
          console.log('type: ', type, '  num: ', num);
        }
    }

    async improveFood(per){
      console.log('in improveFood()');
      if(per > 0 && per <=5){
        this.state.improveFoodval = this.state.improveFoodval + per;
        if(this.state.improveFoodval + per <= 105){
        console.log('per > 0 and per <=5');
        await Utils.contract.setCoe(per).send({
            shouldPollResponse:true,
            callValue:0
        }).then(res => Swal({
            title:'Transaction Successful',
            type: 'success'

        })).catch(err => Swal(
            {
                 title:'Transaction Failed',
                 type: 'error'
            }
        ));
        console.log('maybe good');
      } else {
        Swal(
            {
                 type: 'error',
                 title: 'Oops...',
                 text: 'Percent of money received from improving food must be < 106'
            }
        );
      }
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
      console.log(coins);
      if(coins > 0){
        await Utils.contract.withdraw(coins).send({
          shouldPollResponse: true,
          callValue: 0
        }).then(res => Swal({
              title:'Transaction Successful',
              type: 'success'
            })).catch(err => Swal(
              {
                   title:'Transaction Failed',
                   text: 'Make sure you pasted number of coins that you have',
                   type: 'error'
              }
          ));

      }
      this.fetchYourData();
    }





        render() {
        if(!this.state.tronWeb.installed)
            return <TronLinkGuide />;

        if(!this.state.tronWeb.loggedIn)
            return <TronLinkGuide installed />;

        return (
          <div className = "allReact">
          <div className = "forButton">
            <button className="play" onClick={(event) => {event.preventDefault()
                                                               this.play()}  }>Play</button>
          </div>
          <div className = "game dnone">
            <ul className = "aboutGame">
              <li className = "abgl">Your Address:<p className = "num">{this.state.Address}</p></li>
              <li className = "abgl">Players:<p className = "num">{this.state.Players}</p></li>
              <li className = "abgl">Invested:<p className = "num">{this.state.Invested}</p></li>
              <li className = "abgl">Paid Out:<p className = "num">{this.state.PaidOut}</p></li>
              <li className = "abgl">Animals:<p className = "num">{this.state.Animals}</p></li>
            </ul>
            <form className = "allani">
            <div className = "animalsp f">
              <div className = "animal chick"><div className = "name">Chick</div><img className = "image" src = {Chick}/><div className = "about">5760<img className = "coinfa" src = {Coin}/></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(0, this.state.ivch)}  }>buy</button><div className = "quantity"><input min="1" step="1" className = "wa" type="number" name="chnumber" value = {this.state.ivch} onChange={e => this.setState({ivch: e.target.value})}/></div></div>

                                                               <div className = "animal pig"><div className = "name">Pig</div><div className = "forImage"><img className = "image" src = {Pig}/><div className = "about">11760<img className = "coinfa" src = {Coin}/></div></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(1, this.state.ivpg)}  }>buy</button><div className = "quantity"><input min="1" step="1" className = "wa" type="number" name="pgnumber" value = {this.state.ivpg} onChange={e => this.setState({ivpg: e.target.value})}/></div></div>

                                                               <div className = "animal food"><button className="improveFood button1" onClick={(event) => {event.preventDefault()
                                                                                                                    this.improveFood(this.state.ivper)}  }>Improve Nutrition</button><div className = "quantity">
                                                                                                                  <input min="1" step="1" className = "ifi wa" type="number" name="pernumber" value={this.state.ivper} onChange={e => this.setState({ivper: e.target.value})}/></div><div className = "pers">%</div>
                                                                                                                <p className = "description">If you improve nutrition, you will receive more profits. This can increase profits by up to 5 percent.</p></div>



            </div>
            <div className = "animalsp">
              <div className = "animal sheep"><div className = "name">Sheep</div><img className = "image" src = {Sheep}/><div className = "about">24000<img className = "coinfa" src = {Coin}/></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(2, this.state.ivsh)}  }>buy</button><div className = "quantity"><input min="1" step="1" className = "wa" type="number" name="shnumber" value = {this.state.ivsh} onChange={e => this.setState({ivsh: e.target.value})}/></div></div>

                                                               <div className = "animal cow"><div className = "name">Cow</div><img className = "image" src = {Cow}/><div className = "about">61200<img className = "coinfa" src = {Coin}/></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(3, this.state.ivco)}  }>buy</button><div className = "quantity"><input min="1" step="1" className = "wa" type="number" name="conumber" value = {this.state.ivco} onChange={e => this.setState({ivco: e.target.value})}/></div></div>

                                                               <div className = "animal goldenEgg"><div className = "name">Golden Chicken</div><img className = "image" src = {GoldenChicken}/><div className = "about">312000<img className = "coinfa" src = {Coin}/></div><button className="buy" onClick={(event) => {event.preventDefault()
                                                                 this.buy(4, this.state.ivge)}  }>buy</button><div className = "quantity"><input min="1" step="1" className = "wa" type="number" name="genumber" value = {this.state.ivge} onChange={e => this.setState({ivge: e.target.value})}/></div></div>
            </div>
            </form>
            <div className = "yourInf">
              <div className = "animal tw bgcn "><div className = "invest"><button className="improveFood button2" onClick={(event) => {event.preventDefault()
                this.dep(this.state.valueDep)}  }>Buy</button><input min="1" step="1" className = "buLa wa" type="number" name="denumber" value = {this.state.valueDep} onChange={e => this.setState({valueDep: e.target.value})}/><div className = "about">You have to buy coins to grow animals</div><div className = "about mt15 dop">1 TRX = 80
                <img src = {Coin} className= "coin" /></div><input min="1" step="1" className = "pickUp wa" type="number" name="pinumber" value = {this.state.puv} onChange={e => this.setState({puv: e.target.value})}/><button className="pickUp" onClick={(event) => {event.preventDefault()
                    this.pickUp(this.state.puv)}  }>Pick Up</button><p className = "about">You can pick up money that you've earned or that you haven't used</p></div></div>

                  <table className = "Infbo">
                    <tr className = "yourInftr1">
                      <td className = "yitd" ><div className = "top">Your Money</div><input className = "bottom" value = {this.state.allMoney} /></td>
                      <td className = "yitd" ><div className = "top">Invested Money</div><input className = "bottom" value = {this.state.investedMoney}/></td>
                      <td className = "yitd" ><div className = "top">Used Money</div><input className = "bottom" value = {this.state.usedMoney}/></td>
                    </tr>
                    <tr className  = "yourInftr2">
                      <div className = "yourAnimals">Your Animals</div>
                      <div className = "abThisAnimal"><input className = "wa" type = "number" value = {this.state.yourChicks}/></div>
                      <div className = "abThisAnimal"><img className = "instance sa" src = {Pig}/></div>
                      <div className = "abThisAnimal"><img className = "instance tha" src = {Sheep}/></div>
                      <div className = "abThisAnimal"><img className = "instance foa" src = {Cow}/></div>
                      <div className = "abThisAnimal"><img className = "instance fia" src = {GoldenChicken}/></div>
                    </tr>
                    </table>
            </div>
          </div>
          </div>
        );
    }
}

export default App;
