import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props) //test
  return (
    <>
      <Part part = {props.course.parts[0].name} exercise = {props.course.parts[0].exercise}/>
      <Part part = {props.course.parts[1].name} exercise = {props.course.parts[1].exercise}/>
      <Part part = {props.course.parts[2].name} exercise = {props.course.parts[2].exercise}/> 
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}

const Total = (props) => {
  console.log(props) //test
  return (
    <>
     <p>Number of exercises {props.course.parts[0].exercise+props.course.parts[1].exercise+props.course.parts[2].exercise}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }

  return (
    <>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App