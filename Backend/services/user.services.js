const userModel = require('../models/user.model');


// this function only for creating new users
module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    })

    return user;
}