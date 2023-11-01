import express from 'express'
const app = express()
import {calculateBmi} from './bmiCalculator'

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    console.log(req.query)
    const {height, weight} = req.query
    if(!isNaN(Number(height)) || !isNaN(Number(weight))){
        res.send({error:'malformatted parameters'}).status(400)
    }
    res.send({
        weight: weight,
        height: height, 
        bmi: calculateBmi(Number(height), Number(weight))
    }).status(200)
})
const PORT = 3003

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})