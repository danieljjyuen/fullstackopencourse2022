import { Gender, OmitIdPatient, Entry } from "./types";

const isString = (text:unknown):text is string => {
    return typeof text === 'string' || text instanceof String;
};

const toNewPatientEntry = (object: unknown): OmitIdPatient => {
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

const parseEntries = (entries: unknown):Entry[] => {
    if(!Array.isArray(entries)){
        throw new Error('not correct format')
    }
    entries.forEach(entry => {
        if(isEntry(entry)){
            throw new Error('incorrect or missing entry')
        }
    })
    return entries as Entry[]

}

const isEntry = (entry:unknown): entry is Entry => {
    return typeof entry ==='object' && entry!==null
}
const parseName = (name: unknown): string => {
    if(!name || !isString(name)){
        throw new Error('incorrect or missing name');
    }
    return name;
};

const isDate = (date: string):boolean => {
    return Boolean(Date.parse(date));
};
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

export default toNewPatientEntry;