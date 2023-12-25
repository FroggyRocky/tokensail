require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const graphql = require('./src/router/graphql.js');
const cors = require('cors');
const session = require('express-session')
const jwt = require('jsonwebtoken')
const {graphqlUploadExpress} = require("graphql-upload");

app.use(cors({
    credentials: true,
    origin:true,
}))

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
// app.use(session({
//     secret: process.env.COOKIE_KEY,
//     name:'token_sail',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: true
//     }
// }))

// function createTestToken() {
//     return jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
//         data: {
//             wallet_address: '0x4b63F8e63FECC19039A7eAF8fFcFe817fC806e63',
//             id: 2
//         }
//     }, process.env.JWT_SECRET);
// }
//
// console.log(createTestToken())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(graphql);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
