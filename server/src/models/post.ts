import { Schema, model } from 'mongoose';
import IPost from './@types/postType';

const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema<IPost>({
  type: {
    type: String,
    enum: ['profilePicture', 'Cover', null],
  },
  text: String,
  images: Array,
  bgPost: String,
  comments: [
    {
      comment: String,
      image: String,
      commentBy: {
        type: ObjectId,
        ref: 'User',
      },
      commentAt: {
        type: Date,
        default: Date.now(),
      }
    }
  ],
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Post = model<IPost>('Post', postSchema);

export default Post;