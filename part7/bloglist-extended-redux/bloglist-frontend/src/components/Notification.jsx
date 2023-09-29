import { useSelector } from "react-redux"
const Notification = () => {
    const message = useSelector(state => state.notification)
    if(message){
        console.log(message)
    }
    if (message) {
        const style = {
            color: message.color === 'green' ? 'green' : 'red',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        }
        return <div className='container' style={style}>{message.message}</div>
    }
}
export default Notification
