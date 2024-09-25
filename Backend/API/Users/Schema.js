const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    profile_pic: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/cosmetics-api-storage-941af.appspot.com/o/user.png?alt=media&token=4eef9d27-fbb7-4db5-9e61-36026dd9b8d5"
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }

})

const User = model('user', UserSchema)

module.exports = User