import { Gender, OmitIdPatient, Entry, OmitIdEntry, Diagnose, OmitIdBaseEntry, HealthCheckRating, SickLeave, Discharge } from "./types";

const isString = (text:unknown):text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const toNewPatientEntry = (object: unknown): OmitIdPatient => {
    if( !object || typeof object !== 'object'){
        throw new Error('incorrect or missing data');
    }

    if('name' in object 
        && 'dateOfBirth' in object 
        && 'ssn' in object 
        && 'gender' in object
        && 'occupation' in object
        && 'entries' in object){

        const newEntry : OmitIdPatient = {
            name: parseName(object.name),
            dateOfBirth:parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries:parseEntries(object.entries)
        };
        return newEntry;
    }
    throw new Error('incorrect data: missing fields');
};

export const toNewEntry = (object: unknown): OmitIdEntry => {
    if(typeof object !== 'object' || !object){
        throw new Error('incorrect or missing data')
    }
    if('description' in object && 'date' in object && 'specialist' in object){
        const newBaseEntry : OmitIdBaseEntry = {
            description:parseDescription(object.description),
            date:parseDate(object.date),
            specialist:parseSpecialist(object.specialist)
        }
        if('diagnosisCodes' in object){
            newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
        }

        if('type' in object){
            switch(object.type){
                case 'HealthCheck':
                if('healthCheckRating' in object){
                    const healthcheckentry : OmitIdEntry = {
                        ...newBaseEntry,
                        type:object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    }
                    return healthcheckentry
                }
                break
            
                case 'OccupationalHealthcare':
                    if('employerName' in object){
                        const occupationalhealthcareentry : OmitIdEntry = {
                            ...newBaseEntry,
                            type: object.type,
                            employerName:parseEmployerName(object.employerName)
                        }
                        if('sickLeave' in object){
                            occupationalhealthcareentry.sickLeave = parseSickLeave(object.sickLeave)
                        }
                        return occupationalhealthcareentry
                    }
                    break
                    
                    case 'Hospital':
                        if('discharge' in object){
                            const hospitalentry: OmitIdEntry = {
                                ...newBaseEntry,
                                type: object.type,
                                discharge: parseDischarge(object.discharge)
                            }
                            return hospitalentry
                        }
                        break
                   
            }
        }
    }
    throw new Error('missing fields')
}

const parseDischarge = (object:unknown): Discharge => {
    if(!object || typeof object !== 'object'){
        throw new Error('incorrect field')
    }
    if('date' in object && 'criteria' in object){
        const discharge = {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria)
        }
        return discharge
    }
    throw new Error('incorrect format')

}

const parseSickLeave = (object: unknown):SickLeave => {
    if(!object || typeof object !== 'object'){
        throw new Error('incorrect field')
    }
    if('startDate' in object && 'endDate' in object ){
        const sickLeave: SickLeave = {
            startDate : parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        }
        return sickLeave
    }
    throw new Error('incorrect format')
}

const parseCriteria = (text : unknown) : string => {
    if(!text || !isString(text)){
        throw new Error('incorrect field')
    }
    return text
}
const parseEmployerName = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)){
        throw new Error('incorrect or missing employer name');
    }
    return employerName;
}

const isHealthCheckRating = (value: number) : value is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(value)
}

const parseHealthCheckRating = (healthCheckRating:unknown): HealthCheckRating => {
    if(typeof healthCheckRating !== 'number' || !isHealthCheckRating(healthCheckRating)){
        throw new Error('incorrect or missing value')
    }
    return healthCheckRating as HealthCheckRating
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
    if(!object || typeof object!== 'object' || !('diagnosisCodes' in object)){
        return [] as Array<Diagnose['code']>
    }
    return object.diagnosisCodes as Array<Diagnose['code']>
}

const parseEntries = (entries: unknown):Entry[] => {
    if(!Array.isArray(entries)){
        throw new Error('not correct format')
    }
    entries.forEach(entry => {
        if(!isEntry(entry)){
            throw new Error('incorrect or missing entry')
        }
    })
    return entries as Entry[]

}

const isEntry = (entry:unknown): entry is Entry => {
    return (typeof entry === 'object' && entry!==null       
        && ('type' in entry) && (entry.type==='HealthCheck'
            || entry.type==='OccupationalHealthcare'
            || entry.type==='Hospital'))
}
const parseName = (name: unknown): string => {
    if(!name || !isString(name)){
        throw new Error('incorrect or missing name');
    }
    return name;
};

const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)){
        throw new Error('incorrect or missing field')
    }
    return specialist
}

const parseDescription = (description : unknown) : string=> {
    if(!description || !isString(description)){
        throw new Error('incorrect or missing description')
    }
    return description
}

const isDate = (date: string):boolean => {
    return Boolean(Date.parse(date));
};
const parseDate = (date:unknown): string => {
    if(!date || !isString(date)||!isDate(date)){
        throw new Error('incorrect or missing date')
    }
    return date
}
const parseDateOfBirth = (dateOfBirth:unknown):string => {
    if(!dateOfBirth || !isString(dateOfBirth)|| !isDate(dateOfBirth)){
        throw new Error('incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation:unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('incorrect or missing occupation');
    }
    return occupation;
};

const isGender = (param:string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('incorrect or missing info: ' + gender);
    }
    return gender;
};

