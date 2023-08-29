import { useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    
    const setVisibility = () => {
        setVisible(!visible)
    }

    const showNotVisible = { display: visible ? 'none' : ''}
    const showVisible = { display: visible ? '' : 'none'}
    return (
        <div>
            <div style={showNotVisible}>
                <button onClick={setVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showVisible}>
                {props.children}
                <button onClick={setVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable