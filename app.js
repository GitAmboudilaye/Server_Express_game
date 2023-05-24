const express = require('express');
const connectDb = require('./config/database');
const dotenv = require('dotenv');
//Access to env variable (process.env.variable)
dotenv.config({path : './config/config.env'});

const routerAuth = require('./routes/auth')
const routerUser = require('./routes/users')
const routerGame = require('./routes/game')

const app = express();
//app.post('/mana',(req, res))
// connexion to database
connectDb();
// Body parser 
app.use(express.json()); 

//----Routes----
app.use('/auth', routerAuth);
app.use('/users', routerUser);
app.use('/game', routerGame);

app.listen(process.env.PORT, ()=>{console.log(`server listen on port ${process.env.PORT}`)})