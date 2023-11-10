import { useState, useEffect } from "react"
import { FlightDiary } from './types'
import DiaryEntries from './components/DiaryEntries'
import CreateNewEntry from './components/CreateNewEntry'
import Notify from './components/Notify'
import axios from 'axios'

const App = () => {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    try{
    axios.get<FlightDiary[]>('http://localhost:3000/api/diaries')
      .then(response => setFlightDiaries(response.data))
    }catch(error:unknown){
      if(error instanceof Error){
        setMessage(error.message)
        setTimeout(()=>{
          setMessage('')
        },5000)
      }
    }
  }, [])


  return (
    <div>
      <Notify message={message} />
      <CreateNewEntry setMessage={setMessage} flightDiaries={flightDiaries} setFlightDiaries={setFlightDiaries}/>
      <DiaryEntries entries={flightDiaries}/>
    </div>
  )
}

export default App
