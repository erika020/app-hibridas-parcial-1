import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerAPI from './routes/index.js';

dotenv.config();

//conexión a base de datos
const urldb = process.env.URI_DB;
mongoose.connect(urldb);
const db = mongoose.connection;

db.on('error', () => {console.log('Error de conexión')});
db.on('open', () => {console.log('Conexión exitosa')});

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/', express.static('public'));

app.get('/', (request, response) => {
    response.send('<h1> API REST </h1>');
})

routerAPI(app);

app.listen(PORT, () => {
    console.log(`API Rest en el puerto ${PORT}`);
})