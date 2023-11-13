import { Diagnosis, HospitalEntryType } from "../../types"
import Box from '@mui/material/Box';

const HospitalEntry = ({entry, diagnoses}:{entry:HospitalEntryType, diagnoses:Diagnosis[]}) => {

    return(
        <Box border={2} borderColor="primary.main" borderRadius={3} p={1.5} my={1.5}>
        {entry.date} 
        <br />
        <i>{entry.description}</i>
        <br/>
        {'discharge' in entry && entry.discharge && (
            <>
              discharge date: {entry.discharge.date}
            </>
        )}
        <br/>
        <br/>
        diagnose by {entry.specialist}
        <br/>
        <br/>
        {!entry.diagnosisCodes ? null :
            entry.diagnosisCodes.map((code) => (
            <li key={code}>{code} {diagnoses.find(diagnose => diagnose.code===code)?.name}</li>
            ))
        }
        </Box>
    )
}

export default HospitalEntry