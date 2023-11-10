import express from 'express';
import patientService from '../service/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res)=> {
    res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const addPatient = patientService.addPatient(newPatientEntry);
        res.json(addPatient);
    }catch(error: unknown) {
        let errorMessage = 'something went wrong';
        if(error instanceof Error){
            errorMessage += ' error: '+error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (_req, res) => {
    res.send(patientService.getByIdPatientData(_req.params.id))
})
export default router;