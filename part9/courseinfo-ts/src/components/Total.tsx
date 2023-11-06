interface TotalExercises {
    totalExercises:number;
}

const Total = (props: TotalExercises):JSX.Element => {

    return (
        <p>
            Number of exercises {props.totalExercises}
        </p>
    )
}

export default Total