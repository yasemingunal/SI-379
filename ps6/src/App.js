import Slider from './Slider';
import React from "react";
import './ColorPicker.css';


const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [guessRed, setRedGuess] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [guessGreen, setGreenGuess]  = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [guessBlue, setBlueGuess] = React.useState(getRandomIntegerBetween(MIN, MAX));

  const redDiff = red - guessRed;

  return (
    <div className="App">
      <div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
      <p>Guess the color of the rectangle</p>
      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${guessRed/MAX})`  }}>Red:</span>
          <Slider min={MIN} max={MAX} startingValue={guessRed} onChange={r => setRedGuess(r)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${guessGreen/MAX})`}}>Green:</span>
          <Slider min={MIN} max={MAX} startingValue={guessGreen} onChange={g => setGreenGuess(g)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${guessBlue/MAX})` }}>Blue:</span>
          <Slider min={MIN} max={MAX} startingValue={guessBlue} onChange={b => setBlueGuess(b)} />
        </div>
      </div>
      <button onClick={() => 
        //<div id='guess-preview' style={{backgroundColor: `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`}}></div>
        console.log("Your guess: rgb("+ guessRed+", "+guessGreen+", "+guessBlue+")"+
        "Actual: rgb("+ red+", "+green+", "+blue+")")
      }>Guess</button>
    </div>
  );
}


export default App;

function getRandomIntegerBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}