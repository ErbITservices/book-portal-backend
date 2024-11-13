const mongoose=require('mongoose');
const Scheam = require('./scheamModel');

const bookEntrySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    },
    sheamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Scheam',
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    BookName:{
        type:String,
    },
    BookNameGuj:{
        type:String,
    },
    AuthorName:{
        trype:String
    },
    AuthorNameGuj:{
        type:String,
    },
    PublisherName:{
        type:String,
    },
    Size:{
        type:String,
    },
    Binding:{
        type:String,
    },
    Weight:{
        type:String,
    },
    Language:{
        type:String,
    },
    Subject:{
        type:String,
    },
    PubYear:{
        type:String,
    },
    Category:{
        type:String,
    },
    FrontImage:{
        type: String,
    },
    BackImage:{
        type: String,
    },
    Discribption:{
        type:String,
    }
},{ timestamps: true })

const BookEntry = mongoose.model("BookEntry",bookEntrySchema);

module.exports=BookEntry;