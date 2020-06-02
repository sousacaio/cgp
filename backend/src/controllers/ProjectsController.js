const Projects = require("../models/ProjectModel");

module.exports = {
    async indexAll(req, res) {
        const project = await Projects.find().sort({ createdAt: -1 });
        return res.status(200).json({ project })
    },
    async create(req, res) {
        console.log(req.body)
        const project = await Projects.create(req.body);
        return res.status(200).json({ project })
    },
    async update(req, res) {
        const { project_id } = req.params;
        const project = await Projects.findByIdAndUpdate(project_id, req.body);
        return res.status(200).json({ project })
    },

    async comment(req, res) {
        const { project_id } = req.params;
        const project = await Projects.findOneAndUpdate({ _id: project_id }, {
            $push: {
                comments: req.body
            }
        });

        return res.status(200).json({ project })
    },

    async handleLikeDislike(req, res) {
        let upOrDown = value === true ? 'upvote' : 'downvote';
        console.log(value)
        if (upOrDown === 'upvote') {
            const arrayCol = await Projects.findOneAndUpdate({ _id: project_id, 'comments._id': comment_id }, {
                $push: {
                    'comments.$.upvote': {
                        _id: user_id,
                        name: name
                    }
                }
            });
            return arrayCol;
        } else {
            const arrayCol = await Projects.findOneAndUpdate({ _id: project_id, 'comments._id': comment_id }, {
                $push: {
                    'comments.$.downvote': {
                        _id: user_id,
                        name: name
                    }
                }
            });
            return arrayCol;
        }
    },

}
