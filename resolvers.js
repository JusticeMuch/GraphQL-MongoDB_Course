//functions to fetch/update/delete data in mongodb

//creates sercures token 
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const {username, email} = user;
    return jwt.sign({username, email}, secret, {expiresIn}); 
}
exports.resolvers = {
    //query is to access/fetch data 
    Query:{
        getAllRecipes: async (root, asrgs, {Recipe})=>{
            const allRecipes = await Recipe.find();
            return allRecipes;
        }
    },

    //mutation is to manipulate data
    Mutation:{
        addRecipe: async(root, {name, description, category, instructions, username}, 
            {Recipe}) =>{
             const newRecipe = await new Recipe({name, description, category, instructions, username})
             .save();
             return newRecipe;
            },

        signupUser: async (root, {username, email , password}, {User}) =>{
            const user = await User.findOne({username});
            
            if (user){
                throw new Error ('User already exists');
            }

            const newUser = await new User({
                username, email, password
            }).save();
            return {token : createToken( newUser, process.env.SECRET, '1hr')};
        }
    }
};