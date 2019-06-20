import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './components/App/App.scss';

class Dop extends React.Component {

change(){
  document.querySelector('.cover').classList.remove('dnone');
  document.querySelector('.forButton').classList.remove('dnone');
  document.querySelector('.game').classList.add('dnone');



}

  render(){return(
    <div className = "forQA" onClick = {(event) => {event.preventDefault()
      this.change()}}><a class="sc" href="#">
      <p>Q&A</p></a></div>
    );
  }
}
class Dop2 extends React.Component {

change(){
  document.querySelector('.cover').classList.remove('dnone');
  document.querySelector('.forButton').classList.remove('dnone');
  document.querySelector('.game').classList.add('dnone');



}

  render(){return(
    <div className = "forQA" onClick = {(event) => {event.preventDefault()
      this.change()}}><a class="sc" href="#"><p>About game</p></a></div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Dop />, document.getElementById('dop'));
ReactDOM.render(<Dop2 />, document.getElementById('dop2'));
