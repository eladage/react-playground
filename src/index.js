import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg'
import './App.css';
import './bootstrap.min.css'
import * as serviceWorker from './serviceWorker';
import _ from 'lodash';



var arr = ["test1234", "test2123123", "test3123412312431412"];

console.log(arr.map(x => x + 'test'));
console.log(arr.filter(x => x.length < 10));
console.log(arr.reduce((acc, n) => acc + n));

const rand = (x) => {
  const r = Math.floor(Math.random() * x) + 1;
  console.log("0 - " + x + "\n" + r + ": " + (r / x).toFixed(2));
  return r;
};

var Head = () => {
  return (
    <div style={{marginBottom: '2em'}}>
      <div><h1>React playground</h1></div>
    </div>

  );
}

var buttonStyle = {
  color: 'black',
  backgroundColor: 'white',
  width: '10%'
};

var ClickyButtons = ({ numberOfButtons, onSelection }) => {
  const createButton = n => <button style={buttonStyle} id={n} key={n} onClick={e => onSelection(e.target.id)}>{n}</button>;
  return <div>
    {_.range(1, numberOfButtons + 1).map(x => createButton(x))}
  </div>
}

function Test(props) {
  return <div>
    <button className="btn btn-success" 
            style={{position: 'absolute', top: 0, right: 0}} 
            onClick={() => { props.handleClick(rand(rand(rand(rand(100000000))))); }}>{props.test}</button>
  </div>
}

const buttonName = "this is a button...";

const Selected = (props) => {
  return (
    <div className="page-header text-center" style={{fontSize: '3em'}}>{props.selection}</div>
  )
}

const BackgroundColor = (props) => {
  if(props.color != null) {console.log(props.color)};

  return (
    <div className="">
      <input type="text" value={props.color} onChange={props.handleChange} placeholder="Enter a Color" />
      <input type="button" value="Change Color" onClick={props.handleSubmit}/>
    </div>
  );  
}

const ButtonInput = (props) => {
  let x = props.numberOfButtons;
  return (
    <div>
      <input type="number" 
             defaultValue= {x} 
             onChange={props.handleChange} 
             placeholder="Number of Buttons"
             style={{position: 'absolute', left: 0, top: 0}}>
      </input>
    </div>
    
  )
}

const Footer = () => {
  return (
    <footer className="footerCode">
      <code>//Eric Ladage</code>
    </footer>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: "click a button to change this value",
      color: '',
      numberOfButtons: 10
    }

    console.log("re-rendering");
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
  }

  handleChange(e) {
    this.setState({ color: e.target.value});
    document.getElementById('root').style.backgroundColor = this.state.color;
  }

  handleSubmit(e) {
    document.getElementById('root').style.backgroundColor = this.state.color;
  }

  buttonChange(e) {
    this.setState({ numberOfButtons: e.target.value });
  }
  
  render() {
    return (

      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Head /> 
          <br />
        </header>
        <br/>
        <ButtonInput handleChange={this.buttonChange} numberOfButtons={this.state.numberOfButtons}/>
        <Test handleClick={whatever => console.log(whatever)} test={buttonName} />
        <ClickyButtons numberOfButtons={this.state.numberOfButtons} onSelection={ n => {
          console.log("You just clicked: " + n );
          return this.setState({ selection: n }); 
        }} />
        <br/>
        <Selected selection={this.state.selection} />
        <BackgroundColor color={this.state.color}
                         handleChange={this.handleChange}
                         handleSubmit={this.handleSubmit}/> 

        <Footer />
      </div>
    )
  }
}

var root = document.getElementById('root');
ReactDOM.render(<App />, root);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
