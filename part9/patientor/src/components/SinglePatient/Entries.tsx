import {Patient} from '../../../src/types'

const Entries = ({patient}: {patient:Patient}) => {
    if(!patient.entries || patient.entries.length===0){
        return null
    }
    return(
        <div>
            <h4>entries</h4>
            {patient.entries.map((entry) => (
                <div>
                {entry.date} <i>{entry.description}</i>
                <br/>
                <br/>
                {!entry.diagnosisCodes ? null :
                    entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                    ))
                }
                </div>
            ))
            }
        </div>
    )
}
export default Entries