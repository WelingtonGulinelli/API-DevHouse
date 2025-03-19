const {Schema, model} =  require('mongoose');  //Imports somente o schema e model do mongoose

const UserSchema = new Schema({
    email: String
});

module.exports = model('User', UserSchema)