import {Patient, Diagnose} from '../../../src/types'
import HealthCheckEntry from './HealthCheckEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'


const Entries = ({patient, diagnoses}: {patient:Patient, diagnoses:Diagnose[]}) => {


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