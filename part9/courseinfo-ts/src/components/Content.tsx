import { CoursePart } from "../types"
import Part from './Part'
const Content = (props: {courseParts: CoursePart[]}) : JSX.Element => {
    return (
        <div>
            {props.courseParts.map(course => {
                return <Part part={course} />
            })}
        </div>
    )
}

export default Content