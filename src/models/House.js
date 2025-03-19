const { Schema, model } = require('mongoose');  //Importq somente o schema e model do mongoose

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { toJSON: { virtuals: true } }
);


HouseSchema.virtual('thumbnail_url').get(function () {
    return `http://127.0.0.1:3333/files/${this.thumbnail}`;
})
module.exports = model('House', HouseSchema)