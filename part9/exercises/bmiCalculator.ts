
//height in cm, weight in kg
export const calculateBmi = (height:number, weight: number): string => {
    const bmi: number = weight/((height/100)**2)
    switch(true){
        case (bmi<16):
            return 'Underweight (Severe thinness)'
        case (bmi<=16.9):
            return 'Underweight (Moderate thinness)'
        case (bmi<=18.4):
            return 'Underweight (Mild thinness)'
        case (bmi<=24.9):
            return 'Normal Range'
        case (bmi<= 29.9):
            return 'Overweight (Pre-obese)'
        case (bmi<=34.9):
            return 'Obese (Class I)'
        case (bmi<= 39.9):
            return 'Obese (Class II)'
        case (bmi>=40):
            return 'Obese (Class III)'
        default:
            return ''
        
    }
}


interface bmiValues {
    height:number,
    weight:number
}

const parseArgumentBmi = (args: string[]):bmiValues => {
    if(args.length <4) throw new Error('not enought arguments')
    if(args.length > 4) throw new Error('too many arguments')

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('provided values were not numbers')
    }
    
}

try {
    const { height, weight } = parseArgumentBmi(process.argv)
    console.log(calculateBmi(height, weight))
} catch(error: unknown) {
    let errorMessage = 'Something bad happened'
    if(error instanceof Error) {
        errorMessage+= ' Error: ' + error.message
    }
    console.log(errorMessage)
}