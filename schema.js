//grqphql schemas of data in mongodb

exports.typeDefs = `

type Recipe {
    _id : ID
    name : String!
    category : String!
    description : String!
    instructions : String!
    createdDate : String!
    likes :  Int
    username : String 
}

type Token{
    token : String!

}

type User {
    _id : ID
    username : String!
    password : String!
    email : String!
    joinDate : String
    favourites : [Recipe]
}

type Query{
    getAllRecipes: [Recipe]
}

type Mutation{
    addRecipe(name: String!, category: String!, description: String! , 
        instructions: String!, username: String) : Recipe

    signupUser(username: String!, email : String!, password : String!) : Token
}
`;