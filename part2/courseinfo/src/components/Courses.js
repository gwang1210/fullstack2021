import React from 'react';

const Course = ({course}) => {
  
    return (
      <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </>
    )
  }
  const Courses = ({courses}) => {
    return (
      <>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
      </>
    )
  }
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    return(
      <p><b>Number of exercises {course.parts.reduce((a,b) => a+b.exercises,0)}</b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }
  export default Courses