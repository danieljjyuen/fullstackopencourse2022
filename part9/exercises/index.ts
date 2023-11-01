import express from 'express';
const app = express();
app.use(express.json())
import {calculateBmi} from './bmiCalculator';
import {calculateExercises, exerciseValues} from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);
    const {height, weight} = req.query;
    if(!isNaN(Number(height)) || !isNaN(Number(weight))){
        res.send({error:'malformatted parameters'}).status(400);
    }
    res.send({
        weight: weight,
        height: height, 
        bmi: calculateBmi(Number(height), Number(weight))
    }).status(200);
});

app.post('/exercises', (req, res) => {
    console.log(req.body)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { schedule, target } = req.body as exerciseValues;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = calculateExercises(schedule, Number(target));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.send({ result });
});
const PORT = 3003;

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});