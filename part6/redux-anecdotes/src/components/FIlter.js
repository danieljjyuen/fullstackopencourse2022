import { useDispatch } from "react-redux"
import { change } from "../reducers/filterReducer"
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(change(event.target.value))
    }

    return(
        <div>
            filter <input onChange={handleChange}name='filter'/>
        </div>
    )
}

export default Filter