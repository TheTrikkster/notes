import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: String, required: true })
  owner: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop([{ type: String }])
  tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
