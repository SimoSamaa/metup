import { Schema, model } from "mongoose";
import { IUser, Gender, Relationship } from "./@types/userType";

const ObjectId = Schema.Types.ObjectId;
const mess = 'is required';

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, `first Name ${mess}`],
    trim: true,
    text: true,
  },
  lastName: {
    type: String,
    required: [true, `last Name ${mess}`],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, `username ${mess}`],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, `Email ${mess}`],
    trim: true,
  },
  password: {
    type: String,
    required: [true, `Password ${mess}`],
  },
  picture: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
  },
  cover: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, `gender ${mess}`],
    enum: [Gender.male, Gender.female],
  },
  bYear: {
    type: Number,
    required: true,
    trim: true,
  },
  bMonth: {
    type: Number,
    required: true,
    trim: true,
  },
  bDay: {
    type: Number,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  search: [
    {
      user: { type: ObjectId, ref: "User", },
    },
  ],
  details: {
    bio: {
      type: String,
    },
    otherName: {
      type: String,
    },
    job: {
      type: String,
    },
    workplace: {
      type: String,
    },
    highSchool: {
      type: String,
    },
    college: {
      type: String,
    },
    currentCity: {
      type: String,
    },
    hometown: {
      type: String,
    },
    relationship: {
      type: String,
      enum: [
        Relationship.single,
        Relationship.inRelationship,
        Relationship.married,
        Relationship.divorced
      ],
    }
  },
  savedPosts: [
    {
      post: { type: ObjectId, ref: "Post" },
      savedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

const User = model<IUser>("User", userSchema);

export default User;
export { User, IUser };