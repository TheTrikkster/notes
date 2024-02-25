import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll(@Req() req: any) {
    const email = req.user?.email;
    return this.noteService.findAll(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Post()
  create(@Body() note: { body: string }, @Req() req: any) {
    const email = req.user?.email;
    return this.noteService.create({ ...note, owner: email });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNote: { body: string }) {
    return this.noteService.update(id, updateNote);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
