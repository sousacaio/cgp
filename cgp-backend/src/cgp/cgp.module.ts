import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ProjectSchema } from './schemas/project.schema';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';

@Module({
    controllers: [UserController, ProjectController],
    imports: [MongooseModule.forFeature([
        {
            name: 'User',
            schema: UserSchema
        },
        {
            name: 'Project',
            schema: ProjectSchema
        },

    ]),
    ],
    providers: [UserService, ProjectService],
})
export class CgpModule { }
