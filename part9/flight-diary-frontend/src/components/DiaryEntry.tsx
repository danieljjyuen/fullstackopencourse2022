import { FlightDiary } from "../types"

const DiaryEntry = (props : {entry: FlightDiary}) => {
    return(
        <div>
            <h3>{props.entry.date}</h3>
            visibility: {props.entry.visibility}
            <br />
            weather: {props.entry.weather}
        </div>
    )
}

export default DiaryEntry