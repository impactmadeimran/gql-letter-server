const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://ecole:ecole123@cluster0.jxfzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/emails' , graphqlHTTP({
    schema,
    graphiql:true
}))

mongoose.connection.once('open' , () => {
    console.log('connection to database established')
})

app.listen(4000, () => {
    console.log("Now listening on port 4000")
})