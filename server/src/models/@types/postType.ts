import { Schema, Document } from 'mongoose';

interface IPost extends Document {
  type: string;
  text: string;
  images: string[];
  bgPost: string;
  comments: {
    comment: string;
    image: string;
    commentBy: string;
    commentAt: Date;
  }[];
  user: Schema.Types.ObjectId;
}

export default IPost;