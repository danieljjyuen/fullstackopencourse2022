export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type Entry = 
  | HospitalEntryType
  | OccupationalHealthcareEntryType
  | HealthCheckEntryType

export interface BaseEntry {
  id:string
  description:string
  date:string
  specialist:string
  diagnosisCodes?:Array<Diagnosis['code']>
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

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface HospitalEntryType extends BaseEntry {
  type:'Hospital'
  discharge: Discharge
}

export interface OccupationalHealthcareEntryType extends BaseEntry {
  type:'OccupationalHealthcare'
  employerName:string
  sickLeave?:SickLeave
}

export interface HealthCheckEntryType extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;