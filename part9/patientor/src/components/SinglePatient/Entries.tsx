import {Patient, Diagnosis} from '../../../src/types'
import {useState, useEffect } from 'react'
import diagnosisService from '../../services/diagnosis'
import HealthCheckEntry from './HealthCheckEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'


const Entries = ({patient}: {patient:Patient}) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
    useEffect(() => {
        diagnosisService.getAll().then(data => setDiagnoses(data))
    },[])
    console.log(diagnoses)
    if(!patient.entries || patient.entries.length===0){
        return null
    }

    const assertNever = (value: never): never => {
        throw new Error(`Unexpected value: ${value}`)
    }
    return(
        <div>
            <h4>entries</h4>
            {patient.entries.map((entry) => {
                switch(entry.type){
                    case 'HealthCheck':
                        return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>
                    case 'OccupationalHealthcare':
                        return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
                    case 'Hospital':
                        return <HospitalEntry entry={entry} diagnoses={diagnoses}/>
                    default:
                        return assertNever(entry)
                    
                }
            }
            )
            }
        </div>
    )
}
export default Entries