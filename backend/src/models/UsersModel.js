const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
    registration: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true
});

module.exports = model('Users', UsersSchema);

