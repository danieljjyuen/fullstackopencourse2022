import { FlightDiary } from '../types'
import DiaryEntry from './DiaryEntry'

const DiaryEntries = (props: {entries: FlightDiary[]}) => {
    return(
        <div>
            <h2>Diary entries</h2>
            {props.entries.map(entry => 
                <DiaryEntry entry={entry}/>)}
        </div>
    )
}

export default DiaryEntries