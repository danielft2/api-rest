require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use(require('./routers/routes'));
app.listen(process.env.PORT || 3000);