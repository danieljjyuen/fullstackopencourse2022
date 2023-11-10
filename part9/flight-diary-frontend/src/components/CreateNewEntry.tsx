import {useState} from 'react'
import { Visibility, Weather, FlightDiary } from '../types'
import { createFlightEntry } from '../services/diaryEntryService'
const CreateNewEntry = ({flightDiaries,setFlightDiaries,setMessage}:{
    flightDiaries:FlightDiary[], 
    setFlightDiaries:React.Dispatch<React.SetStateAction<FlightDiary[]>>,
    setMessage:React.Dispatch<React.SetStateAction<string>>
}) => {
    const [date, setDate] = useState<Date>(new Date)
    const [visibility, setVisibility] = useState(Object.values(Visibility)[0])
    const [weather, setWeather] = useState(Object.values(Weather)[0])
    const [comment,setComment] = useState('')

    const handleCreateEntry = (event: React.SyntheticEvent) => {
        event.preventDefault()
        try{
            createFlightEntry({date, visibility,weather,comment}).then(data => {
                setFlightDiaries(flightDiaries.concat(data))
            })
        }catch(error: unknown){
            if(error instanceof Error){
                setMessage(error.message)
                setTimeout(()=>{
                    setMessage('')
                },5000)
            }
        }

        setDate(new Date())
        setVisibility(Object.values(Visibility)[0])
        setWeather(Object.values(Weather)[0])
        setComment('')
    }

    return (
        <div>
            <h3>Add new entry</h3>
            <form onSubmit={handleCreateEntry}>
                date<input type='date' value={date} onChange={(event)=>setDate(event.target.value)}/>
                <br/>
                
                weather: {Object.values(Weather).map((weatherValue,index) => (
                        <label> {weatherValue}
                        <input 
                            type='radio' 
                            value={weatherValue} 
                            name='weatherRadio' 
                            checked={index===0||weather===weatherValue}
                            onChange={(event) => setWeather(event.target.value)}/>
                        </label>
                ))}
                
                <br/>

                visibility: {Object.values(Visibility).map((visibilityValue, index) => (
                        <label> {visibilityValue}
                        <input type='radio' 
                        value={visibilityValue} 
                        name='visibilityRadio' 
                        checked={index===0 || visibility===visibilityValue}
                        onChange={(event)=>setVisibility(event.target.value)}/>
                        </label>
                ))}

                <br/>
                comment<input value={comment} onChange={(event)=>setComment(event.target.value)}/>
                <br/>
                <button>add</button>
            </form>
        </div>
    )
}

export default CreateNewEntry