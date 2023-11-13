import {Patient, Diagnosis} from '../../../src/types'
import {useState, useEffect } from 'react'
import diagnosisService from '../../services/diagnosis'

const Entries = ({patient}: {patient:Patient}) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
    useEffect(() => {
        diagnosisService.getAll().then(data => setDiagnoses(data))
    },[])
    console.log(diagnoses)
    if(!patient.entries || patient.entries.length===0){
        return null
    }
    return(
        <div>
            <h4>entries</h4>
            {patient.entries.map((entry) => (
                <div>
                {entry.date} <i>{entry.description}</i>
                <br/>
                <br/>
                {!entry.diagnosisCodes ? null :
                    entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code} {diagnoses.find(diagnose => diagnose.code===code)?.name}</li>
                    ))
                }
                </div>
            ))
            }
        </div>
    )
}
export default Entries