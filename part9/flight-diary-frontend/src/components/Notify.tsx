const Notify = ({message} : {message:string}) => {
    const style = {
        color: 'red'
    }
    if(message === '' || message === null){
        return null
    }
    return(
        <div style={style}>
            {message}
        </div>
    )
    
}

export default Notify