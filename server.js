const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//mongodb driver
require('dotenv').config({ path: 'variables.env'});

//mongodb schemas
const Recipe =  require('./models/Recipe');
const User = require('./models/User');

//gql middleware
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const  {typeDefs} = require('./schema');
const {resolvers } = require('./resolvers');

//create Schemas
const schema = makeExecutableSchema({
    typeDefs ,
    resolvers
}); 

//mongoose db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log('DB connected'))
    .catch(err=>console.error(err));

const app = express();

//middleware to handle requests from express to react
const CorsOptions = {
    origin : "http://localhost:3000",
    credentails : true
};

app.use(cors(CorsOptions));

//create graphiql application
app.use('/graphiql', graphiqlExpress({endpointURL:'/graphql'}));

//create mongodb schemas with  graphql and middleware
app.use('/graphql',bodyParser.json(),  graphqlExpress({schema, 
    context: {
        Recipe, User
    }}));

//localhost port number 
const PORT = process.env.PORT||4444;

//start server
app.listen(PORT, ()=> {
    console.log(`Server Listening PORT ${PORT}`);
});
