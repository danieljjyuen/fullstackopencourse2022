import { useState } from "react"

const Button = (props) => (
  <button onClick={props.handle}> {props.text} </button>
)

const StatisticLine = (props) => {
  const text = props.text
  const value = props.value
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral

  const average = () => ( 
    (good - bad)/ total()
  )
  
  const postivePercent = () => (
    (good/total())*100 + ' %'
  )

  const total = () => ( good + bad + neutral )
  
  if((good + bad + neutral) == 0 )
    return ('No feedback given')

  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total()} />
      <StatisticLine text='average' value={average()} />
      <StatisticLine text='positive' value={postivePercent()} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
   const goodClickHandle = () => {
    const newValue  = good + 1
    setGood(newValue)
  }

  const neutralClickHandle = () => {
    const newValue  = neutral + 1
    setNeutral(newValue)
  }
  
  const badClickHandle = () => {
    const newValue  = bad + 1
    setBad(newValue)
  }

  return (
    
    <div>
      <h1>give feedback</h1>
      <Button handle={goodClickHandle} text='good'/>
      <Button handle={neutralClickHandle} text='neutral'/>
      <Button handle={badClickHandle} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;
