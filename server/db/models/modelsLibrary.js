const mongoose = require('mongoose');
const Schema = mongoose.Schema

const librarySchema = new Schema({
    id:Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    anthor:String,
    zip:String,
    source:String,
    config:String,
    designConfig:String,
    note:String,
    css:String
},{
    timestamps:true
})

module.exports = mongoose.model('library',librarySchema);
