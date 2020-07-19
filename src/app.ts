import express from 'express'
import cors from 'cors'
import morgan from 'morgan'


//settings
const app = express();

app.set('port', process.env.PORT || 2121);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/', (req, res) =>{
    res.send(`The API is running at http://localhost:${app.get('port')}`)
});

export default app;