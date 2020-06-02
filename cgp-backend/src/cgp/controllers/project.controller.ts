import { Controller, Post, Put, Body, Param } from "@nestjs/common";
import { ResultDto } from "../models/result.model";
import { Project } from "../models/project.model";
import { Comment } from "../models/comment.model";
import { ProjectService } from "../services/project.service";

@Controller('v1/projects')
export class ProjectController {
    constructor(public projectService: ProjectService) { }
    @Post('create')
    async create(@Body() project: Project) {
        try {
            console.log('projects-POST-create');
            const newProject = await this.projectService.create(project)
            return new ResultDto(null, true, newProject, null)
        } catch (error) {
            return new ResultDto(null, true, error, null)
        }
    }
    @Put('update/:project_id')
    async update(@Body() project: Project, @Param('project_id') project_id: String) {
        console.log('projects-PUT-update');
        try {
            const updatedProject = await this.projectService.update(project_id, project);
            return new ResultDto(null, true, updatedProject, null)
        } catch (error) {
            return new ResultDto(null, true, error, null)
        }
    }

    @Post('comment/:project_id')
    async handleComment(@Body() comment: Comment, @Param('project_id') project_id: String) {
        console.log('projects-POST-comment');
        try {
            const newComment = await this.projectService.comment(comment, project_id);
            return new ResultDto(null, true, newComment, null)
        } catch (error) {
            return new ResultDto(null, true, error, null)
        }
    }
    @Post('handleLikeDislike/:project_id')
    async handleLikeDislike(@Body() data: any,
        @Param('project_id') project_id: String,
    ) {
        console.log('projects-POST-handleLikeDislike');
        try {
            const newComment = await this.projectService.handleLikeDislike(data.name, data.user_id, project_id, data.comment_id, data.value);
            return new ResultDto(null, true, newComment, null)
        } catch (error) {
            return new ResultDto(null, true, error, null)
        }
    }


}
