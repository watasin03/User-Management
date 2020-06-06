const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const conn = require('./db/mongo');
const cors = require('cors');
const config = require('config');

const registerRouter = require('./routers/registration');
const authRouter = require('./routers/authentication');
const configUserRouter = require('./routers/userConfig');
const detailRouter = require('./routers/detailUser');

const checkToken = require("./middleware/check");

app.use(cors());
conn();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/signup',registerRouter);
app.use('/login',authRouter);
app.use('/update',checkToken, configUserRouter);
app.use('/detail',checkToken, detailRouter)

app.listen(config.get('PORT'),()=>{
    (app ? console.log(`app start at ${config.get('PORT')}`) : console.log('fail to start app'))
})
