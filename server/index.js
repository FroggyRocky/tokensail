require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const graphql = require('./src/router/graphql.js');
const cors = require('cors');
const session = require('express-session')


app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(graphql);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
