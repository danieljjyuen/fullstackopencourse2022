import patientService from '../services/patients'
import { useMatch } from 'react-router-dom'
import {useState, useEffect } from 'react'
import { Patient } from '../types'

const ShowPatient = () => {
    const match = useMatch('/patients/:id')
    const id = match?.params.id
    const [patient,setPatient] = useState<Patient|null>(null)

    useEffect(()=>{
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
                </div>
            )
        }
}
export default ShowPatient
