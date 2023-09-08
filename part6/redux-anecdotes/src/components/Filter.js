import { useDispatch } from "react-redux"
import filter from "../reducers/filterReducer"
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch({type:'filter/filterUpdate', payload:event.target.value})
    }

    return(
        <div>
            filter <input onChange={handleChange}name='filter'/>
        </div>
    )
}

export default Filter