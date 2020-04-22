import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  return (
    <tbody>
      {props.all === 0
        ? (<tr><td>No feedback</td></tr>)
        : (
          <>
            <StatisticLine text={'Good '} value={props.good} />
            <StatisticLine text={'Neutral '} value={props.neutral} />
            <StatisticLine text={'Bad '} value={props.bad} />
            <StatisticLine text={'All '} value={props.all} />
            <StatisticLine text={'Average '} value={props.average} />
            <StatisticLine text={'Positive percentage '} value={props.positivePercentage} />
          </>
        )}
    </tbody>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clicks, setClicks] = useState([]);

  const handleGoodClick = () => {
    setGood(good + 1);
    setClicks(clicks.concat(1));
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setClicks(clicks.concat(0));
  }
  const handleBadClick = () => {
    setBad(bad + 1);
    setClicks(clicks.concat(-1));
  }

  const all = good + neutral + bad;
  const sum = clicks.reduce((a, b) => a + b, 0);
  const avg = (sum / clicks.length).toFixed(2) || 0;
  const positivePercentage = Math.round(good / (good + neutral + bad) * 100);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text={'Good'} />
      <Button onClick={handleNeutralClick} text={'Neutral'} />
      <Button onClick={handleBadClick} text={'Bad'} />
      <br />
      <br />
      <h3>Statistics</h3>
      <table>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={avg} positivePercentage={positivePercentage} />
      </table>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)