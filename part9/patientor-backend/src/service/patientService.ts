import { Entry, NonSensitivePatientData, OmitIdEntry, OmitIdPatient, Patient } from "../types";
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

const getByIdPatientData = (id:string) : Patient|undefined => {
    return patientsData.find( patient => patient.id === id)
}

const addPatient = ( entry: OmitIdPatient) : Patient => {
    const newPatient = {
        id:uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (id:string, entry:OmitIdEntry): Entry => {

    const findPatient = patients.find(patient => patient.id === id)

    const newEntry = {
        id:uuid(),
        ...entry
    }

    findPatient?.entries.push(newEntry)
    return newEntry
}

export default {
    getNonSensitivePatientData,
    addPatient,
    getByIdPatientData,
    addEntry
};