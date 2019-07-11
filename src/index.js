import React from 'react';
import ReactDOM from 'react-dom';
import Classes from './components/App';
import './components/App/App.scss';

var myRef = React.createRef();
var myRef2 = React.createRef();


class Dop extends React.Component {

    scrollToMyRef = () => window.scrollTo(0, myRef.current.offsetTop - 160)


change(){
  document.querySelector('.cover').classList.remove('dnone');
  document.querySelector('.forButton').classList.remove('dnone');
  document.querySelector('.game').classList.add('dnone');
  document.querySelector('.divForLogo').classList.remove('dnone');
  document.querySelector('.BTP').classList.remove('dnone');
  this.scrollToMyRef();
}

  render(){return(
    <div className = "forQA" onClick = {(event) => {event.preventDefault()
      this.change()}}><a className="sc">
      <p>Q&A</p></a></div>
    );
  }
}
class Dop2 extends React.Component {

scrollToMyRef(){window.scrollTo(0, myRef2.current.offsetTop - 120);}


change(){
  document.querySelector('.cover').classList.remove('dnone');
  document.querySelector('.forButton').classList.remove('dnone');
  document.querySelector('.game').classList.add('dnone');
  document.querySelector('.divForLogo').classList.remove('dnone');
  document.querySelector('.BTP').classList.remove('dnone');
  this.scrollToMyRef();
}

  render(){return(
    <div className = "forQA" onClick = {(event) => {event.preventDefault()
      this.change()}}><a className="sc"><p>About game</p></a></div>
    );
  }
}

class ScQna extends React.Component {
  render(){
    return(<div ref = {myRef}></div>);
  }
}
class ScAboutFarm extends React.Component {
  render(){
    return(<div ref = {myRef2}></div>);
  }
}

var App = Classes.App;
var ButtonPlay = Classes.ButtonPlay;

ReactDOM.render(<ButtonPlay />, document.getElementById('ButtonPlay'));
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Dop />, document.getElementById('dop'));
ReactDOM.render(<Dop2 />, document.getElementById('dop2'));
ReactDOM.render(<Dop />, document.getElementById('dop3'));
ReactDOM.render(<Dop2 />, document.getElementById('dop4'));
ReactDOM.render(<ScQna />, document.getElementById('scQna'));
ReactDOM.render(<ScAboutFarm />, document.getElementById('scAboutFarm'));
