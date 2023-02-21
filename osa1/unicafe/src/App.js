import { useState } from 'react';

const Button = (props) => {
 return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
 };

const Statistics = (props) => {
  console.log(props);
  if (props.sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  };
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.sum} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = (props) => {
  console.log(props);
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const sum = (good + neutral + bad);

  const setGoodValue = () => {
    console.log('value now', good)
    setGood(good + 1);
  };

  const setNeutralValue = () => {
    console.log('value now', neutral);
    setNeutral(neutral + 1);
  };

  const setBadValue = () => {
    console.log('value now', bad);
    setBad(bad + 1);
  };

  let average = ((good * 1) + (neutral * 0) + (bad * -1)) / sum;

  let positive = (good * 100 / sum) + ' %';
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={setGoodValue} text="good" />
      <Button onClick={setNeutralValue} text="neutral" />
      <Button onClick={setBadValue} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} sum={sum} />
    </div>
  );
};

export default App;
