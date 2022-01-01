import React, { useState } from 'react'

const Button = ({text,handleClick}) => {
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Tracker = ({text, clicks}) => {
  if(isNaN(clicks)) {
    return(
      <tr>
        <td>{text}</td>
        <td>no data</td> 
      </tr>
    )
  }
  else if(text == 'positive') {
    return(
      <tr>
        <td>{text} </td>
        <td>{clicks} %</td>
      </tr>
    )
  }
  else {
    return(
      <tr>
        <td>{text} </td>
        <td>{clicks}</td>
      </tr>
    )
  }
}

const Statistics = ({allClicks}) => {
  const countClicks = (text) => {
    let counter = 0
    allClicks.forEach(click => {
      if (click == text)
      {
        counter++
      }
    });
    return counter
  }
  const good = countClicks('G')
  const bad = countClicks('B')
  const neutral = countClicks('N')

  if(good+bad+neutral) {
    return (
      <>
        <h1>statistics</h1>
        <Tracker text = 'good' clicks = {good}/>
        <Tracker text = 'neutral' clicks = {neutral}/>
        <Tracker text = 'bad' clicks = {bad}/>
        <Tracker text = 'all' clicks = {bad+good+neutral}/>
        <Tracker text = 'average' clicks = {(good-bad)/(good+bad+neutral)}/>
        <Tracker text = 'positive' clicks = {good/(bad+good+neutral)*100} />
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setClicks] = useState([])

  const handleGoodClick = () => {
    setClicks(allClicks.concat('G'))
    setGood(good+1)
  }
  const handleBadClick = () => {
    setClicks(allClicks.concat('B'))
    setBad(bad+1)
  }
  const handleNeutralClick = () => {
    setClicks(allClicks.concat('N'))
    setNeutral(neutral+1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text = 'good' handleClick={handleGoodClick} />
      <Button text = 'neutral' handleClick={handleNeutralClick} />
      <Button text = 'bad' handleClick={handleBadClick} />
      {/* Need to put shit into an array */}
      <Statistics allClicks={allClicks}/>
    </div>
  )
}

export default App