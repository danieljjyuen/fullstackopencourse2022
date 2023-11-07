import {CoursePart} from '../types'

const Part = (props: {part: CoursePart}):JSX.Element => {
    switch(props.part.kind) {
        case 'basic':
            return (
                <div>
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>
                    {props.part.description}
                </div>
            )
            case 'group':
                return (
                    <div>
                        <h3>{props.part.name} {props.part.exerciseCount}</h3>
                        group project count {props.part.groupProjectCount}
                    </div>
                )
                case 'background':
                    return(
                        <div>
                            <h3>{props.part.name} {props.part.exerciseCount}</h3>
                            {props.part.description}
                            <br/>
                            {props.part.backgroundMaterial}
                        </div>
                    )
                case 'special':
                    return(
                        <div>
                            <h3>{props.part.name} {props.part.exerciseCount}</h3>
                            {props.part.description}
                            <br />
                            required skills: {props.part.requirements.join(', ')}
                        </div>
                    )
    }
}

export default Part