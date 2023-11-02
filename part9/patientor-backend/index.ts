import express from 'express';
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res)=>{
     console.log('pinged-pong')
    res.send('pong');
});

app.listen(PORT, () =>{
    console.log(`running server on port ${PORT}`);
});