import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = ():Diagnose[] => {
    return diagnoseData;
};

const addDiagnose = () =>{
    return null;
};

export default {
    getDiagnoses,
    addDiagnose
};