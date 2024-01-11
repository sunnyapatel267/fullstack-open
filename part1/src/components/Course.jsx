const Header = ({ name }) => <h2>{name}</h2> 

const Display = ( {parts} ) =>{
    return (
        <div>
            <p>{parts.name} {parts.exercises}</p>
        </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts.reduce((total, amount) => total + amount.exercises, 0)
    return (
        <div>
            <strong>total of {sum} excercises</strong>
        </div>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <div>
                    <Header key={course.id} name={course.name}/>
                    {course.parts.map(part => (
                        <Display key={part.id} parts={part}/>
                    ))}
                    <Total parts={course.parts}/>
                </div>
            ))}
        </div>
    )
}

export default Course