import patientService from '../../services/patients'
import { useMatch } from 'react-router-dom'
import {useState, useEffect } from 'react'
import { Patient, Diagnose } from '../../types'
import Entries from './Entries'
import EntryForm from './EntryForm'
import diagnosisService from '../../services/diagnosis'

const ShowPatient = () => {
    const match = useMatch('/patients/:id')
    const id = match?.params.id
    const [patient,setPatient] = useState<Patient|null>(null)

    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([])

    useEffect(()=>{
        diagnosisService.getAll().then(data => setDiagnoses(data))
        const findPatient = async () => {
            if(id!== undefined && id){
                try{
                const foundPatient = await patientService.getById(id) as Patient
                setPatient(foundPatient)
                }catch(error: unknown){
                    if(error instanceof Error){
                        console.log(error.message)
                    }
                }
            }
        }
        findPatient()
    },[id])
        while(!patient){
            return(
                <div>loading...</div>
            )
        }
        if(patient){
            return(
                <div>
                    <h3>{patient.name}</h3>
                    ssh: {patient.ssn}
                    <br />
                    occupation: {patient.occupation}
                    <EntryForm patient={patient} setPatient={setPatient} diagnoses={diagnoses}/>
                    <Entries patient={patient} diagnoses={diagnoses}/>
                    
                </div>
            )
        }
}
export default ShowPatient
