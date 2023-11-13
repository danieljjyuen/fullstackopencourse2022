import { Diagnosis, Entry, OccupationalHealthcareEntryType } from "../../types"
import Box from '@mui/material/Box'

const OccupationalHealthcareEntry = ({entry, diagnoses}:{entry:OccupationalHealthcareEntryType, diagnoses: Diagnosis[]}) => {
    return(
        <Box border={2} borderColor="primary.main" borderRadius={3} p={1.5} my={1.5}>
        {entry.date} {entry.employerName}
        <br/>
        <i>{entry.description}</i>
        <br/>
        diagnose by {entry.specialist}
        <br/>
        {!entry.diagnosisCodes ? null :
            entry.diagnosisCodes.map((code) => (
            <li key={code}>{code} {diagnoses.find(diagnose => diagnose.code===code)?.name}</li>
            ))
        }
        </Box>
    )
}

export default OccupationalHealthcareEntry