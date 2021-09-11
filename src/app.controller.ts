import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNodeInput } from 'src/utils/classes/create-node-input';
import { FindIdParam } from 'src/utils/classes/find-id-param';
import { UpdateNodeInput } from 'src/utils/classes/update-node-input';
import { TreeNode } from 'src/utils/interfaces/tree-node';
import { AppService } from './app.service';

@Controller('/api/tree')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTree(): TreeNode {
    return this.appService.getTree();
  }

  @Post()
  addNode(@Body() createNodeInput: CreateNodeInput) {
    this.appService.addNode(createNodeInput);
  }

  @Delete(':id')
  deleteNode(@Param() params: FindIdParam) {
    this.appService.deleteNode(params.id);
  }

  @Put(':id')
  updateParentNode(
    @Param() params: FindIdParam,
    @Body() updateNodeInput: UpdateNodeInput,
  ) {
    this.appService.updateNode(params.id, updateNodeInput);
  }
}
