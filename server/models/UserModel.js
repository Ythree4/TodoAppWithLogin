const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.statics.register = async function (firstname, lastname, email, password) {

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    //password must be at least 8 characters long and 32 characters max

    if (!validator.isLength(password, { min: 8, max: 32 })) {
        throw Error('Password must be at least 8 characters long and 32 characters max');
    }

    //if password is not strong enough, throw error

    if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        throw Error('Password must contain at least one uppercase letter, one lowercase letter and one number');
    }


    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ firstname, lastname, email, password: hash });

    return user;
}

UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Email and password are required');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('User does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error('Password is not correct');
    }

    return user;
}

module.exports = mongoose.model('User', UserSchema);