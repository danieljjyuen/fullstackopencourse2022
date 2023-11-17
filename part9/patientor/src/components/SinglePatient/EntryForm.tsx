import { ListItemText, OutlinedInput, Checkbox, Button, Box, InputLabel, Select, MenuItem, FormControl, TextField, RadioGroup,FormControlLabel, Radio, FormGroup } from "@mui/material"
import {useState} from 'react'
import {HealthCheckRating, Patient, Diagnose} from '../../types'
import patientService from '../../services/patients'

const EntryForm = ({patient, setPatient, diagnoses}
        :{patient:Patient, 
            setPatient:React.Dispatch<React.SetStateAction<Patient | null>>,
            diagnoses:Diagnose[] }) => {
    const [formType, setFormType] = useState('HealthCheck')
    const [specialist, setSpecialist] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dischargeDate, setDischargeDate] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState([])
    const [healthRating, setHealthRating] = useState(Number(HealthCheckRating.Healthy))
    const [employerName, setEmployerName] = useState('')
    const [criteria, setCriteria] = useState('')
    
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(formType, specialist, description, date, startDate, endDate, dischargeDate, diagnosisCodes, healthRating, employerName,criteria)
        const baseEntry = {
            description,date,specialist,
            type:formType
        }
        if(diagnosisCodes.length>0){
            baseEntry.diagnosisCodes = diagnosisCodes
        }
        switch(formType){
            case 'HealthCheck':
                baseEntry.healthCheckRating = Number(healthRating)
                break
            case 'OccupationalHealthcare':
                baseEntry.employerName = employerName
                baseEntry.sickLeave = {
                    startDate,
                    endDate
                }
                break
            case 'Hospital':
                baseEntry.discharge = {
                    date: dischargeDate,
                    criteria
                }
                break
        }

        try{
            const response = await patientService.createNewEntry(patient.id, baseEntry)
            const updatedPatient = {
                ...patient,
                entries: patient.entries.concat(response),
              };
            setPatient(updatedPatient)
        
        }catch(error:unknown){
            if(error instanceof Error){
                console.log(error)
            }
        }
        setSpecialist('')
        setDescription('')
        setDate('')
        setStartDate('')
        setEndDate('')
        setDischargeDate('')
        setDiagnosisCodes([])
        setHealthRating(Number(HealthCheckRating.Healthy))
        setEmployerName('')
        setCriteria('')

    }
    return(
        <Box component='form' onSubmit={handleSubmit} p={1} my={1} style={{border: '2px dashed #000'}}>
            <h4>New {formType} Entry</h4>
            <FormControl margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
                required
                value={formType}
                style={{ marginTop: '10px' }}
                onChange={(event)=>setFormType(event.target.value)}
            >
                <MenuItem key='healthcheck' value="HealthCheck">HealthCheck</MenuItem>
                <MenuItem key='hospital' value="Hospital">Hospital</MenuItem>
                <MenuItem key='occupationalhealthcare' value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
            </Select>
            <TextField
            required
            key='description'
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            margin="normal"
            />
            <TextField
            required
            key='specialist'
            label="Specialist"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            margin="normal"
            />
            <TextField
            required
            key='date'
            InputLabelProps={{ shrink: true}}
            label="Date"
            type='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            />

        <Select 
            multiple
          value={diagnosisCodes}
          onChange={(event)=>setDiagnosisCodes(event.target.value)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnoses.map((diagnose) => (
            <MenuItem key={diagnose.code} value={diagnose.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
              <ListItemText primary={diagnose.name} />
            </MenuItem>
          ))}
        </Select>

            {formType ==='HealthCheck' ?(
                
                    <RadioGroup row value={healthRating} onChange={(event)=>setHealthRating(event.target.value)} >
                    {Object.keys(HealthCheckRating).filter(value => isNaN(value)).map((key) => (
                      <FormControlLabel
                        key={key}
                        value={HealthCheckRating[key]}
                        control={<Radio />}
                        label={key}
                      />
                    ))}
                  </RadioGroup>
                
            ):null}

            {formType==='OccupationalHealthcare'?(
                <div>
                    <TextField
                    required
                    key='employername'
                    label='Employer Name'
                    value={employerName}
                    onChange={(event) => setEmployerName(event.target.value)}
                    />
                    <br/>
                    <FormControl>
                    <InputLabel>Sick Leave</InputLabel>
                    <FormGroup style={{ marginTop: '40px' }}>
                        <TextField
                        InputLabelProps={{ shrink: true}}
                        label="Start Date"
                        type='date'
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        />
                        <TextField
                        InputLabelProps={{ shrink: true}}
                        label="End Date"
                        type='date'
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        />
                    </FormGroup>
                    </FormControl>
                    </div>
            ):null}

            {formType==='Hospital'? (
                <FormControl>
                <InputLabel>Discharge</InputLabel>
                <FormGroup style={{ marginTop: '40px' }}>
                    <TextField
                        key='date'
                        label="Date"
                        type='date'
                        value={dischargeDate}
                        InputLabelProps={{ shrink: true}}
                        onChange={(event) => setDischargeDate(event.target.value)}
                    />
                    <TextField
                        key='criteria'
                        value={criteria}
                        onChange={(event)=>setCriteria(event.target.value)}
                        label='Criteria'
                    />
                </FormGroup>
                </FormControl>
            ):null}
            </FormControl>
            <Button type='submit'>submit</Button>
        </Box>
    )
}

export default EntryForm