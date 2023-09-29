import NotificationContext from "../NotificationContext"
import { useContext } from "react"
const Notification =() => {
const [message, messageDispatch] = useContext(NotificationContext)
    if(message){
        const style = {
        
            color: message.color === 'green' ? 'green' : 'red',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px'
          
    }
            return(
                <div style={style}>
                    {message.message}
                </div>
            )
    }
}
export default Notification