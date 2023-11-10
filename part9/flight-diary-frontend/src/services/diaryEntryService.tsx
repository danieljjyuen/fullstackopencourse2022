import axios from 'axios'
import { FlightDiaryNoComment,NewFlightDiary } from '../types'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = () => {
    return axios.get<FlightDiaryNoComment[]>(baseUrl).then(response=>response.data)
}

export const createFlightEntry = (object:NewFlightDiary ) => {
    return axios
        .post(baseUrl, object)
        .then(response=> response.data)
}