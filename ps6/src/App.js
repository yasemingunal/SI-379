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

  const [showingFeedback, setShowingFeedback] = React.useState(false);
  const [cheatingMode, setCheatingMode] = React.useState(false);

  const doGuess = React.useCallback(() => {
    setShowingFeedback(true);
  }, []);

  const doAdvance = React.useCallback(() => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));

    setRedGuess(MAX);
    setGreenGuess(MAX);
    setBlueGuess(MAX);

    setShowingFeedback(false);
  }, []);

  const onChangeCheatingMode = React.useCallback((e) => {
    setCheatingMode(e.target.checked);
  }, []);

  const showUserColor = cheatingMode || showingFeedback;

  return (
    <div className="App">
      <label id="cheating-mode">Cheating mode <input type="checkbox" value={cheatingMode} onChange={onChangeCheatingMode} /></label>
      <div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
      <p>Guess the color of the rectangle</p>
      
      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${guessRed/MAX})`  }}>Red:</span>
          {!showingFeedback && <Slider min={MIN} max={MAX} startingValue={guessRed} onChange={r => setRedGuess(r)}  />}
        </div>
        <div className="row">

          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${guessGreen/MAX})`}}>Green:</span>
          {!showingFeedback && <Slider min={MIN} max={MAX} startingValue={guessGreen} onChange={g => setGreenGuess(g)}  />}
        
        </div>
        <div className="row">
          
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${guessBlue/MAX})` }}>Blue:</span>
          {!showingFeedback && <Slider min={MIN} max={MAX} startingValue={guessBlue} onChange={b => setBlueGuess(b)} />}

        </div>
      </div>    

      {showingFeedback && <p>Your guess: rgb({guessRed}, {guessGreen}, {guessBlue}). Actual: <strong>rgb({red}, {green}, {blue}).</strong></p> }

      {!showingFeedback && <button onClick={doGuess}>Guess</button> }
      {showingFeedback && <button onClick={doAdvance}>Next</button>}

      {showUserColor && <div id='guess-preview' style={{backgroundColor: `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`}}/>}
      {showUserColor && <div id='answer-color' style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />}
      </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}