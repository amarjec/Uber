const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema ({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'firstname must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3,'firstname must be at least 3 characters long']
        }, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3,'color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [7,'plate must be at least 7 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})


// for token generation
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
} 

// comparing the current and the previous password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// hash password
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel
