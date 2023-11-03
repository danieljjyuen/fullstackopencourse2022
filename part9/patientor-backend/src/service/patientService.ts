import { NonSensitivePatientData } from "../types";
import patientsData from '../../data/patients'

const getNonSensitivePatientData = () : NonSensitivePatientData[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
} 

export default {
    getNonSensitivePatientData
}