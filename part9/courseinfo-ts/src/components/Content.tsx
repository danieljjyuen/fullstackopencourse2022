const Content = (props: {courseParts: {name:string, exerciseCount:number}[]}) : JSX.Element => {
    return (
        <div>
            {props.courseParts.map(course => {
                return <p>{course.name} {course.exerciseCount}</p>
            })}
        </div>
    )
}

export default Content