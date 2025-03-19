const {Schema, model} =  require('mongoose');  //Imports somente o schema e model do mongoose

const ReserveSchema = new Schema({
    date: String,
    user:{
        type:   Schema.Types.ObjectId,
        ref: 'User'
    },
    house:{
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

module.exports = model('Reserve', ReserveSchema)