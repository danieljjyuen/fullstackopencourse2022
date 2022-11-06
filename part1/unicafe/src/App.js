import { useState } from "react"

const Button = (props) => (
  <button onClick={props.handle}> {props.text} </button>
)



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

  const average = () => ( 
    (good - bad)/ (good + bad + neutral)
  )
  
  const postivePercent = () => (
    (good/(good + bad + neutral))*100 + ' %'
  )
  return (
    
    <div>
      <h1>give feedback</h1>
      <Button handle={goodClickHandle} text='good'/>
      <Button handle={neutralClickHandle} text='neutral'/>
      <Button handle={badClickHandle} text='bad'/>
      <h1>statistics</h1>
      <div>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {good + neutral + bad}
        <br />
        average {average()}
        <br />
        positive {postivePercent()}
      </div>
    </div>
  )
}

export default App;
