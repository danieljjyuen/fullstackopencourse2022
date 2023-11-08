import { useState, useEffect } from "react"
import { FlightDiary } from './types'
import DiaryEntries from './components/DiaryEntries'
import axios from 'axios'

const App = () => {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])

  useEffect(() => {
    axios.get<FlightDiary[]>('http://localhost:3000/api/diaries')
      .then(response => setFlightDiaries(response.data))
  }, [])
  return (
    <div>
      <DiaryEntries entries={flightDiaries}/>
    </div>
  )
}

export default App
