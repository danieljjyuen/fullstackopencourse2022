export interface Diagnose {
    code:string,
    name:string,
    latin?:string
}
export type Entry = 
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry

export interface BaseEntry {
    id:string
    description:string
    date:string
    specialist:string
    diagnosisCodes?:Array<Diagnose['code']>
}

export enum HealthCheckRating {
    'Healthy'= 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export interface Discharge {
    date: string
    criteria: string
}
export interface HospitalEntry extends BaseEntry {
    type:'Hospital'
    discharge: Discharge
}

export interface SickLeave {
    startDate: string
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type:'OccupationalHealthcare'
    employerName:string
    sickLeave?:SickLeave
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck'
    healthCheckRating: HealthCheckRating
}

export interface Patient {
    id:string,
    name: string,
    dateOfBirth:string,
    ssn:string,
    gender: Gender,
    occupation: string,
    entries:Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

//define special omit for union
type UnionOmit<T, K extends string|number|symbol>=T extends unknown 
    ? Omit<T, K> : never

export type OmitIdEntry = UnionOmit<Entry, 'id'>

export type OmitIdBaseEntry = Omit<BaseEntry, 'id'>
export type NonSensitivePatientData = Omit<Patient, 'ssn'|'entries'>;

export type OmitIdPatient = Omit<Patient, 'id'>;