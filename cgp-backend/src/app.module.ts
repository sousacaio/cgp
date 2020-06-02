import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CgpModule } from './cgp/cgp.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cgp'),
    CgpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
