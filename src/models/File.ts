import { Schema, Document, model } from 'mongoose';

export interface IFile extends Document {
  name: string;
  size: string;
  key: string;
  url: string;
  createdAt: Date;
}

const FileSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FileSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

export default model<IFile>('File', FileSchema);
