import mongoose from "mongoose";

const usersSchem = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique:true
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
     },
    displayname: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    /*nationality:  {
        type: mongoose.Schema.Types.String,
        required: true
    },
    ethnicity:  {
        type: mongoose.Schema.Types.String,
        required: true
    },
    age: {
        type: mongoose.Schema.Types.Number,
        required: true
    },*/
    phone : {
        type: mongoose.Schema.Types.String,
        required: true
    },
    /*nationality : {
        type:mongoose.Schema.Types.String,
        required:true,
    },
    ethnicity : {
        type:mongoose.Schema.Types.String,
        required:true,
    },*/
    password: {
        type: mongoose.Schema.Types.String,
        match: /^[a-zA-Z0-9]+$/,
        required: true
    },
    address : {
        type: mongoose.Schema.Types.String,
        required: true
    },
    paymentoptions:{
        type:mongoose.Schema.Types.Object
    }
})

export const User = mongoose.model('Users', usersSchem);

