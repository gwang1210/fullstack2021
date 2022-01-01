import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const handleClick = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }
  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    setBest(votesCopy.indexOf(Math.max(...votesCopy)))
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button text='Vote' click={handleVote}/>
      <Button text='Next anecdote' click={handleClick}/>
      <h1>Anecdote with the most votes</h1>
      <Anecdote text={anecdotes[best]} votes={votes[best]}/>
    </div>
  )
}
const VotedAnecdote = ({text,votes}) => {
  return (
    <>
      <p>{text}</p>
      <p>votes: {votes}</p>
    </>
  )
}
const Anecdote = ({text,votes}) => {
  return (
    <>
      <p>{text}</p>
      <p>votes: {votes}</p>
    </>
  )
}
const Button = ({text,click}) => {
  return (
    <>
      <button onClick={click}>{text}</button>
    </>
  )
}

export default App