import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel('Note')
    private noteModel: mongoose.Model<Note>,
  ) {}

  async findAll(userEmail: string) {
    const notes = await this.noteModel.find({ owner: userEmail });
    return notes?.length ? notes : [];
  }

  async findOne(id: string) {
    const note = await this.noteModel.findOne({ _id: id });
    return note || null;
  }

  async create(noteAndUSer: { body: string; owner: string }) {
    const newNote = await this.noteModel.create(noteAndUSer);
    return newNote;
  }

  async update(id: string, updateNote: { body: string }) {
    const updatedNote = await this.noteModel.findOneAndUpdate(
      { _id: id },
      updateNote,
    );
    return updatedNote || null;
  }

  async remove(id: string) {
    const updatedNote = await this.noteModel.findOneAndDelete({ _id: id });
    return updatedNote || null;
  }
}
