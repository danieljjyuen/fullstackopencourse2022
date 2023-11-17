import axios from "axios";
import { Entry, OmitIdEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getById = async (id:string) => {
  const {data} = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  )
  return data
}

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createNewEntry = async (id:string, entry:OmitIdEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`, 
    entry
  )
  return data
}

export default {
  getAll, create, getById, createNewEntry
};

