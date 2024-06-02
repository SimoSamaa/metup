import { Schema, Document } from "mongoose";

enum Gender { male = 'Male', female = 'Female' };

enum Relationship {
  single = 'Single',
  inRelationship = 'In a relationship',
  married = 'Married',
  divorced = 'Divorced'
};

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  cover?: string;
  gender: Gender;
  bYear: number;
  bMonth: number;
  bDay: number;
  verified: boolean;
  friends: any;
  following: any;
  followers: any;
  requests: any;
  search: { user: Schema.Types.ObjectId; }[];
  details: {
    bio?: string;
    otherName?: string;
    job?: string;
    workplace?: string;
    highSchool?: string;
    college?: string;
    currentCity?: string;
    hometown?: string;
    relationship?: Relationship;
  };
  savedPosts: { post: Schema.Types.ObjectId; savedAt: Date; }[];
}

export { IUser, Gender, Relationship };