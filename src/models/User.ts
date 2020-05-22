import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  user: string;
  avatar: string;
  cover: string;
  country: string;
  followers: number;
  following: number;
  html_url: string;
  tweets?: string[];
  company?: string;
  bio?: string;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    followers: {
      type: Number,
      required: true,
    },
    following: {
      type: Number,
      required: true,
    },
    html_url: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    tweets: [
      {
        type: Schema.Types.String,
        ref: 'User',
      },
    ],
    bio: String,
    company: String,
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', UserSchema);
