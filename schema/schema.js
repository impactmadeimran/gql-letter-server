const graphql = require('graphql');
const Letters = require('../models/letters');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLNonNull } = graphql;

const Letter = new GraphQLObjectType({
    name: 'LetterType',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        school: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        LetterList: {
            type: new GraphQLList(Letter),
            resolve(args, parent) {
               return Letters.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addLetter: {
            type: Letter,
            args: {
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                lastname: { type: new GraphQLNonNull(GraphQLString) },
                school: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent,args) {
                let letter = new Letters({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    school: args.school,
                    email: args.email
                });
                return letter.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})