import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            name: String
        }],
        downvote: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
});
