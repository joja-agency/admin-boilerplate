import path from 'path';
import "babel-polyfill";
import express from 'express';
import routes from './routes';
import secure from './routesProtected';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/env';
import addHeaders from './utils/addHeaders'
import mongoose from 'mongoose';
const http = require('http');

mongoose.connect(config.db, {useMongoClient: true});
mongoose.Promise = global.Promise; //use ES6 native Promises

var app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(addHeaders);

// static files like images and so on
app.use('/assets', express.static('public/assets/'));

app.get('/', function(req, res) {
    res.send('hello');
});

// IMPORTANT sequence
app.use('/api/protected', secure);
app.use('/api', routes);


const server = new http.Server(app);

server.listen(config.nodePort, config.nodeHost, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://${config.nodeHost}:${config.nodePort}`);
});
