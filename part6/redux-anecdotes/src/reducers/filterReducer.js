export const change = (input) => {
    console.log(input)
    return {
        type:'CHANGE',
        payload: input.toLowerCase()
    }

}

const reducer = (state = '', action) => {
    if(action.type==='CHANGE'){
        return action.payload
    }else{
        return state
    }
    
}

export default reducer