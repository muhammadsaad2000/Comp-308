var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
// buildSchema is a helper function to build a GraphQLSchema // directly from a source document.
var schema = buildSchema(`
type Query { message: String
} `);
//query function
function getMessage() { return 'Hello World!';
}
var root = {
    message: getMessage };
    //
    var app = express(); app.use('/graphql', graphqlHTTP({
    schema: schema, rootValue: root, graphiql: true,
    }));
    app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'));