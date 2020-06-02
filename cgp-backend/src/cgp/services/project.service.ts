//criar usuario,ativar usuario
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../models/project.model';

import { Comment } from "../models/comment.model";
@Injectable()
export class ProjectService {

    constructor(@InjectModel('Project') private readonly model) { }

    async create(data: Project): Promise<any> {
        const newProject = await this.model.create(data);
        return newProject;
    }
    async update(project_id: String, data: Project): Promise<any> {
        return await this.model.findOneAndUpdate({ _id: project_id }, data);
    }
    async comment(comment: Comment, project_id: String): Promise<any> {
        return await this.model.findOneAndUpdate({ _id: project_id }, {
            $push: {
                comments: comment
            }
        });
    }
    async handleLikeDislike(name: String, user_id: String, project_id: String, comment_id: String, value: Boolean): Promise<any> {

        let upOrDown = value === true ? 'upvote' : 'downvote';
        console.log(value)
        if (upOrDown === 'upvote') {
            const arrayCol = await this.model.findOneAndUpdate({ _id: project_id, 'comments._id': comment_id }, {
                $push: {
                    'comments.$.upvote': {
                        _id: user_id,
                        name: name
                    }
                }
            });
            return arrayCol;
        } else {
            const arrayCol = await this.model.findOneAndUpdate({ _id: project_id, 'comments._id': comment_id }, {
                $push: {
                    'comments.$.downvote': {
                        _id: user_id,
                        name: name
                    }
                }
            });
            return arrayCol;
        }
        // } else {
        //     return await this.model.findOneAndUpdate({ _id: project_id, "comments._id": comment_id }, {
        //         $push: {
        //             'comments.$.comments.$.downvote': newvalue,
        //         }
        //     });
        // }

    }

}