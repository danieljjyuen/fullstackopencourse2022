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

console.log(calculateExercises([3,0,2,4.5,0,3,1],2))

console.log(process.argv[2])