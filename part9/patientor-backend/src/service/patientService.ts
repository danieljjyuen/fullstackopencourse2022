import { NonSensitivePatientData, OmitIdPatient, Patient } from "../types";
import patientsData from '../../data/patients';
import { v1 as uuid} from 'uuid';

const patients : Patient[] = patientsData;

const getNonSensitivePatientData = () : NonSensitivePatientData[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}; 

const addPatient = ( entry: OmitIdPatient) : Patient => {
    const newPatient = {
        id:uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitivePatientData,
    addPatient
};