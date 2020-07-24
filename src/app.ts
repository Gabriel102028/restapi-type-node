import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/auth.routes'


//settings
const app = express();

app.set('port', process.env.PORT || 33000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/', (req, res) =>{
    res.send(`The API is running at http://localhost:${app.get('port')}`)
});

app.use(authRoutes);

export default app;