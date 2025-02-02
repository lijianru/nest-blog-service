import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Post as PostSchema } from './post.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDTO {
  @ApiProperty({ description: '帖子的标题', example: '帖子的标题' })
  @IsNotEmpty({ message: '请填写标题！' })
  title: string;
  @ApiProperty({ description: '帖子的内容', example: '帖子的内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostSchema) private readonly PostModel: ModelType<PostSchema>,
  ) {}

  @Get()
  @ApiOperation({ description: '获取帖子列表' })
  async index() {
    return await this.PostModel.find();
  }

  @Post()
  @ApiOperation({ description: '创建帖子' })
  async create(@Body() createPostDTO: CreatePostDTO) {
    await this.PostModel.create(createPostDTO);
    return {
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({ description: '获取帖子详情' })
  async detail(@Param('id') id: string) {
    return await this.PostModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ description: '编辑帖子' })
  async update(@Param('id') id: string, @Body() updatePostDTO: CreatePostDTO) {
    await this.PostModel.findByIdAndUpdate(id, updatePostDTO);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ description: '删除帖子' })
  async remove(@Param('id') id: string) {
    await this.PostModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
