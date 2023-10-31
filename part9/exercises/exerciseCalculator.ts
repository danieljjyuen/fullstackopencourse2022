interface result  {
    periodLength:number,
    trainingDays: number,
    target: number,
    average: number
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string
}

const calculateTrainingDays = (hours: number[]): number => {
    let count: number = 0
    for(let i = 0; i< hours.length; i++){
        if(hours[i] === 0 ){
            count++
        }
    }
    return hours.length - count
}

const calculateAverage = (hours:number[]):number => {
    return hours.reduce((p,c)=> p+c,0)/hours.length
}

const calculateExercises = (hours: number[], target: number): result => {
    const average = calculateAverage(hours)
    const trainingDays = calculateTrainingDays(hours)
    const roundAverage = Math.round(average)
    let rating: 1|2|3

    switch(true) {
        case roundAverage === target :
            rating = 2
            break
        
        case roundAverage > target :
            rating = 3
            break
        case roundAverage < target :
            rating = 1
            break
        
        default: rating = 1
            break
    }

    let ratingDescription:string

    switch(true){
        case rating === 1 :
            ratingDescription = 'need to work harder'
            break
        case rating === 3 :
            ratingDescription = 'great work, keep it up'
            break
        case rating === 2 :
            ratingDescription = 'not too bad but could be better'
            break
        default:
            ratingDescription=''
    }

    return {
        periodLength: hours.length,
        trainingDays,
        target,
        average,
        success: average >= target ? true : false,
        rating,
        ratingDescription
    }
}

interface exerciseValues {
    target: number
    schedule: number[]
}



const parseArguments = (args: string[]):exerciseValues => {
    if(process.argv.length <4) throw new Error('too few arguments')
    const length = process.argv.length
    let target: number
    let hours : number[] = []

    if(!isNaN(Number(process.argv[2]))){
        target = Number(process.argv[2])
    }else{
        throw new Error('value is not a number')
    }

    for(let i = 3; i<length; i++){
        if(!isNaN(Number(process.argv[i]))){
            hours.push(Number(process.argv[i]))
        }else{
            throw new Error('value is not a number')
        }
    }
    return {
        target, 
        schedule :hours
    }

}

try{
    const {target, schedule } = parseArguments(process.argv)
    console.log(calculateExercises(schedule,target))
}catch(error : unknown){
    let errormessage = 'something bad happened'
    if(error instanceof Error){
        errormessage+= ' Error: ' +error.message
    }
    console.log(errormessage)
}