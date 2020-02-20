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

class CreatePostDTO {
  @ApiProperty({ description: '帖子的标题' })
  title: string;
  @ApiProperty({ description: '帖子的内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get()
  @ApiOperation({ description: '获取帖子列表' })
  index() {
    return [];
  }

  @Post()
  @ApiOperation({ description: '创建帖子' })
  create(@Body() body: CreatePostDTO) {
    console.log(body);
    return {
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({ description: '获取帖子详情' })
  detail(@Param('id') id: string) {
    return {
      id,
      title: '第一篇文章',
    };
  }

  @Put(':id')
  @ApiOperation({ description: '编辑帖子' })
  update(@Param('id') id: string, @Body() body: CreatePostDTO) {
    return {
      id,
      title: body.title,
    };
  }

  @Delete(':id')
  @ApiOperation({ description: '删除帖子' })
  remove(@Param('id') id: string) {
    return {
      id,
      success: true,
    };
  }
}
