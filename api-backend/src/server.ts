import express from 'express';
import routes from './routes';
import cors from 'cors';

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);



app.post('/users', (req,res) => {
    console.log(req.body);
    res.status(200).json({message: "Success"});
})

app.listen(PORT, () => { console.log(`[SERVER] Running on port ${PORT}`) })