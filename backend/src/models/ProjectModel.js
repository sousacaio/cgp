const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
    coordinator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: {
        type: Array
    },
    comments: [{
        id: {
            type: String
        },
        name: {
            type: String
        },
        content: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now()
        },
        upvote: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            name: String
        }],
        downvote: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            name: String
        }]
    }],
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    category: {
        type: String,
        required: true,
        default: true,
    },
    directionedTo: {
        type: String,
    },
    department: {
        type: String
    },
    awaitedResults: {
        type: String
    },
    benefited: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = model('Project', ProjectSchema);

