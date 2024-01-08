import mongoose from 'mongoose'

const userScheme = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        username: {
            type: String,
            require: true,
            unique: true,
            immutable: true
        },
        password:{
            type: String,
            require: true
        },
        firstname:{
            type: String
        },
        lastname:{
            type: String
        },
        lastsession: {
            type: Number
        },
        firstjoined: {
            type: Number
        },
        bookmarkedsnippets: {
            type: [String]
        },
        bundleids: {
            type: [String]
        }
    }
) 

export const User = mongoose.models.User || mongoose.model('User', userScheme);