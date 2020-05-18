import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  user: string;
  avatar: string;
  avatar_url: string;
  cover: string;
  tweets: string[];
  company: string;
  country: string;
  followers: number;
  following: number;
  html_url: string;
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
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    avatar_url: String,
    cover: String,
    company: String,
    followers: Number,
    following: Number,
    html_url: String,
    tweets: [
      {
        type: Schema.Types.String,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', UserSchema);
